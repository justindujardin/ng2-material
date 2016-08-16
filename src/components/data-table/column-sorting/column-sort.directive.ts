import {
  Directive,
  Input,
  HostBinding,
  HostListener,
  OnDestroy
} from "@angular/core";
import {Subscription} from 'rxjs/Subscription';
import {
  MdDataColumnSortingService,
  SortDirection,
  ColumnSortingModel
} from './column-sort.service';

/**
 * @name mdDataSortColumnDirective
 *
 * @description
 * A directive that styles its host with sorting class names, and calls
 * {@link MdDataColumnSortingService.changeSorting} to the service instance in its
 * execution context.
 *
 * @usage
 *
 * <hljs lang="html">
 *  <tr>
 *    <th md-data-column-sort="1">Name</th>
 *    <th md-data-column-sort="deux">Occupation</th>
 *    <th md-data-column-sort="your_id_format_3">Status</th>
 *  <tr>
 * </hljs>
 */
@Directive({
  selector: '[md-data-column-sort]'
})
export class MdDataColumnSortDirective implements OnDestroy {

  /**
   * Sorting value of the group of columns.
   * The group is defined by the injection scope of the {@link MdDataColumnSortingService} in the parent component.
   */
  sortingColumn: ColumnSortingModel;
  sortingSubscription: Subscription;

  /** Unique column identifier */
  @Input('md-data-column-sort') mdDataSortColumn: string;

  /** Applies 'sortable' CSS class to host */
  @HostBinding('class.sortable') get sortable() { return true; }

  /** Conditionally applies 'sorted-ascending' CSS class to host */
  @HostBinding('class.sorted-ascending') get sortingAscending() {
    return this.isCurrentColumn() && this.sortingColumn.direction === SortDirection.ASCEND;
  }

  /** Conditionally applies 'sorted-descending' CSS class to host */
  @HostBinding('class.sorted-descending') get sortingDescending() {
    return this.isCurrentColumn() && this.sortingColumn.direction === SortDirection.DESCEND;
  }

  /**
   * Click handler on host element to tell service to sort by this column
   * @param clickEvent - the clickEvent.
   */
  @HostListener('click', ['$event']) sortBy(clickEvent: Event) {
    this.sortingService.onColumnSelect(this.mdDataSortColumn, this.sortingColumn);
  }

  constructor(private sortingService: MdDataColumnSortingService) {
    this.sortingSubscription = this.sortingService.sortingColumn.subscribe(
        (sorting: ColumnSortingModel) => this.sortingColumn = sorting);
  }

  ngOnDestroy() {
    this.sortingSubscription.unsubscribe();
  }

  private isCurrentColumn():boolean {
    return this.sortingColumn && this.sortingColumn.column === this.mdDataSortColumn
  }

}
