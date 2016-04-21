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
import { Component, Input, Output } from "angular2/core";
import 'rxjs/add/operator/share';
import {ObservableWrapper, EventEmitter} from "angular2/src/facade/async";
import {MdChip} from "./chip";
import {MdChipsService} from "./chips.service";


@Component({
  selector: 'md-chips',
  directives: [MdChip],
  providers: [MdChipsService],
  template: `
    <md-chips-wrapper>
        <md-chip *ngFor="#chip of chips$" [chip]="chip" (mdRemoveChip)="_mdChipService.remove(chip, false)"></md-chip>
        <md-chip-input-container>
          <input md-chip-input
          (focus)="onFocus()"
          (blur)="onBlur()" 
          (keyup.enter)="submitValue($event)">
        </md-chip-input-container>
    </md-chips-wrapper>
    <div class="md-errors-spacer"></div>`,
  host: {
    '[class.md-focused]': 'inputHasFocus'
  }
})
export class MdChips {

  // Whether the input inside of this container has focus.
  private inputHasFocus: boolean = false;

  private chips$: Array<string> = [];

  constructor(private _mdChipService: MdChipsService) { }


  ngOnInit() {

    this._mdChipService.collection$.subscribe(latestCollection => {
      this.chips$ = latestCollection;
    });

  }

  @Output() value: EventEmitter<any> = new EventEmitter();


  onFocus() {
    this.inputHasFocus = true;
  }
  onBlur() {
    this.inputHasFocus = false;
  }

  submitValue($event) {
    this._mdChipService.add($event.target.value);
    $event.target.value = null;
  }
}
