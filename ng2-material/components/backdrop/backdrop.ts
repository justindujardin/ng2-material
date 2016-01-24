import {Animate} from "../../core/util/animate";
import {ElementRef} from "angular2/core";
import {AfterViewInit} from "angular2/core";
import {ViewEncapsulation} from "angular2/core";
import {View} from "angular2/core";
import {Component} from "angular2/core";
import {Input} from "angular2/core";
import {Output} from "angular2/core";
import {EventEmitter} from "angular2/core";
import {DOM} from "angular2/src/platform/dom/dom_adapter";

/**
 * An overlay for content on the page.
 * Can optionally dismiss when clicked on.
 * Has outputs for show/showing and hide/hiding.
 */
@Component({
  selector: 'md-backdrop',
  host: {
    'class': 'md-backdrop',
    '(click)': 'onClick()',
  },
})
@View({template: '', encapsulation: ViewEncapsulation.None})
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
  onHiding: EventEmitter<MdBackdrop> = new EventEmitter<MdBackdrop>();

  /**
   * Emits when the backdrop has finished being hidden.
   */
  @Output()
  onHidden: EventEmitter<MdBackdrop> = new EventEmitter<MdBackdrop>();


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

  constructor(public element: ElementRef) {
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
   * Read-only property indicating whether the backdrop is visible or not.
   */
  get visible(): boolean {
    return this._visible;
  }

  private _visible: boolean = false;
  private _transitioning: boolean = false;
  private _previousOverflow: string = null;

  onClick() {
    if (this.clickClose && !this._transitioning && this.visible) {
      this.hide();
    }
  }

  /**
   * Show the backdrop and return a promise that is resolved when the show animations are
   * complete.
   */
  show(): Promise<void> {
    if (this._visible) {
      return Promise.resolve();
    }
    this._visible = true;
    this._transitioning = true;
    this.onShowing.emit(this);
    let action = this.transitionAddClass ? Animate.enter : Animate.leave;

    if (this.hideScroll && this.element && !this._previousOverflow) {
      let parent = DOM.parentElement(this.element.nativeElement);
      let style = parent ? DOM.getStyle(parent, 'overflow') : 'hidden';
      if (style !== 'hidden') {
        this._previousOverflow = DOM.getStyle(parent, 'overflow');
        DOM.setStyle(parent, 'overflow', 'hidden');
      }
    }

    return action(this.element.nativeElement, this.transitionClass).then(() => {
      this._transitioning = false;
      this.onShown.emit(this);
    });
  }

  /**
   * Hide the backdrop and return a promise that is resolved when the hide animations are
   * complete.
   */
  hide(): Promise<void> {
    if (!this._visible) {
      return Promise.resolve();
    }
    this._visible = false;
    this._transitioning = true;
    this.onHiding.emit(this);
    let action = this.transitionAddClass ? Animate.leave : Animate.enter;

    if (this.hideScroll && this.element && this._previousOverflow !== null) {
      let parent = DOM.parentElement(this.element.nativeElement);
      DOM.setStyle(parent, 'overflow', this._previousOverflow);
      this._previousOverflow = null;
    }

    return action(this.element.nativeElement, this.transitionClass).then(() => {
      this._transitioning = false;
      this.onHidden.emit(this);
    });
  }
}
