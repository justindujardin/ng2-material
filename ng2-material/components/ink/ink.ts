import {ElementRef, Directive, Output, EventEmitter} from "angular2/core";
import {Ink} from "../../core/util/ink";

@Directive({
  selector: '[md-ink]',
  host: {
    '(mousedown)': 'onMousedown($event)'
  },
})
export class MdInk {

  @Output()
  inked: EventEmitter<MdInk> = new EventEmitter<MdInk>(false);

  constructor(private _element: ElementRef) {
  }

  onMousedown(event) {
    if (this._element && Ink.canApply(this._element.nativeElement)) {
      Ink.rippleEvent(this._element.nativeElement, event).then(() => {
        this.inked.emit(this);
      });
    }
  }
}
