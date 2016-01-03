import {Animate} from "../../core/util/animate";
import {ElementRef} from "angular2/core";
import {AfterViewInit} from "angular2/core";
import {ViewEncapsulation} from "angular2/core";
import {View} from "angular2/core";
import {Component} from "angular2/core";
import {Input} from "angular2/core";
import {Output} from "angular2/core";
import {EventEmitter} from "angular2/core";

/**
 * A transparent overlay for content on the page.
 */
@Component({
  selector: 'md-backdrop',
  host: {
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


  private _visible: boolean = false;
  private _transitioning: boolean = false;

  /**
   * Read-only property indicating whether the backdrop is visible or not.
   */
  get visible(): boolean {
    return this._visible;
  }

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
    return Animate.enter(this.element.nativeElement, 'md-active').then(() => {
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
    return Animate.leave(this.element.nativeElement, 'md-active').then(() => {
      this._transitioning = false;
      this.onHidden.emit(this);
    });
  }
}
