import {Directive, ElementRef} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';


@Directive({
  selector: '[md-icon], .md-icon'
})
export class MdIcon {
  constructor(element: ElementRef) {
    DOM.addClass(element.nativeElement, 'material-icons');
  }
}
