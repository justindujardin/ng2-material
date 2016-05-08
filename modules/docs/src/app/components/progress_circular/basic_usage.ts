import {Component} from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material';

@Component({
  moduleId: module.id,
  selector: 'progress-circular-basic-usage',
  templateUrl: 'basic_usage.html',
  styleUrls: ['basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class ProgressCircularBasicUsage {
  public determinateValue: number = 30;
  public deactivated: boolean = false;
  public mode: string;

  constructor() {
    // Iterate every 100ms, non-stop
    setInterval(() => {
      this.determinateValue += 1;

      if (this.determinateValue > 100) {
        this.determinateValue = 30;
      }
    }, 100, 0, true);
  }

  toogleActivation() {
    this.deactivated = !this.deactivated;
    this.mode = this.deactivated ? 'indeterminate' : '';
  }
}
