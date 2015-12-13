import {Component, View, ViewEncapsulation, Attribute, OnChanges} from 'angular2/core';
import {CONST} from 'angular2/src/facade/lang';
import {isPresent, isBlank} from 'angular2/src/facade/lang';
import {Math} from 'angular2/src/facade/math';
import {Input} from 'angular2/core';

/** Different display / behavior modes for progress_linear. */
@CONST()
class ProgressMode {
  @CONST() static DETERMINATE = 'determinate';
  @CONST() static INDETERMINATE = 'indeterminate';
  @CONST() static BUFFER = 'buffer';
  @CONST() static QUERY = 'query';
}

@Component({
  selector: 'md-progress-linear',
  inputs: ['value', 'bufferValue'],
  host: {
    'role': 'progressbar',
    'aria-valuemin': '0',
    'aria-valuemax': '100',
    '[attr.aria-valuenow]': 'value'
  }
})
@View({
  templateUrl: 'ng2-material/components/progress_linear/progress_linear.html',
  directives: [],
  encapsulation: ViewEncapsulation.None
})
export class MdProgressLinear implements OnChanges {
  /** Clamps a value to be between 0 and 100. */
  static clamp(v) {
    return Math.max(0, Math.min(100, v));
  }


  /** Value for the primary bar. */
  @Input('value') value_: number;

  /** Value for the secondary bar. */
  @Input() bufferValue: number;

  /** The render mode for the progress bar. */
  @Input() mode: string;

  /** CSS `transform` property applied to the primary bar. */
  primaryBarTransform: string;

  /** CSS `transform` property applied to the secondary bar. */
  secondaryBarTransform: string;

  constructor(@Attribute('mode') mode: string) {
    this.primaryBarTransform = '';
    this.secondaryBarTransform = '';

    this.mode = isPresent(mode) ? mode : ProgressMode.DETERMINATE;
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
    if (this.mode === ProgressMode.QUERY || this.mode === ProgressMode.INDETERMINATE ||
        isBlank(this.value)) {
      return;
    }

    this.primaryBarTransform = this.transformForValue(this.value);

    // The bufferValue is only used in buffer mode.
    if (this.mode === ProgressMode.BUFFER) {
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
