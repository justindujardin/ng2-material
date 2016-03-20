import {Component, ViewEncapsulation, Input, Output, EventEmitter} from "angular2/core";
import {isPresent} from "angular2/src/facade/lang";
import {KeyCodes} from "../../core/key_codes";
import {parseTabIndexAttribute} from "../../core/util/util";

// TODO(jd): ng-true-value, ng-false-value

@Component({
  selector: 'md-checkbox',
  inputs: ['checked', 'disabled'],
  template: `
    <div class="md-checkbox-container">
      <div class="md-checkbox-icon"></div>
    </div>
    <div class="md-checkbox-label"><ng-content></ng-content></div>`,
  directives: [],
  encapsulation: ViewEncapsulation.None,
  host: {
    'role': 'checkbox',
    '[attr.aria-checked]': 'checked',
    '[attr.aria-disabled]': 'disabled',
    '[tabindex]': 'tabindex',
    '(keydown)': 'onKeydown($event)',
    '(click)': 'toggle($event)'
  }
})
export class MdCheckbox {

  @Output()
  checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  /** Whether this checkbox is checked. */
  @Input()
  checked: boolean = false;

  /** Whether this checkbox is disabled. */
  @Input('disabled')
  disabled_: boolean = false;

  /** Setter for tabindex */
  @Input('tabindex')
  private _tabindex: number;
  set tabindex(value: number) {
    this._tabindex = parseTabIndexAttribute(value);
  }

  get tabindex(): number {
    return this._tabindex;
  }

  get disabled() {
    return this.disabled_;
  }

  set disabled(value) {
    this.disabled_ = isPresent(value) && value !== false;
  }

  onKeydown(event: KeyboardEvent) {
    if (event.keyCode === KeyCodes.SPACE) {
      event.preventDefault();
      this.toggle(event);
    }
  }

  toggle(event) {
    if (this.disabled) {
      event.stopPropagation();
      return;
    }

    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
