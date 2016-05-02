import {
  Component,
  Output,
  HostListener,
  ViewChild,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ApplicationRef
} from "angular2/core";
import {MdChip} from "./chip";
import {MdChipInput} from "./chip_input";
import "rxjs/add/operator/share";
import {BehaviorSubject} from "rxjs/Rx";
import {Subject} from "rxjs/Subject";
import {uuid} from "../../core/util/uuid";
import {Observable} from "rxjs/Observable";

/** Basic data object for a chip. */
export interface IMdChipData {
  /** Human readable text to show on the chip */
  label: string;
  /** Unique ID to differentiate the chip from others in the list */
  id: any;
  /** Arbitrary user data associated with a chip. */
  data?: any;
}

@Component({
  selector: 'md-chips',
  directives: [MdChip, MdChipInput],
  template: `
  <md-chip *ngFor="#chip of collection$ | async" [chip]="chip"></md-chip>
  <md-chip-input-container *ngIf="!(readonly$ | async)">
    <input md-chip-input [attr.placeholder]="placeholder$ | async">
  </md-chip-input-container>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdChips {

  constructor(public cdr: ChangeDetectorRef, public app: ApplicationRef) {
  }

  @ViewChild(MdChipInput) input: MdChipInput;

  @HostListener('click') focusInput() {
    if (this.input) {
      this.input.focus();
    }
  }

  /** Collection of chip values over time */
  @Output() collection$: Subject<IMdChipData[]> = new BehaviorSubject([]);

  @Input() set collection(value: IMdChipData[]) {
    this._collection = value;
    this.collection$.next(value);
  }

  private _collection: IMdChipData[] = [];


  /** Observable stream of `labels` property */
  @Output() labels$: Observable<string[]> = this.collection$.map((chips) => chips.map((c) => c.label));

  /**
   * Utility for binding simple string labels as chips. These are mapped
   * internally to {@link IMdChipData} instances.
   */
  @Input() set labels(chips: string[]) {
    this.collection = chips.map((c: string) => ({label: c, id: uuid()}));
  }

  /** Observable stream of `unique` property */
  @Output() readonly$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  /** Chips are readonly (no input field) */
  @Input() set readonly(value: boolean) {
    this.readonly$.next(value);
  }

  /** Observable stream of `unique` property */
  @Output() placeholder$: Subject<string> = new BehaviorSubject<string>('');

  /** Placeholder for input */
  @Input() set placeholder(value: string) {
    this.placeholder$.next(value);
  }

  /** Observable stream of `unique` property */
  @Output() unique$: Subject<boolean> = new BehaviorSubject<boolean>(true);

  /** Chips have unique labels when true */
  @Input() set unique(value: boolean) {
    this._unique = value;
    this.unique$.next(value);
  }

  private _unique: boolean = true;

  /** Observable stream of `deletable` property */
  @Output() deletable$: Subject<boolean> = new BehaviorSubject<boolean>(true);

  /** Chips have a remove icon that will delete them when clicked */
  @Input()
  set deletable(value: boolean) {
    this.deletable$.next(value);
  }

  /** Add a chip label to the collection */
  add(chip: string, id: string = uuid()) {
    if (!this._unique || this._collection.filter((c) => c.label === chip).length === 0) {
      this.collection = [...this._collection, {label: chip, id: id}];
    }
  }

  /** Remove a chip from the collection */
  remove(chip: IMdChipData) {
    this.collection = this._collection.filter((c) => c.id !== chip.id);
  }

  /** Pop the last chip */
  removeLast() {
    this.collection = this._collection.splice(0, this._collection.length - 1);
  }
}
