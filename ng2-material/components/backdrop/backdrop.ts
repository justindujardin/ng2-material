import {Animate} from "../../core/util/animate";
import {ElementRef, ViewEncapsulation, Component, Input, Output, EventEmitter} from "angular2/core";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {ViewportHelper} from "../../core/util/viewport";

/**
 * An overlay for content on the page.
 * Can optionally dismiss when clicked on.
 * Has outputs for show/showing and hide/hiding.
 */
@Component({
  selector: 'md-backdrop',
  template: '',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'md-backdrop',
    '(click)': 'onClick()',
  },
})
export class MdBackdrop {

  /**
   * When true, clicking on the backdrop will close it
   */
  @Input()
  clickClose: boolean = false;

  /**
   * When true, disable the parent container scroll while the backdrop is active.
   */
  @Input()
  hideScroll: boolean = true;

  /**
   * Emits when the backdrop begins to hide.
   */
  @Output()
  onHiding: EventEmitter<MdBackdrop> = new EventEmitter<MdBackdrop>(false);

  /**
   * Emits when the backdrop has finished being hidden.
   */
  @Output()
  onHidden: EventEmitter<MdBackdrop> = new EventEmitter<MdBackdrop>(false);


  /**
   * Emits when the backdrop begins to be shown.
   */
  @Output()
  onShowing: EventEmitter<MdBackdrop> = new EventEmitter<MdBackdrop>();

  /**
   * Emits when the backdrop has finished being shown.
   */
  @Output()
  onShown: EventEmitter<MdBackdrop> = new EventEmitter<MdBackdrop>();

  constructor(public element: ElementRef, public viewport: ViewportHelper) {
    this._body = DOM.querySelector(viewport.getDocumentNativeElement(), 'body');
  }

  /**
   * The CSS class name to transition on/off when the backdrop is hidden/shown.
   */
  @Input()
  public transitionClass: string = 'md-active';

  /**
   * Whether to add the {@see transitionClass} or remove it when the backdrop is shown. The
   * opposite will happen when the backdrop is hidden.
   */
  @Input()
  public transitionAddClass = true;


  /**
   * Whether the backdrop is visible.
   */
  get visible(): boolean {
    return this._visible;
  }

  @Input()
  set visible(value: boolean) {
    this.toggle(value);
  }

  private _visible: boolean = false;
  private _transitioning: boolean = false;
  private _previousOverflow: string = null;
  private _body: HTMLElement = null;

  onClick() {
    if (this.clickClose && !this._transitioning && this.visible) {
      this.hide();
    }
  }


  /**
   * Hide the backdrop and return a promise that is resolved when the hide animations are
   * complete.
   */
  hide(): Promise<any> {
    return this.toggle(false);
  }

  /**
   * Show the backdrop and return a promise that is resolved when the show animations are
   * complete.
   */
  show(): Promise<any> {
    return this.toggle(true);
  }

  /**
   * Toggle the visibility of the backdrop.
   * @param visible whether or not the backdrop should be visible
   * @returns {any}
   */
  toggle(visible: boolean = !this.visible): any {
    if (visible === this._visible) {
      return Promise.resolve();
    }

    let beginEvent = visible ? this.onShowing : this.onHiding;
    let endEvent = visible ? this.onShown : this.onHidden;

    this._visible = visible;
    this._transitioning = true;
    beginEvent.emit(this);
    let action = visible ?
      (this.transitionAddClass ? Animate.enter : Animate.leave) :
      (this.transitionAddClass ? Animate.leave : Animate.enter);

    // Page scroll
    if (visible && this.hideScroll && this.element && !this._previousOverflow) {
      let style = DOM.getStyle(this._body, 'overflow');
      if (style !== 'hidden') {
        this._previousOverflow = style;
        DOM.setStyle(this._body, 'overflow', 'hidden');
      }
    }
    else if (!visible && this.hideScroll && this.element && this._previousOverflow !== null) {
      DOM.setStyle(this._body, 'overflow', this._previousOverflow);
      this._previousOverflow = null;
    }

    // Animate transition class in/out and then finally emit the completed event.
    return action(this.element.nativeElement, this.transitionClass).then(() => {
      this._transitioning = false;
      endEvent.emit(this);
    });
  }
}
