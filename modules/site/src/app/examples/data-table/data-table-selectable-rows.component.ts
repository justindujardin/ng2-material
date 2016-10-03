import {Component} from '@angular/core';
import {ITableSelectionChange} from 'ng2-material';

@Component({
  moduleId: module.id,
  selector: 'data-table-selectable-rows',
  templateUrl: 'data-table-selectable-rows.component.html',
  styleUrls: ['data-table-selectable-rows.component.css'],
  // directives: [MATERIAL_DIRECTIVES, MdToolbar]
})
export class DataTableSelectableRowsComponent {
  selection: string;
  count: number;
  materials: Array<any> = [
    {'id': 1, 'name': 'Acrylic (Transparent)', 'quantity': '25', 'price': '$2.90'},
    {'id': 2, 'name': 'Plywood (Birch)', 'quantity': '50', 'price': '$1.25'},
    {'id': 3, 'name': 'Laminate (Gold on Blue)', 'quantity': '10', 'price': '$2.35'}
  ];

  change(data: ITableSelectionChange) {
    let names = [];
    this.materials.forEach((mat: any) => {
      if (data.values.indexOf(mat.id) !== -1) {
        names.push(mat.name);
      }
    });
    this.selection = names.join(', ');
    this.count = names.length;
  }
}
