import {Component, View, Attribute, ViewEncapsulation} from 'angular2/core';
import {isPresent} from 'angular2/src/facade/lang';
import {KeyCodes} from '../../core/key_codes';
import {KeyboardEvent} from 'angular2/src/facade/browser';
import {NumberWrapper} from 'angular2/src/facade/lang';
import {Input, Output, EventEmitter} from 'angular2/core';

// TODO(jdd): ng-true-value, ng-false-value

@Component({
  selector: 'md-checkbox',
  inputs: ['checked', 'disabled'],
  host: {
    'role': 'checkbox',
    '[attr.aria-checked]': 'checked',
    '[attr.aria-disabled]': 'disabled',
    '[tabindex]': 'tabindex',
    '(keydown)': 'onKeydown($event)',
  }
})
@View({
  templateUrl: 'ng2-material/components/checkbox/checkbox.html',
  directives: [],
  encapsulation: ViewEncapsulation.None
})
export class MdCheckbox {

  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** Whether this checkbox is checked. */
  @Input() checked: boolean;

  /** Whether this checkbox is disabled. */
  @Input('disabled') disabled_: boolean;

  /** Setter for tabindex */
  @Input() tabindex: number;

  constructor(@Attribute('tabindex') tabindex: string) {
    this.checked = false;
    this.tabindex = isPresent(tabindex) ? NumberWrapper.parseInt(tabindex, 10) : 0;
    this.disabled_ = false;
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
