import {Component, ViewEncapsulation, OnChanges, ElementRef} from "angular2/core";
import {TimerWrapper} from "angular2/src/facade/async";
import {isPresent} from "angular2/src/facade/lang";
import {Ink} from "../../core/util/ink";


const BUTTON_TEMPLATE = `<span class="md-button-wrapper"><ng-content></ng-content></span>`;

// TODO(jelbourn): Make the `isMouseDown` stuff done with one global listener.

@Component({
  selector: '[md-button]:not(a), [md-fab]:not(a), [md-raised-button]:not(a)',
  template: BUTTON_TEMPLATE,
  encapsulation: ViewEncapsulation.None,
  host: {
    '(mousedown)': 'onMousedown($event)',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
    '[class.md-button-focus]': 'isKeyboardFocused',
  },
})
export class MdButton {
  /** Whether a mousedown has occured on this element in the last 100ms. */
  isMouseDown: boolean = false;

  /** Whether the button has focus from the keyboard (not the mouse). Used for class binding. */
  isKeyboardFocused: boolean = false;

  constructor(private _element: ElementRef) {
  }

  onMousedown(event) {
    // We only *show* the focus style when focus has come to the button via the keyboard.
    // The Material Design spec is silent on this topic, and without doing this, the
    // button continues to look :active after clicking.
    // @see http://marcysutton.com/button-focus-hell/
    this.isMouseDown = true;
    TimerWrapper.setTimeout(() => {
      this.isMouseDown = false
    }, 100);

    if (this._element && Ink.canApply(this._element.nativeElement)) {
      Ink.rippleEvent(this._element.nativeElement, event);
    }
  }

  onFocus() {
    this.isKeyboardFocused = !this.isMouseDown;
  }

  onBlur() {
    this.isKeyboardFocused = false;
  }
}


@Component({
  selector: 'a[md-button], a[md-raised-button], a[md-fab]',
  inputs: ['disabled'],
  template: BUTTON_TEMPLATE,
  encapsulation: ViewEncapsulation.None,
  host: {
    '(click)': 'onClick($event)',
    '(mousedown)': 'onMousedown()',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
    '[tabIndex]': 'tabIndex',
    '[class.md-button-focus]': 'isKeyboardFocused',
    '[attr.aria-disabled]': 'isAriaDisabled',
  },
})
export class MdAnchor extends MdButton implements OnChanges {
  tabIndex: number;
  disabled_: boolean;

  get disabled(): boolean {
    return this.disabled_;
  }

  set disabled(value) {
    // The presence of *any* disabled value makes the component disabled, *except* for false.
    this.disabled_ = isPresent(value) && this.disabled !== false;
  }

  onClick(event) {
    // A disabled anchor shouldn't navigate anywhere.
    if (this.disabled) {
      event.preventDefault();
    }
  }

  /** Invoked when a change is detected. */
  ngOnChanges(_) {
    // A disabled anchor should not be in the tab flow.
    this.tabIndex = this.disabled ? -1 : 0;
  }

  /** Gets the aria-disabled value for the component, which must be a string for Dart. */
  get isAriaDisabled(): string {
    return this.disabled ? 'true' : 'false';
  }
}
