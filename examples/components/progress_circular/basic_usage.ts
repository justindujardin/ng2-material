import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

@Component({
  selector: 'progress-circular-basic-usage',
  templateUrl: 'examples/components/progress_circular/basic_usage.html',
  styleUrls: ['examples/components/progress_circular/basic_usage.css'],
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
