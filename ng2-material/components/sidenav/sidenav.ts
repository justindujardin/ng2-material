import {Directive, Injectable} from 'angular2/core';
import {Input} from 'angular2/core';
import {Animate} from "../../core/util/animate";
import {MdDialog} from "../dialog/dialog";
import {MdDialogRef} from "../dialog/dialog_ref";
import {Media} from "../../core/util/media";
import {MdBackdrop} from "../backdrop/backdrop";
import {ElementRef} from "angular2/core";
import {ContentChildren} from "angular2/core";
import {OnDestroy} from "angular2/core";
import {AfterContentInit} from "angular2/core";
import {OnInit} from "angular2/core";
import {QueryList} from "angular2/core";
import {Component} from "angular2/core";
import {ViewChild} from "angular2/core";
import {ComponentRef} from "angular2/core";
import {Renderer} from "angular2/core";
import {DynamicComponentLoader} from "angular2/core";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {Attribute} from "angular2/core";
import {isPresent} from "angular2/src/facade/lang";
import {forwardRef} from "angular2/core";
import {Inject} from "angular2/core";
import {CONST} from "angular2/src/facade/lang";
import {SidenavService} from "./sidenav_service";
import {AfterViewInit} from "angular2/core";


@CONST()
export class SidenavAlignment {
  /**
   * The sidenav will be displayed on the left side of the content.
   */
  @CONST() static LEFT = 'left';
  /**
   * The sidenav will be displayed on the right side of the content.
   */
  @CONST() static RIGHT = 'right';
}

@CONST()
export class SidenavStyle {
  /**
   * The sidenav will hover over the content.
   */
  @CONST() static OVER = 'over';
  /**
   * The sidenav will push the content to the side and display without obscuring it.
   */
  @CONST() static SIDE = 'side';
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
  }

  get style(): string {
    return this._style;
  }

  /**
   * Whether the sidenav is opened or not.
   */
  @Input()
  set opened(value: boolean) {
    this.visible = value;
  }

  get opened(): boolean {
    return this.visible;
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
              @Inject(forwardRef(() => SidenavService)) public service: SidenavService) {
    super(element);
    DOM.addClass(this.element.nativeElement, this.transitionClass);
  }

  ngOnInit(): any {
    this.service.register(this);
  }

  ngOnDestroy(): any {
    this.service.unregister(this);
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
  directives: [MdBackdrop]
})
export class MdSidenavContainer implements OnDestroy, AfterViewInit {

  @ContentChildren(MdSidenav)
  children: QueryList<MdSidenav>;

  @ViewChild(MdBackdrop)
  private _backdrop: MdBackdrop;

  private _unsubscribe: any = null;

  ngOnDestroy(): any {
    if (this._unsubscribe) {
      this._unsubscribe.unsubscribe();
      this._unsubscribe = null;
    }
  }

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
}
