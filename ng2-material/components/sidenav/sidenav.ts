import {
  Input,
  ElementRef,
  ContentChildren,
  OnDestroy,
  OnInit,
  QueryList,
  Component,
  ViewChild,
  forwardRef,
  Inject,
  AfterViewInit,
  Optional,
  SkipSelf,
  Host,
  ApplicationRef,
  Output,
  EventEmitter,
  Renderer
} from "angular2/core";
import {MdBackdrop} from "../backdrop/backdrop";
import {CONST} from "angular2/src/facade/lang";
import {SidenavService} from "./sidenav_service";
import {TimerWrapper} from "angular2/src/facade/async";
import {ViewportHelper} from "../../core/util/viewport";


@CONST()
export class SidenavAlignment {
  /**
   * The sidenav will be displayed on the left side of the content.
   */
  @CONST()
  static LEFT = 'left';
  /**
   * The sidenav will be displayed on the right side of the content.
   */
  @CONST()
  static RIGHT = 'right';
}

@CONST()
export class SidenavStyle {
  /**
   * The sidenav will hover over the content.
   */
  @CONST()
  static OVER = 'over';
  /**
   * The sidenav will push the content to the side and display without obscuring it.
   */
  @CONST()
  static SIDE = 'side';
}

/**
 * A slide-out navigation element that transitions in from the left or right.
 *
 * ```html
 * <nav md-sidenav="menu" align="right" style="side">
 *   <h1>Components</h1>
 *   <button md-button (click)="close()">Close</button>
 * </nav>
 * ```
 */
@Component({
  selector: 'md-sidenav',
  host: {
    '[class.md-style-side]': 'style=="side"',
    '[class.md-whiteframe-z2]': 'visible',
    '[class.md-sidenav-left]': 'align!="right"',
    '[class.md-sidenav-right]': 'align=="right"'
  },
  template: `<ng-content></ng-content>`,
  directives: [MdBackdrop]
})
export class MdSidenav extends MdBackdrop implements OnInit, OnDestroy {
  @Input()
  name: string = 'default';

  // TODO(jd): sucks that we have to re-export the outputs from a child class, but
  // without this you cannot bind to the events in a template. :sob:
  @Output()
  onHiding: EventEmitter<MdSidenav>;
  @Output()
  onHidden: EventEmitter<MdSidenav>;
  @Output()
  onShowing: EventEmitter<MdSidenav>;
  @Output()
  onShown: EventEmitter<MdSidenav>;


  @Input()
  set align(value: string) {
    this._align = value === SidenavAlignment.RIGHT ? SidenavAlignment.RIGHT : SidenavAlignment.LEFT;
  }

  get align(): string {
    return this._align;
  }

  /**
   * One of 'side' or 'over'. 'side' will push the content out of the way and not display
   * a backdrop overlay, and 'over' will display the overlay and be dismissed when the user
   * clicks on the backdrop.
   */
  @Input()
  set style(value: string) {
    this._style = value === SidenavStyle.SIDE ? SidenavStyle.SIDE : SidenavStyle.OVER;
    if (this.container) {
      TimerWrapper.setTimeout(() => {
        this.container.updateStyle(this);
      }, 0);
    }
  }

  get style(): string {
    return this._style;
  }

  private _align: string = SidenavAlignment.LEFT;
  private _style: string = SidenavStyle.OVER;

  /**
   * The backdrop element the container provides.
   */
  backdropRef: MdBackdrop = null;

  transitionClass: string = 'md-closed';
  transitionAddClass = false;

  constructor(public element: ElementRef,
              public viewport: ViewportHelper,
              @Inject(forwardRef(() => SidenavService))
              public service: SidenavService,
              public renderer: Renderer,
              @Optional() @SkipSelf() @Host() @Inject(forwardRef(() => MdSidenavContainer))
              public container: MdSidenavContainer) {
    super(element, viewport);
    this.renderer.setElementClass(this.element.nativeElement, this.transitionClass, !this.transitionAddClass);
  }

  ngOnInit(): any {
    this.service.register(this);
  }

  ngOnDestroy(): any {
    this.service.unregister(this);
    this.backdropRef = null;
  }

  toggle(visible: boolean): Promise<void> {
    if (this.backdropRef) {
      this.backdropRef.toggle(visible);
    }
    return super.toggle(visible);
  }
}

@Component({
  selector: 'md-sidenav-container',
  template: `
    <md-backdrop class="md-opaque" clickClose="true"></md-backdrop>
    <ng-content></ng-content>`,
  directives: [MdBackdrop],
  host: {
    '[class.md-pushed]': 'isPushed'
  }
})
export class MdSidenavContainer implements OnDestroy, AfterViewInit {

  @ContentChildren(MdSidenav)
  children: QueryList<MdSidenav>;

  @ViewChild(MdBackdrop)
  private _backdrop: MdBackdrop;

  // TODO(jd): This change detection hacking could probably be avoided if Zone.JS knew about media
  constructor(@Optional()
              private _app: ApplicationRef) {
  }

  private _unsubscribe: any = null;

  ngOnDestroy(): any {
    this.children.toArray().forEach((m: MdSidenav) => {
      m.backdropRef = null;
    });
    this._unsubscribe.unsubscribe();
  }

  @Input()
  public isPushed: boolean = false;

  ngAfterViewInit(): any {
    // Tell each child about the backdrop so they can show it
    // when they are opened or closed.
    this.children.toArray().forEach((m: MdSidenav) => {
      m.backdropRef = this._backdrop;
    });
    // When the backdrop is hidden, close any child navs
    this._unsubscribe = this._backdrop.onHiding.subscribe(() => {
      this.children.toArray().forEach((m: MdSidenav) => {
        m.visible = false;
      });
    });
  }

  updateStyle(child: MdSidenav) {
    let pushed: boolean = false;
    this.children && this.children.toArray().forEach((m: MdSidenav) => {
      if (m.style === SidenavStyle.SIDE) {
        pushed = true;
      }
    });
    this.isPushed = pushed;
    this._app && this._app.tick();
  }
}
