import {
  Component,
  Input,
  Output,
  HostBinding,
  EventEmitter,
  ElementRef,
  AfterViewInit,
  AfterContentInit,
  OnInit
} from '@angular/core';
import {isPresent} from '@angular/core/src/facade/lang';
import {DomSanitizationService, SafeHtml} from '@angular/platform-browser/src/security/dom_sanitization_service';
import 'rxjs/add/operator/filter';
import {PaginationService} from './pagination_service';


export interface IPaginationModel {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number; 
}

export abstract class AbstractPaginationSubComponent implements OnInit{

  @Input() name: string = 'default';

  @Input() model: IPaginationModel = { currentPage: 0,
    itemsPerPage: 0,
    totalItems: 0
  };

  constructor(protected service: PaginationService) {}

  ngOnInit() {
    if (!this.name) {
      this.name = 'default'; 
    }
    this.service.onChange
        .filter(event => isPresent(event) && isPresent(event.name))
        .filter(event => event.target === this.name)
        .subscribe(event => {
          this.model = event.pagination;
        });
  }

}

@Component({
  selector: 'md-pagination-range',
  template: '',
})
export class MdPaginationRange extends AbstractPaginationSubComponent {

  @HostBinding('class.md-pagination-range') mdPaginationRange: boolean = true;

  @HostBinding('innerHTML') get html() { return this.getRange() };

  @Input() name: string = 'default';

  @Input() model: IPaginationModel = {
    currentPage: 0,
    itemsPerPage: 0,
    totalItems: 0
  };

  @Input('range-format') rangeFormat: string = '{start}-{end} of {total}';

  public value: string = '';

  constructor(protected service: PaginationService, private sanitizationService: DomSanitizationService) {
    super(service);
  }

  /**
   * tranform format into an readable string
   *
   * @returns {string}
   */
  getFormattedValue(rangeStart: number, rangeStop: number, totalItems: number) {
    let result: string = this.rangeFormat;

    result = result.replace(/\{start\}/gi, rangeStart.toString());
    result = result.replace(/\{end\}/gi, rangeStop.toString());
    result = result.replace(/\{total\}/gi, totalItems.toString());

    return result;
  }

  /**
   * calculate range depending via model parameters
   *
   * @param {IPaginationModel} model
   * @private
   */
  getRange() {
    if (isPresent(this.model)) {
      let rangeStart = (this.model.currentPage - 1) * this.model.itemsPerPage + 1;

      let rest = this.model.totalItems - rangeStart,
        rangeStop = rest < this.model.itemsPerPage ? this.model.totalItems : rangeStart + this.model.itemsPerPage - 1;

      return this.sanitizationService.bypassSecurityTrustHtml(
        this.getFormattedValue(rangeStart, rangeStop, this.model.totalItems)
      );
    }

    return;
  }
}

@Component({
  selector: 'md-pagination-controls',
  template: `
      <span [class.md-pagination-control-active]="!isFirstPage()" class="md-pagination-control md-pagination-control-previous">
        <button (click)="previousPage()" class="material-icons">keyboard_arrow_left</button>
      </span>
      <span [class.md-pagination-control-active]="!isLastPage()" class="md-pagination-control md-pagination-control-next">
        <button (click)="nextPage()" class="material-icons">keyboard_arrow_right</button>
      </span>
    `
})
export class MdPaginationControls extends AbstractPaginationSubComponent {

  @HostBinding('class.md-pagination-controls') mdPaginationControls: boolean = true;

  @Input() name: string = 'default';

  @Input() model: IPaginationModel = {
    currentPage: 0,
    itemsPerPage: 0,
    totalItems: 0
  };

  constructor(protected service: PaginationService) {
    super(service);
  }

  isFirstPage() {
    return isPresent(this.model) && this.model.currentPage == 1;
  }

  isLastPage() {
    return isPresent(this.model) && this.model.totalItems <= this.model.currentPage * this.model.itemsPerPage;
  }

  previousPage() {
    if (isPresent(this.model)) {
      this.changePage(this.model.currentPage - 1);
    }
  }

  nextPage() {
    if (isPresent(this.model)) {
      this.changePage(this.model.currentPage + 1);
    }
  }

