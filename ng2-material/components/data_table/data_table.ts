import {Component, Input, Output, EventEmitter, ContentChildren, QueryList} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {MdDataTableTr} from './data_table_tr';
import {MdCheckbox} from '../checkbox/checkbox';
import 'rxjs/add/operator/share';

export * from './data_table_tr';

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
  @Input() selectable: boolean;
  @Output() onSelectableAll: EventEmitter<any> = new EventEmitter(false);
  @Output() onSelectableChange: EventEmitter<any> = new EventEmitter(false);

  @ContentChildren(MdDataTableTr, true) _rows: QueryList<MdDataTableTr>;
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
    let event: any = {
        name: 'selectable_change',
        allSelected: false,
        values: []
      };

    if (true === tr.isInHeader) {
      if (true === tr.isActive) {
        event.allSelected = true;
        event.values = this._getRowsValues();
      }
    } else {
      event.values = this.selected.slice(0);

      if (true === tr.isActive) {
        event.values.push(tr.selectableValue);
      } else {
        let index = event.values.indexOf(tr.selectableValue);
        if (-1 !== index) {
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
  _getRowsValues() {
    return this._rows.toArray()
      .filter((data, index) => index > 0)
      .map((tr: MdDataTableTr) => tr.selectableValue);
  }

}
