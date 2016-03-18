import {Component, Input, Inject, forwardRef, ElementRef, AfterContentInit} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import {MdDataTable} from './data_table';
import {MdCheckbox} from '../checkbox/checkbox';

@Component({
  selector: 'tr',
  template: `
        <template [ngIf]="thDisplayed">
          <th>
              <md-checkbox #check
                  [checked]="isActive"
                  (click)="change()"></md-checkbox>
          </th>
        </template>
        <template [ngIf]="tdDisplayed">
          <td>
            <md-checkbox #check
                [checked]="isActive"
                (click)="change()"></md-checkbox>
          </td>
        </template>
        <ng-content></ng-content>
    `,
  directives: [MdCheckbox],
  host: {
    '[class.active]': 'isActive'
  }
})
export class MdDataTableTr implements AfterContentInit {
  @Input() selectableValue: string;
  isInHeader: boolean = false;
  isActive: boolean = false;
  thDisplayed: boolean = false;
  tdDisplayed: boolean = false;

  constructor(@Inject(forwardRef(() => MdDataTable)) public table: MdDataTable, private _element: ElementRef) {}

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
    if (true === this.isInHeader) {
      this.table.onSelectableChange
        .map(event => event.allSelected)
        .subscribe(newActiveStatus => this.isActive = newActiveStatus);
    } else {
      this.table.onSelectableChange
        .map(event => {
          return undefined !== event.values &&
              event.values.length &&
              (event.values.findIndex((value: string) => value === this.selectableValue)) !== -1;
        })
        .subscribe(newActiveStatus => this.isActive = newActiveStatus);
    }
  }

  ngAfterContentInit() {
    let element = this._element.nativeElement;
    this.isInHeader = element.parentElement.localName === 'thead';
    this._initListeners();

    this.thDisplayed  = this.table.selectable && this.isInHeader;
    this.tdDisplayed  = this.table.selectable && !this.isInHeader;

    if (false === this.isInHeader && undefined === this.selectableValue) {
      this.selectableValue = Array.prototype.indexOf.call(element.parentNode.children, element).toString();
    }
  }
}
