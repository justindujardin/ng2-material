import {Directive, ElementRef, HostListener, Input} from "angular2/core";
import {MdChipsService} from "./chips.service";

@Directive({
  selector: 'input[md-chip-input]'
})
export class MdChipInput {
  
  /**
   * Chips are unique(no two chips have the same label)
   */
  @Input() unique: boolean = true;
  
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
    if (input.value !== '') {
      this.chips.add(input.value, this.unique);
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
