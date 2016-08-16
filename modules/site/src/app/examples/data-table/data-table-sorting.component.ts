import {
  Component,
  OnDestroy
} from '@angular/core';
import {
  MdDataColumnSortDirective, MdDataColumnSortingService, SortDirection
} from 'ng2-material';
import {Subscription} from 'rxjs/Subscription';


@Component({
  moduleId: module.id,
  selector: 'data-table-sorting',
  providers: [MdDataColumnSortingService],
  directives: [MdDataColumnSortDirective],
  templateUrl: 'data-table-sorting.component.html',
})
export class DataTableSortingComponent implements OnDestroy {

  private colSortChanges: Subscription;

  picnicItems: Array<any> = [
    {'name': 'Wine', 'quantity': 12, 'price': 22.90},
    {'name': 'Cheese', 'quantity': 4, 'price': 32.25},
    {'name': 'Crackers', 'quantity': 117, 'price': 2.35}
  ]

  constructor(private sortingService: MdDataColumnSortingService) {
    // assign default
    this.sortingService.setSorting({ column: 'name', direction: SortDirection.ASCEND });

    // respond to changes
    this.colSortChanges = this.sortingService.sortingColumn.subscribe((col) => {
      this.picnicItems.sort(function (a, b) {
        let valA =  col.direction == SortDirection.ASCEND ? a[col.column] : b[col.column];
        let valB =  col.direction == SortDirection.DESCEND ? a[col.column] : b[col.column];

        return valA < valB ? -1 : valA > valB ? 1 : 0;
      });
    });
  }

  ngOnDestroy() {
    this.colSortChanges.unsubscribe();
  }
}
