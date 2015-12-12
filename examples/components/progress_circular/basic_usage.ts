import {View, Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from '../../base';

@Component({selector: 'progress-circular-basic-usage'})
@View({templateUrl: 'examples/components/progress_circular/basic_usage.html', directives: [MATERIAL_DIRECTIVES]})
export default class ProgressCircularBasicUsage {
  public imagePath: string = 'public/images/washedout.png';

  public modes: string[] = [];
  public activated: boolean = true;
  public determinateValue: number = 30;

  constructor() {

    // Iterate every 100ms, non-stop
    setInterval(() => {

      // Increment the Determinate loader

      this.determinateValue += 1;
      if (this.determinateValue > 100) {
        this.determinateValue = 30;
      }

      // Incrementally start animation the five (5) Indeterminate,
      // themed progress circular bars

      if ((this._j < 5) && !this.modes[this._j] && this.activated) {
        this.modes[this._j] = 'indeterminate';
      }
      if (this._counter++ % 4 === 0) {
        this._j++;
      }
    }, 100, 0, true);
  }

  /**
   * Turn off or on the 5 themed loaders
   */
  toggleActivation() {
    if (!this.activated) {
      this.modes = [];
    }
    if (this.activated) {
      this._j = this._counter = 0;
    }
  };


  private _counter: number = 0;
  private _j: number = 0;

}
