import { Component, Input, Output } from "angular2/core";
import {ObservableWrapper, EventEmitter} from "angular2/src/facade/async";
import {MdIcon} from "../icon/icon";

@Component({
    selector: 'md-chip',
    directives: [MdIcon],
    template: `
    <div class="md-chip-content" role="button">
      <md-chip-template>
        <span>{{chip}}</span>
      </md-chip-template>
    </div>
    <div class="md-chip-remove-container">
      <button class="md-chip-remove" (click)="removeChip(chip)" type="button">
        <i md-icon>close</i>
        <span class="md-visually-hidden">close</span>
      </button>
    </div>`
})
export class MdChip {

    constructor() {}

    @Input()
    chip: any;


    @Output()
    mdRemoveChip: EventEmitter<any> = new EventEmitter();

    removeChip(chipValue) {
        ObservableWrapper.callEmit(this.mdRemoveChip, chipValue);
    }

}
