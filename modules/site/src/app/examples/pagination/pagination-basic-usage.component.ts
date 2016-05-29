import { Component } from '@angular/core';
import {MATERIAL_DIRECTIVES} from "ng2-material";

import {tableDatas} from './pagination-datas';

@Component({
  moduleId: module.id,
  selector: 'pagination-basic-usage',
  templateUrl: 'pagination-basic-usage.component.html',
  directives: [MATERIAL_DIRECTIVES]
})
export class PaginationBasicUsageComponent {
  materials: Array<any> = tableDatas;

  pagination = {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 24
  };

  availableLength: Array<number> = [5, 10, 20];

  pagedMaterials: Array<any> = [];

  constructor() {
    this.refreshMaterials();
  }

  refreshMaterials() {
    let start = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage,
      end = start + this.pagination.itemsPerPage;
    this.pagedMaterials = this.materials.slice(start, end);
  }

  detectChange(event) {
    if (event !== undefined && event.name === 'pagination_changed' && event.pagination !== undefined) {
      this.pagination = event.pagination;
      this.refreshMaterials();
    }
  }
}
