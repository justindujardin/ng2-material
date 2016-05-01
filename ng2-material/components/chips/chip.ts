import {Component, Input, ChangeDetectionStrategy, forwardRef, Inject} from "angular2/core";
import {MdIcon} from "../icon/icon";
import {MdChips, IMdChipData} from "./chips";


@Component({
  selector: 'md-chip',
  directives: [MdIcon],
  template: `
    <div class="md-chip-content" role="button">{{chip.label}}</div>
    <div class="md-chip-remove-container" *ngIf="chips.deletable$ | async">
      <button class="md-chip-remove" (click)="chips.remove(chip)" type="button">
        <i md-icon>cancel</i>
        <span class="md-visually-hidden">close</span>
      </button>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.md-deletable]': 'chips.deletable$ | async'
  }
})
export class MdChip {
  constructor(@Inject(forwardRef(() => MdChips)) private chips: MdChips) {
  }

  @Input() chip: IMdChipData;
}
