import {Component, ViewEncapsulation, OnInit, OnDestroy} from '@angular/core';
import {MATERIAL_DIRECTIVES, Media, MediaListener} from "ng2-material";

import {bookDatas} from './pagination-datas';

@Component({
  moduleId: module.id,
  selector: 'pagination-split-usage',
  templateUrl: 'pagination-split-usage.component.html',
  styleUrls: ['pagination-split-usage.component.css'],
  directives: [MATERIAL_DIRECTIVES],
  encapsulation: ViewEncapsulation.None
})
export class PaginationSplitUsageComponent implements OnInit, OnDestroy {
  pages: Array<string> = bookDatas;

  pagination: any = {
    currentPage: 1,
    itemsPerPage: 2,
    totalItems: 6
  };

  rangeFormat: string;

  displayedPages: Array<string> = [];

  mediaListener: MediaListener;

  constructor(private media: Media) {}

  refreshPageBySize() {
    if (this.media.hasMedia('xs')) {
      this.pagination.itemsPerPage = 1;
      this.rangeFormat = `<span flex="${this.getFlexSize()}" layout="column" class="page-number">{start}</span>`;
    } else {
      this.pagination.itemsPerPage = 2;
      this.rangeFormat = ` 
          <span flex="${this.getFlexSize()}" layout="column" class="page-number">{start}</span>
          <span flex="${this.getFlexSize()}" layout="column" class="page-number">{end}</span>
        `;
    }

    this.pagination.currentPage = 1;

    this.refreshPages();
  }

  getFlexSize() {
    return Math.round(100 / this.pagination.itemsPerPage);
  }

  refreshPages() {
    let start = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage,
      end = start + this.pagination.itemsPerPage;
    this.displayedPages = this.pages.slice(start, end);
  }

  detectChange(event) {
    if (event !== undefined && event.name === 'pagination_changed' && event.pagination !== undefined) {
      this.pagination = event.pagination;
      this.refreshPages();
    }
  }

  ngOnInit() {
    this.mediaListener = this.media.listen(Media.getQuery('xs'));
    this.mediaListener.onMatched.subscribe(this.refreshPageBySize.bind(this));
  }

  ngOnDestroy() {
    this.mediaListener.destroy();
  }
}
