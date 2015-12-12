import {View, Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from '../../base';

@Component({selector: 'progress-linear-basic-usage'})
@View({templateUrl: 'examples/components/progress_linear/basic_usage.html', directives: [MATERIAL_DIRECTIVES]})
export default class DemoView {
  public modes: string[] = [];
  public mode: string = 'query';
  public activated: boolean = true;
  public determinateValue: number = 30;
  public determinateValue2: number = 30;

  private _counter: number = 0;
  private _j: number = 0;

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

      // Incrementally start animation the five (5) Indeterminate,
      // themed progress circular bars

      if ((this._j < 2) && !this.modes[this._j] && this.activated) {
        this.modes[this._j] = (this._j === 0) ? 'buffer' : 'query';
      }
      if (this._counter++ % 4 === 0) {
        this._j++;
      }

      // Show the indicator in the "Used within Containers" after 200ms delay
      if (this._j === 2) {
        this.mode = 'indeterminate';
      }
    }, 100, 0, true);

    setInterval(() => {
      this.mode = (this.mode === 'query' ? 'determinate' : 'query');
    }, 7200, 0, true);

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
      this.determinateValue = 30;
      this.determinateValue2 = 30;
    }
  };

}
