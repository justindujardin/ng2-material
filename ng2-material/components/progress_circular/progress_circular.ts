import {Component, View, ViewEncapsulation} from 'angular2/core';
import {MdProgressLinear} from '../progress_linear/progress_linear';

@Component({selector: 'md-progress-circular'})
@View({
  templateUrl: 'ng2-material/components/progress_circular/progress_circular.html',
  encapsulation: ViewEncapsulation.None
})
export class MdProgressCircular extends MdProgressLinear {
}
