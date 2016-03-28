import {Component, Input, Inject, Optional, forwardRef, ElementRef, AfterContentInit} from "angular2/core";
import {MdDataTable} from "./data_table";
import {MdCheckbox} from "../checkbox/checkbox";
import "rxjs/add/operator/map";

@Component({
  selector: 'tr',
  template: `
        <template [ngIf]="thDisplayed">
          <th>
              <md-checkbox #check (click)="change()" [checked]="isActive"></md-checkbox>
          </th>
        </template>
        <template [ngIf]="tdDisplayed">
          <td>
            <md-checkbox #check [checked]="isActive"></md-checkbox>
          </td>
        </template>
        <ng-content></ng-content>
    `,
  directives: [MdCheckbox],
  host: {
    '[class.active]': 'isActive',
    '(click)': 'table?.selectable && !thDisplayed && change()'
  }
})
export class MdDataTableTr implements AfterContentInit {
  @Input()
  selectableValue: string;
  isInHeader: boolean = false;
  isActive: boolean = false;
  thDisplayed: boolean = false;
  tdDisplayed: boolean = false;

  constructor(@Optional() @Inject(forwardRef(() => MdDataTable))
              public table: MdDataTable, private _element: ElementRef) {
  }

  /**
   * Change active status
   */
  change() {
    this.isActive = !this.isActive;
    this.table.toggleActivity(this);
  }

  /**
   * init listener to selectableChange event
   */
  _initListeners() {
    if (this.isInHeader === true) {
      this.table.onSelectableChange
        .map(event => event.allSelected)
        .subscribe(newActiveStatus => this.isActive = newActiveStatus);
    } else {
      this.table.onSelectableChange
        .map(event => {
          return event.values !== undefined &&
            event.values.length &&
            (event.values.findIndex((value: string) => value === this.selectableValue)) !== -1;
        })
        .subscribe(newActiveStatus => this.isActive = newActiveStatus);
    }
  }

  ngAfterContentInit() {
    if (null !== this.table && undefined !== this.table) {
      let element = this._element.nativeElement;
      this.isInHeader = element.parentElement.localName === 'thead';
      this._initListeners();

      this.thDisplayed = this.table.selectable && this.isInHeader;
      this.tdDisplayed = this.table.selectable && !this.isInHeader;

      if (this.isInHeader === false && this.selectableValue === undefined) {
        this.selectableValue = Array.prototype.indexOf.call(element.parentNode.children, element).toString();
      }
    }
  }
}
