import {Component, View, Attribute, ViewEncapsulation} from 'angular2/angular2';
import {isPresent} from 'angular2/src/facade/lang';
import {KeyCodes} from '../../core/key_codes';
import {KeyboardEvent} from 'angular2/src/facade/browser';
import {NumberWrapper} from 'angular2/src/facade/lang';
import {Output, EventEmitter} from "angular2/core";

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

  @Output() ngOnChange:EventEmitter<boolean> = new EventEmitter<boolean>();

  /** Whether this checkbox is checked. */
  checked: boolean;

  /** Whether this checkbox is disabled. */
  disabled_: boolean;

  /** Setter for tabindex */
  tabindex: number;

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
    if (event.keyCode == KeyCodes.SPACE) {
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
    this.ngOnChange.emit(this.checked);
  }
}
