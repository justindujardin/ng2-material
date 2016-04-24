import {Component, Input} from "angular2/core";
import {MdIcon} from "../icon/icon";
import {MdChipsService} from "./chips.service";

@Component({
  selector: 'md-chip',
  directives: [MdIcon],
  template: `
    <div class="md-chip-content" role="button">{{label}}</div>
    <div class="md-chip-remove-container">
      <button class="md-chip-remove" (click)="removeChip(label)" type="button">
        <i md-icon>cancel</i>
        <span class="md-visually-hidden">close</span>
      </button>
    </div>`
})
export class MdChip {

  constructor(private chips: MdChipsService) {
  }

  @Input() label: string;

  removeChip(label: string) {
    this.chips.remove(label);
  }

}
