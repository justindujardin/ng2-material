import {Directive, ElementRef, HostListener, forwardRef, Inject} from "angular2/core";
import {MdChips} from "./chips";

@Directive({
  selector: 'input[md-chip-input]'
})
export class MdChipInput {

  private input: HTMLInputElement = null;

  constructor(private elementRef: ElementRef,
              @Inject(forwardRef(() => MdChips)) private chips: MdChips) {
    this.input = elementRef.nativeElement;
  }

  focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  @HostListener('keyup.enter', ['$event.target'])
  submitValue(input: HTMLInputElement) {
    if (input.value !== '') {
      this.chips.add(input.value);
      input.value = null;
    }
  }

  @HostListener('keydown.backspace', ['$event.target'])
  onBackspace(input: HTMLInputElement) {
    if (input.value === '') {
      this.chips.removeLast();
    }
  }
}
