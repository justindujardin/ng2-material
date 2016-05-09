import {Component, HostBinding, Input, Output, EventEmitter, HostListener} from "@angular/core";
import {KeyCodes} from "../../core/key_codes";
import {parseTabIndexAttribute} from "../../core/util/util";

@Component({
  selector: 'md-switch',
  inputs: ['checked', 'disabled'],
  host: {
    'role': 'checkbox'
  },
  template: `
    <div class="md-switch-container">
      <div class="md-switch-bar"></div>
      <div class="md-switch-thumb-container">
        <div class="md-switch-thumb"></div>
      </div>
    </div>
    <div class="md-switch-label">
      <ng-content></ng-content>
    </div>`,
  directives: []
})
export class MdSwitch {

  @Output()
  checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  /** Whether this switch is checked. */
  @Input()
  @HostBinding('attr.aria-checked')
  checked: boolean = false;

  /** Whether this switch is disabled. */
  @Input('disabled')
  @HostBinding('attr.aria-disabled')
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
    this.disabled_ = typeof value !== 'undefined' && value !== false;
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.keyCode === KeyCodes.SPACE) {
      event.preventDefault();
      this.toggle(event);
    }
  }

  @HostListener('click', ['$event'])
  toggle(event) {
    if (this.disabled) {
      event.stopPropagation();
      return;
    }

    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
