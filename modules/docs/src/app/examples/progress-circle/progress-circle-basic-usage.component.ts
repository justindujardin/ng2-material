import {Component, OnInit} from '@angular/core';
import {MdProgressCircle} from '@angular2-material/progress-circle';
@Component({
  moduleId: module.id,
  selector: 'progress-circle-basic-usage',
  templateUrl: 'progress-circle-basic-usage.component.html',
  styleUrls: ['progress-circle-basic-usage.component.css'],
  directives: [MdProgressCircle]
})
export class ProgressCircleBasicUsageComponent implements OnInit {
  public determinateValue: number = 30;
  public mode: string;

  ngOnInit() {
    // Iterate every 100ms, non-stop
    setInterval(() => {
      this.determinateValue += 1;

      if (this.determinateValue > 100) {
        this.determinateValue = 30;
      }
    }, 100, 0, true);
  }
}
