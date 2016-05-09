import {Component} from '@angular/core';
import {MdProgressBar} from '@angular2-material/progress-bar';

@Component({
  moduleId: module.id,
  selector: 'progress-bar-basic-usage',
  templateUrl: 'basic_usage.html',
  styleUrls: ['basic_usage.css'],
  directives: [MdProgressBar]
})
export default class ProgressBarBasicUsage {
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
