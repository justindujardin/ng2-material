import {Component, Output, HostListener, ViewChild, HostBinding, Input} from "angular2/core";
import "rxjs/add/operator/share";
import {EventEmitter} from "angular2/src/facade/async";
import {MdChip} from "./chip";
import {MdChipsService} from "./chips.service";
import {MdChipInput} from "./chip_input";


/**
 * @name mdChips
 *
 * @description
 * The `<md-chips>` component
 *
 * @usage
 *
 * <md-chips>
 *     <div class="md-chip-input-container">
 *         <input md-chip-input placeholder="" >
 *     </div>
 * </md-chips>
 * <div class="md-errors-spacer"></div>
 *
 */
@Component({
  selector: 'md-chips',
  directives: [MdChip, MdChipInput],
  providers: [MdChipsService],
  template: `
<md-chips-wrapper>
  <md-chip *ngFor="#chip of chips.collection$ | async" [label]="chip"></md-chip>
  <md-chip-input-container>
    <input md-chip-input>
  </md-chip-input-container>
</md-chips-wrapper>
<div class="md-errors-spacer"></div>`
})
export class MdChips {

  /**
   * Chips are deletable by clicking on their (x) button when true
   */
  @Input() deletable: boolean = true;

  @HostBinding('class.md-focused') get focused() {
    return this.input ? this.input.focused : false;
  }

  constructor(public chips: MdChipsService) {
  }

  @ViewChild(MdChipInput) input: MdChipInput;

  @Output() value: EventEmitter<any> = new EventEmitter();

  @HostListener('click') focusInput() {
    this.input.focus();
  }
}
