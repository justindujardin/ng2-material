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

// TODO(jd): Lock open sidenav
// TODO(jd): Right alignment
// TODO(jd): Behaviors for testing
// - can lock open
// - service can find sidenavs by name


/**
 * A slide-out navigation element that transitions in from the left or right.
 *
 * ```html
 * <nav md-sidenav="menu">
 *   <h1>Components</h1>
 *   <button md-button (click)="close()">Close</button>
 * </nav>
 * ```
 */
@Directive({
  selector: '[md-sidenav]'
})
export class MdSidenav extends MdBackdrop implements OnInit, OnDestroy {
  @Input('md-sidenav')
  name: string = 'default';

  private _backdropRef: ComponentRef = null;

  private _defaultContainer = DOM.query('body');

  transitionClass: string = 'md-closed';
  transitionAddClass = false;

  constructor(public element: ElementRef,
              public dcl: DynamicComponentLoader,
              public renderer: Renderer,
              @Inject(forwardRef(() => SidenavService)) public service: SidenavService,
              @Attribute('md-sidenav') name: string) {
    super(element);
    DOM.addClass(this.element.nativeElement, this.transitionClass);
    if (isPresent(name)) {
      this.name = name;
    }
  }

  show(): Promise<void> {
    return this._createBackdrop(this.element).then(() => super.show());
  }

  _destroyBackdrop(): Promise<void> {
    if (this._backdropRef) {
      this._backdropRef.dispose();
      this._backdropRef = null;
    }
    return Promise.resolve();
  }


  toggle(): Promise<void> {
    return this.visible ? this.hide() : this.show();
  }

  isOpen(): boolean {
    return this.visible;
  }

  private _lockedOpen: boolean = false;

  isLockedOpen(): boolean {
    return this._lockedOpen;
  }


  _createBackdrop(elementRef: ElementRef): Promise<ComponentRef> {
    if (this._backdropRef) {
      return Promise.resolve(this._backdropRef);
    }
    return this.dcl.loadNextToLocation(MdBackdrop, elementRef)
      .then((componentRef) => {
        let backdrop: MdBackdrop = componentRef.instance;
        backdrop.clickClose = true;
        this.renderer.setElementClass(componentRef.location, 'md-backdrop', true);
        this.renderer.setElementClass(componentRef.location, 'md-opaque', true);
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

  ngOnInit(): any {
    this.service.register(this);
  }

  ngOnDestroy(): any {
    this.service.unregister(this);
  }

}

@Injectable()
export class SidenavService {
  private _instances: MdSidenav[] = [];

  register(instance: MdSidenav) {
    this._instances.push(instance);
  }

  unregister(instance: MdSidenav) {
    this._instances = this._instances.filter((c: MdSidenav) => {
      return c.name !== instance.name;
    });
  }

  show(name: string): Promise<void> {
    let instance: MdSidenav = this._findInstance(name);
    if (!instance) {
      return Promise.reject<void>('invalid container');
    }
    return instance.show();
  }

  hide(name: string): Promise<void> {
    let instance: MdSidenav = this._findInstance(name);
    if (!instance) {
      return Promise.reject<void>('invalid container');
    }
    return instance.hide();
  }

  private _findInstance(name: string): MdSidenav {
    return this._instances.filter((c: MdSidenav) => {
      return c.name === name;
    })[0];
  }
}
