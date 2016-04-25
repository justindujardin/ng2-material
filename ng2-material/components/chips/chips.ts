import {Component, Output, HostListener, ViewChild, HostBinding, Input, ChangeDetectionStrategy} from "angular2/core";
import {EventEmitter} from "angular2/src/facade/async";
import {MdChip} from "./chip";
import {MdChipsService, IMdChipData} from "./chips.service";
import {MdChipInput} from "./chip_input";
import "rxjs/add/operator/share";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'md-chips',
  directives: [MdChip, MdChipInput],
  providers: [MdChipsService],
  template: `
  <md-chip *ngFor="#chip of state.collection$ | async" [chip]="chip" [deletable]="deletable"></md-chip>
  <md-chip-input-container>
    <input *ngIf="!readonly" (focus)="onFocus()" (blur)="onBlur()" [unique]="unique" [placeholder]="placeholder" md-chip-input>
  </md-chip-input-container>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdChips {

  /**
   * Chips are deletable by clicking on their (x) button when true
   */
  @Input() deletable: boolean = true;

  /**
   * Chips are readonly (no input field)
   */
  @Input() readonly: boolean = false;

  /**
   * Chips are unique(no two chips have the same label)
   */
  @Input() unique: boolean = true;

  /**
   * Placeholder for input
   */
  @Input() placeholder: string = "";

  @HostBinding('class.md-focused') focused: boolean = false;

  @ViewChild(MdChipInput) input: MdChipInput;

  @Output() value: EventEmitter<IMdChipData[]> = new EventEmitter();

  @HostListener('click') focusInput() {
    if (!this.focused && !this.readonly) {
      this.input.focus();
    }
  }

  private subscription:Subscription;
  constructor(public state: MdChipsService) {
    this.subscription = state.collection$.subscribe((c:IMdChipData[]) => this.value.emit(c));
  }

  onFocus() {
    this.focused = true;
  }

  onBlur() {
    this.focused = false;
  }
}
