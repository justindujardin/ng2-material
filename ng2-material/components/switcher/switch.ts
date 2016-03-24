import {Component, ViewEncapsulation} from "angular2/core";
import {MdCheckbox} from "../checkbox/checkbox";

// TODO(jelbourn): add gesture support
// TODO(jelbourn): clean up CSS.

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
