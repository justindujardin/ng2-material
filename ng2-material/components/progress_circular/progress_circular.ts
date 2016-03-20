import {Component, ViewEncapsulation, Input} from "angular2/core";
import {CONST, isBlank, isPresent} from "angular2/src/facade/lang";
import {MdProgressLinear} from "../progress_linear/progress_linear";
import {Math} from "angular2/src/facade/math";

@CONST()
class ProgressMode {
  @CONST()
  static DETERMINATE = 'determinate';
  @CONST()
  static INDETERMINATE = 'indeterminate';
}

@CONST()
class Defaults {
  @CONST()
  static DEFAULT_PROGRESS_SIZE = 100;
  @CONST()
  static DEFAULT_SCALING = 0.5;
  @CONST()
  static DEFAULT_HALF_TRANSITION = 'transform 0.1s linear';
}

@Component({
  selector: 'md-progress-circular',
  inputs: ['value', 'diameter'],
  host: {
    'role': 'progressbar',
    'aria-valuemin': '0',
    'aria-valuemax': '100',
    '[attr.aria-valuenow]': 'value',
    '[style.width]': 'outerSize',
    '[style.height]': 'outerSize'
  },
  template: `
    <div class="md-scale-wrapper"
     [style.-webkit-transform]="diameterTransformation"
     [style.transform]="diameterTransformation">
      <div class="md-spinner-wrapper">
        <div class="md-inner">
          <div class="md-gap"
          [style.-webkit-transition]="gapTransition"
          [style.transition]="gapTransition"></div>
          <div class="md-left">
            <div class="md-half-circle"
              [style.-webkit-transform]="leftHalfTransform"
              [style.transform]="leftHalfTransform"
              [style.-webkit-transition]="defaultHalfTransition"
              [style.transition]="defaultHalfTransition"></div>
          </div>
          <div class="md-right">
            <div class="md-half-circle"
              [style.-webkit-transform]="rightHalfTransform"
              [style.transform]="rightHalfTransform"
              [style.-webkit-transition]="defaultHalfTransition"
              [style.transition]="defaultHalfTransition"></div>
          </div>
        </div>
      </div>
    </div>`,
  directives: [],
  encapsulation: ViewEncapsulation.None
})
export class MdProgressCircular extends MdProgressLinear {

  /** Value for the circle diameter. */
  @Input('diameter')
  diameter_: string;

  @Input()
  mode: string;


  /** CSS `transform` property applied to the circle diameter. */
  diameterTransformation: string;

  /** CSS property length of circle preloader side. */
  outerSize: string;

  /** CSS `transform` property applied to the circle gap. */
  gapTransition: string;

  /** CSS `transition` property applied to circle. */
  defaultHalfTransition: string = Defaults.DEFAULT_HALF_TRANSITION;

  /** CSS `transform` property applied to the left half of circle. */
  leftHalfTransform: string;

  /** CSS `transform` property applied to the right half of circle. */
  rightHalfTransform: string;

  get diameter() {
    return this.diameter_;
  }

  set diameter(v) {
    if (isPresent(v)) {
      this.diameter_ = v;
    }
  }

  ngOnInit() {
    this.updateScale();
  }

  ngOnChanges(_) {
    if (this.mode === ProgressMode.INDETERMINATE || isBlank(this.value)) {
      return;
    }

    this.gapTransition = (this.value <= 50) ? '' : 'borderBottomColor 0.1s linear';

    this.transformLeftHalf(this.value);
    this.transformRightHalf(this.value);
  }

  transformLeftHalf(value) {
    let rotation = (value <= 50) ? 135 : (((value - 50) / 50 * 180) + 135);

    this.leftHalfTransform = `rotate(${rotation}deg)`;
  }

  transformRightHalf(value) {
    let rotation = (value >= 50) ? 45 : (value / 50 * 180 - 135);

    this.rightHalfTransform = `rotate(${rotation}deg)`;
  }

  updateScale() {
    this.outerSize = 100 * this.getDiameterRatio() + 'px';
    this.diameterTransformation = `translate(-50%, -50%) scale( ${this.getDiameterRatio()} )`;
  }

  getDiameterRatio(): number {
    if (!this.diameter) return Defaults.DEFAULT_SCALING;

    var match = /([0-9]*)%/.exec(this.diameter);
    var value = Math.max(0, (<any>match && <any>match[1] / 100) || parseFloat(this.diameter));

    return (value > 1) ? value / Defaults.DEFAULT_PROGRESS_SIZE : value;
  }

  webkit(style: string) {
    return `-webkit-${style}`;
  }
}
