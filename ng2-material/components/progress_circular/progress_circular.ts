import {Component, View, ViewEncapsulation} from 'angular2/core';
import {MdProgressLinear} from '../progress_linear/progress_linear';

@Component({selector: 'md-progress-circular'})
@View({
  template: `
    <div class="md-spinner-wrapper">
      <div class="md-inner">
        <div class="md-gap"></div>
        <div class="md-left">
          <div class="md-half-circle"></div>
        </div>
        <div class="md-right">
          <div class="md-half-circle"></div>
        </div>
      </div>
    </div>`,
  encapsulation: ViewEncapsulation.None
})
export class MdProgressCircular extends MdProgressLinear {
}
