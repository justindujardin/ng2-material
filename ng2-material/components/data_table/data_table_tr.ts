import {Component, Input, Inject, forwardRef, ElementRef, AfterContentInit} from "angular2/core";
import {isPresent} from "angular2/src/facade/lang";
import {MdDataTable} from "./data_table";
import {MdCheckbox} from "../checkbox/checkbox";
import "rxjs/add/operator/map";


/**
 * MdDataTable row
 */
export interface ITableRow {
  selectableValue: string;
  isActive: boolean;
}

@Component({
  selector: 'tr[md-data-table-header-row]',
  template: `
        <template [ngIf]="table?.selectable">
          <th>
              <md-checkbox #check [checked]="isActive"></md-checkbox>
          </th>
        </template>
        <ng-content></ng-content>
    `,
  directives: [MdCheckbox],
  host: {
    '[class.active]': 'isActive',
    '(click)': 'table?.selectable && change()'
  }
})
export class MdDataTableHeaderRow implements AfterContentInit, ITableRow {
  @Input('selectable-value')
  selectableValue: string;
  isActive: boolean = false;

  constructor(@Inject(forwardRef(() => MdDataTable))
              public table: MdDataTable) {
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
    this.table.onSelectableChange
      .map(event => event.allSelected)
      .subscribe(newActiveStatus => this.isActive = newActiveStatus);
  }

  ngAfterContentInit() {
    if (isPresent(this.table)) {
      this._initListeners();
    }
  }
}

@Component({
  selector: 'tr[md-data-table-row]',
  template: `
        <template [ngIf]="table?.selectable">
          <td>
            <md-checkbox #check [checked]="isActive"></md-checkbox>
          </td>
        </template>
        <ng-content></ng-content>
    `,
  directives: [MdCheckbox],
  host: {
    '[class.active]': 'isActive',
    '(click)': 'table?.selectable && change()'
  }
})
export class MdDataTableRow implements AfterContentInit, ITableRow {
  @Input('selectable-value')
  selectableValue: string;
  isActive: boolean = false;

  constructor(@Inject(forwardRef(() => MdDataTable))
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
    this.table.onSelectableChange
      .map(event => {
        return event.values !== undefined &&
          event.values.length &&
          (event.values.findIndex((value: string) => value === this.selectableValue)) !== -1;
      })
      .subscribe(newActiveStatus => this.isActive = newActiveStatus);
  }

  ngAfterContentInit() {
    if (isPresent(this.table)) {
      let element = this._element.nativeElement;
      this._initListeners();

      if (this.selectableValue === undefined) {
        this.selectableValue = Array.prototype.indexOf.call(element.parentNode.children, element).toString();
      }
    }
  }
}
