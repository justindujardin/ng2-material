import {Directive, ElementRef, HostListener} from "angular2/core";
import {MdChipsService} from "./chips.service";

@Directive({
  selector: 'input[md-chip-input]'
})
export class MdChipInput {
  private input: HTMLInputElement = null;

  constructor(private elementRef: ElementRef, private chips: MdChipsService) {
    this.input = elementRef.nativeElement;
  }

  focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  @HostListener('keyup.enter', ['$event.target'])
  submitValue(input: HTMLInputElement) {
    this.chips.add(input.value);
    input.value = null;
  }

  @HostListener('keydown.backspace', ['$event.target'])
  onBackspace(input: HTMLInputElement) {
    if (input.value === '') {
      this.chips.removeLast();
    }
  }
}
