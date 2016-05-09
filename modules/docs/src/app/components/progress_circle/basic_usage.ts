import {Component} from '@angular/core';
import {MdProgressCircle} from '@angular2-material/progress-circle';

@Component({
  moduleId: module.id,
  selector: 'progress-circle-basic-usage',
  templateUrl: 'basic_usage.html',
  styleUrls: ['basic_usage.css'],
  directives: [MdProgressCircle]
})
export default class ProgressCircleBasicUsage {
  public determinateValue: number = 30;
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
}
