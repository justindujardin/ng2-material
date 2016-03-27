import {Component, Input, Output, EventEmitter, ContentChildren, QueryList} from "angular2/core";
import {MdDataTableTr} from "./data_table_tr";
import "rxjs/add/operator/share";

export * from './data_table_tr';

/**
 * Selectable change event data
 */
export interface ITableSelectionChange {
  name: string;
  allSelected: boolean;
  values: any[];
}


@Component({
  selector: 'md-data-table',
  template: `<ng-content></ng-content>`,
  directives: [MdDataTableTr],
  host: {
    '[class.md-data-table]': 'true',
    '[class.md-data-table-selectable]': 'selectable',
  }
})
export class MdDataTable {
  @Input()
  selectable: boolean;
  @Output()
  onSelectableAll: EventEmitter<any> = new EventEmitter(false);
  @Output()
  onSelectableChange: EventEmitter<any> = new EventEmitter(false);

  @ContentChildren(MdDataTableTr, true)
  _rows: QueryList<MdDataTableTr>;
  selected: Array<string> = [];

  constructor() {
    this.onSelectableChange.share();
  }

  /**
   * Fill/Empty the array of selected values
   *
   * @param {MdDataTableTr} tr
   */
  toggleActivity(tr: MdDataTableTr) {
    let event: ITableSelectionChange = {
      name: 'selectable_change',
      allSelected: false,
      values: []
    };

    if (tr.isInHeader === true) {
      if (tr.isActive === true) {
        event.allSelected = true;
        event.values = this._getRowsValues();
      }
    } else {
      event.values = this.selected.slice(0);

      if (tr.isActive === true) {
        event.values.push(tr.selectableValue);
      } else {
        let index = event.values.indexOf(tr.selectableValue);
        if (index !== -1) {
          event.values.splice(index, 1);
        }
      }
    }

    // dispatch change
    this.selected = event.values;
    this.onSelectableChange.emit(event);
  }

  /**
   * @returns {Array<string>}
   */
  _getRowsValues(): any[] {
    return this._rows.toArray()
      .filter((data, index) => index > 0)
      .map((tr: MdDataTableTr) => tr.selectableValue);
  }

}
