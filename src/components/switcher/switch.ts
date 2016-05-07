import {Component, ViewEncapsulation} from "@angular/core";
import {MdCheckbox} from "@angular2-material/checkbox";

@Component({
  selector: 'md-switch',
  inputs: ['checked', 'disabled'],
  host: {
    'role': 'checkbox',
    '[attr.aria-checked]': 'checked',
    '[attr.aria-disabled]': 'disabled_',
    '(keydown)': 'onKeydown($event)',
    '(click)': 'toggle($event)'
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
  directives: [],
  encapsulation: ViewEncapsulation.None
})
export class MdSwitch extends MdCheckbox {
}