  changePage(newPage: number) {
    let model = JSON.parse(JSON.stringify(this.model));
    model.currentPage = newPage;
    this.service.change(this.name, model);
  }
}

@Component({
  selector: 'md-pagination-items-per-page',
  template: `
   <span *ngIf="itemsPerPageBefore" class="md-pagination-items-per-page-label md-pagination-items-per-page-before">{{itemsPerPageBefore}}</span>
   <select [(ngModel)]="model.itemsPerPage" (ngModelChange)="changePaginationLength($event)" class="md-pagination-length-select">
      <option *ngFor="let length of itemsPerPageOptions" [value]="length">
        {{length}}
      </option>
    </select>
    <span *ngIf="itemsPerPageAfter" class="md-pagination-items-per-page-label md-pagination-items-per-page-after">{{itemsPerPageAfter}}</span>
  `
})
export class MdPaginationItemsPerPage extends AbstractPaginationSubComponent {

  @HostBinding('class.md-pagination-items-per-page') mdPaginationItemsPerPage: boolean = true;

  @HostBinding() get hidden() { return !this.itemsPerPageOptions || !this.itemsPerPageOptions.length };

  @Input() name: string = 'default';

  @Input() model: IPaginationModel = {
    currentPage: 0,
    itemsPerPage: 0,
    totalItems: 0
  };

  @Input('items-per-page-before') itemsPerPageBefore: string = 'Rows per page:';

  @Input('items-per-page-after') itemsPerPageAfter: string;

  @Input('items-per-page-options') itemsPerPageOptions: Array<number> = [];

  constructor(protected service: PaginationService) {
    super(service);
  }

  changePaginationLength(value) {
    let model = JSON.parse(JSON.stringify(this.model));
    model.currentPage = 1;
    model.itemsPerPage = parseInt(value);
    this.service.change(this.name, model);
  }

}

export interface IPaginationChange {
  name: string;
  target: string;
  pagination: IPaginationModel;
}

@Component({
  selector: 'md-pagination',
  template: `
    <ng-content></ng-content>
    <md-pagination-items-per-page 
      *ngIf="defaultDisplay && itemsPerPage"
      [name]="name" 
      [model]="model" 
      [items-per-page]="itemsPerPage"
      [items-per-page-before]="itemsPerPageBefore"
      [items-per-page-after]="itemsPerPageAfter"
      [items-per-page-options]="itemsPerPageOptions"></md-pagination-items-per-page>
    <md-pagination-range
      *ngIf="defaultDisplay && range"
      [name]="name" 
      [model]="model" 
      [rangeFormat]="rangeFormat"></md-pagination-range>
    <md-pagination-controls
      *ngIf="defaultDisplay && controls"
      [name]="name" 
      [model]="model"></md-pagination-controls>
  `,
  directives: [MdPaginationRange, MdPaginationControls, MdPaginationItemsPerPage],
})
export class MdPagination implements AfterContentInit, AfterViewInit {

  @HostBinding('class.md-pagination') mdPagination: boolean = true;

  @Input() name: string = 'default';

  @Input() model: IPaginationModel = {
    currentPage: 0,
    itemsPerPage: 0,
    totalItems: 0
  };

  @Input() range: boolean = true;

  @Input('range-format') rangeFormat: string;

  @Input() controls: boolean = true;

  @Input('items-per-page') itemsPerPage: boolean = true;

  @Input('items-per-page-before') itemsPerPageBefore: string;

  @Input('items-per-page-after') itemsPerPageAfter: string;

  @Input('items-per-page-options') itemsPerPageOptions: Array<number>;

  @Output('on-pagination-change') onPaginationChange: EventEmitter<IPaginationChange> = new EventEmitter(false);

  defaultDisplay: boolean = true;

  constructor(private service: PaginationService, private element: ElementRef) {
    this.service.onChange
      .filter(event => isPresent(event) && isPresent(event.name))
      .filter(event => {
        return event.target === this.name;
      })
      .subscribe(event => this.onPaginationChange.emit(event));

  }

  ngAfterContentInit() {
    this.defaultDisplay = this.element.nativeElement.childElementCount === 0;
  }

  ngAfterViewInit() {
    this.service.change(this.name, this.model);
  }
}
