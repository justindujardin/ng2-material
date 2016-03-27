import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES, ITableSelectionChange} from "ng2-material/all";

@Component({
  selector: 'data-table-selectable-usage',
  templateUrl: 'examples/components/data_table/selectable_usage.html',
  styleUrls: ['examples/components/data_table/selectable_usage.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class DataTableSelectableUsage {
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
