import {Component} from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material';

@Component({
  moduleId: module.id,
  selector: 'progress-linear-basic-usage',
  templateUrl: 'basic_usage.html',
  styleUrls: ['basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class ProgressLinearBasicUsage {
  public determinateValue: number = 30;
  public determinateValue2: number = 30;

  constructor() {
    // Iterate every 100ms, non-stop
    setInterval(() => {
      this.determinateValue += 1;
      this.determinateValue2 += 1.5;

      if (this.determinateValue > 100) {
        this.determinateValue = 30;
      }
      if (this.determinateValue2 > 100) {
        this.determinateValue2 = 30;
      }
    }, 100, 0, true);
  }
}
