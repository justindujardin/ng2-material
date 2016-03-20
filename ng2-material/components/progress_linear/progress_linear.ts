import {Component, ViewEncapsulation, OnChanges, Input} from "angular2/core";
import {CONST, isPresent, isBlank} from "angular2/src/facade/lang";
import {Math} from "angular2/src/facade/math";

/** Different display / behavior modes for progress_linear. */
@CONST()
export class ProgressMode {
  @CONST()
  static DETERMINATE = 'determinate';
  @CONST()
  static INDETERMINATE = 'indeterminate';
  @CONST()
  static BUFFER = 'buffer';
  @CONST()
  static QUERY = 'query';
}

@Component({
  selector: 'md-progress-linear',
  inputs: ['value', 'bufferValue', 'mode'],
  host: {
    'role': 'progressbar',
    'aria-valuemin': '0',
    'aria-valuemax': '100',
    '[attr.aria-valuenow]': 'value',
    '[attr.mode]': 'mode'
  },
  template: `
    <div class="md-progress-linear-container md-ready">
      <div class="md-progress-linear-dashed"></div>
      <div class="md-progress-linear-bar md-progress-linear-bar1"
          [style.-webkit-transform]="secondaryBarTransform"
          [style.transform]="secondaryBarTransform"></div>
      <div class="md-progress-linear-bar md-progress-linear-bar2"
          [style.-webkit-transform]="primaryBarTransform"
          [style.transform]="primaryBarTransform"></div>
    </div>`,
  directives: [],
  encapsulation: ViewEncapsulation.None
})
export class MdProgressLinear implements OnChanges {
  /** Clamps a value to be between 0 and 100. */
  static clamp(v) {
    return Math.max(0, Math.min(100, v));
  }


  /** Value for the primary bar. */
  @Input('value')
  value_: number;

  /** Value for the secondary bar. */
  @Input()
  bufferValue: number;

  /** The render mode for the progress bar. */
  @Input()
  mode: string = ProgressMode.DETERMINATE;

  /** CSS `transform` property applied to the primary bar. */
  primaryBarTransform: string;

  /** CSS `transform` property applied to the secondary bar. */
  secondaryBarTransform: string;

  constructor() {
    this.primaryBarTransform = '';
    this.secondaryBarTransform = '';
  }

  get value() {
    return this.value_;
  }

  set value(v) {
    if (isPresent(v)) {
      this.value_ = MdProgressLinear.clamp(v);
    }
  }

  ngOnChanges(_) {
    // If the mode does not use a value, or if there is no value, do nothing.
    if (this.mode === ProgressMode.QUERY || this.mode === ProgressMode.INDETERMINATE) {
      return;
    }

    if (!isBlank(this.value)) {
      this.primaryBarTransform = this.transformForValue(this.value);
    }


    // The bufferValue is only used in buffer mode.
    if (this.mode === ProgressMode.BUFFER && !isBlank(this.bufferValue)) {
      this.secondaryBarTransform = this.transformForValue(this.bufferValue);
    }
  }

  /** Gets the CSS `transform` property for a progress bar based on the given value (0 - 100). */
  transformForValue(value) {
    // TODO(jelbourn): test perf gain of caching these, since there are only 101 values.
    let scale = value / 100;
    let translateX = (value - 100) / 2;
    return `translateX(${translateX}%) scale(${scale}, 1)`;
  }

}
