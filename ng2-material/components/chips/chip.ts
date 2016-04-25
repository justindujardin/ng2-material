import {Component, Input, HostBinding, ChangeDetectionStrategy} from "angular2/core";
import {MdIcon} from "../icon/icon";
import {MdChipsService, IMdChipData} from "./chips.service";

@Component({
  selector: 'md-chip',
  directives: [MdIcon],
  template: `
    <div class="md-chip-content" role="button">{{chip.label}}</div>
    <div class="md-chip-remove-container">
      <button class="md-chip-remove" (click)="chips.remove(chip)" type="button">
        <i md-icon>cancel</i>
        <span class="md-visually-hidden">close</span>
      </button>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdChip {
  constructor(private chips: MdChipsService) {
  }

  @Input() chip: IMdChipData;

  @HostBinding('class.md-deletable')
  @Input() deletable: boolean = true;
}
