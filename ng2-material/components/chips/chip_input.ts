import {Directive, ElementRef, HostListener} from "angular2/core";
import {MdChipsService} from "./chips.service";

@Directive({
  selector: 'input[md-chip-input]'
})
export class MdChipInput {
  private input: HTMLInputElement = null;

  @HostListener('focus') onFocus() {
    this.focused = true;
  }

  @HostListener('blur') onBlur() {
    this.focused = false;
  }

  // Whether the input inside of this container has focus.
  focused: boolean = false;

  constructor(private elementRef: ElementRef, private chips: MdChipsService) {
    this.input = elementRef.nativeElement;
  }

  focus() {
    if (this.input && !this.focused) {
      this.input.focus();
    }
  }

  @HostListener('keyup.enter', ['$event.target'])
  submitValue(input: HTMLInputElement) {
    this.chips.add(input.value);
    input.value = null;
  }
}
