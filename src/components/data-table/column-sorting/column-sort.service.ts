import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

/** Specifies sorting direction */
export enum SortDirection {
  ASCEND, DESCEND
}

/** Sorting model. */
export interface ColumnSortingModel {
  column: string;
  direction: SortDirection;
}


/**
 * Service handling column sort change events as an observable stream.
 */
@Injectable()
export class MdDataColumnSortingService {
  public sortingColumn: BehaviorSubject<ColumnSortingModel> = new BehaviorSubject(
      { column: 'NONE', direction: SortDirection.ASCEND });

  /**
   * Programatically set the column / direction of sorting
   * @param sorting column & direction to sort by.
   */
  public setSorting(sorting: ColumnSortingModel) {
    this.sortingColumn.next(sorting);
  }

  /**
   * Respond to user action on a particular column heading.
   * Inputting the currently sorted-by column will invert the sort direction.
   * @param id identifier of column to sort by
   * @param sorting current sorting model to compare against id
   */
  public onColumnSelect(fromId:string, sorting:ColumnSortingModel) {
    let newSort: ColumnSortingModel = {
      column: fromId,
      direction: SortDirection.ASCEND
    };

    if (sorting && sorting.column === fromId) {
      // invert currently selected column
      newSort.direction = sorting.direction === SortDirection.DESCEND ?
          SortDirection.ASCEND : SortDirection.DESCEND;
    }

    this.setSorting(newSort);
  }
}
