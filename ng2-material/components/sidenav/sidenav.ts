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
@Directive({
  selector: '[md-sidenav]',
  host: {
    '[class.md-style-side]': 'style=="side"',
    '[class.md-whiteframe-z2]': 'visible',
    '[class.md-sidenav-left]': 'align!="right"',
    '[class.md-sidenav-right]': 'align=="right"'
  }
})
export class MdSidenav extends MdBackdrop implements OnInit, OnDestroy {
  @Input('md-sidenav')
  name: string = 'default';

  private _align: string = SidenavAlignment.LEFT;

  @Input()
  set align(value: string) {
    this._align = value === SidenavAlignment.RIGHT ? SidenavAlignment.RIGHT : SidenavAlignment.LEFT;
  }

  get align(): string {
    return this._align;
  }

  private _style: string = SidenavStyle.OVER;

  @Input()
  set style(value: string) {
    this._style = value === SidenavStyle.SIDE ? SidenavStyle.SIDE : SidenavStyle.OVER;
  }

  get style(): string {
    return this._style;
  }

  private _backdropRef: ComponentRef = null;

  private _defaultContainer = DOM.query('body');

  transitionClass: string = 'md-closed';
  transitionAddClass = false;

  constructor(public element: ElementRef,
              public dcl: DynamicComponentLoader,
              public renderer: Renderer,
              @Inject(forwardRef(() => SidenavService)) public service: SidenavService) {
    super(element);
    DOM.addClass(this.element.nativeElement, this.transitionClass);
  }

  show(): Promise<void> {
    let promise: any = this.style === SidenavStyle.SIDE ? Promise.resolve() : this._createBackdrop(this.element);
    return promise.then(() => super.show());
  }

  hide(): Promise<void> {
    return super.hide().then(() => {
      this._destroyBackdrop();
    });
  }

  toggle(open: boolean = !this.visible): Promise<void> {
    return open ? this.hide() : this.show();
  }

  ngOnInit(): any {
    this.service.register(this);
  }

  ngOnDestroy(): any {
    this.service.unregister(this);
  }

  private _destroyBackdrop(): Promise<void> {
    if (this._backdropRef) {
      this._backdropRef.dispose();
      this._backdropRef = null;
    }
    return Promise.resolve();
  }

  private _createBackdrop(elementRef: ElementRef): Promise<ComponentRef> {
    if (this._backdropRef) {
      return Promise.resolve(this._backdropRef);
    }
    return this.dcl.loadNextToLocation(MdBackdrop, elementRef)
      .then((componentRef) => {
        let backdrop: MdBackdrop = componentRef.instance;
        backdrop.clickClose = true;
        this.renderer.setElementClass(componentRef.location, 'md-backdrop', true);
        this.renderer.setElementClass(componentRef.location, 'md-opaque', true);
        this.renderer.setElementClass(componentRef.location, 'md-backdrop-absolute', false);
        DOM.appendChild(this._defaultContainer, componentRef.location.nativeElement);

        this._backdropRef = componentRef;
        // When this component is shown/hidden, sync the backdrop
        this.onShowing.subscribe(() => backdrop.show());
        this.onHiding.subscribe(() => backdrop.hide());
        // If the sidenav is hidden, release the backdrop
        this.onHidden.subscribe(() => this._destroyBackdrop());
        // If the backdrop is hidden, hide the nav
        backdrop.onHiding.subscribe(() => this.hide());

        return componentRef;
      });
  }
}
