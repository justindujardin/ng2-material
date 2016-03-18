import {Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';

@Component({
  selector: 'data-table-selectable-usage',
  templateUrl: 'examples/components/data_table/selectable_usage.html',
  directives: [MATERIAL_DIRECTIVES]
})
export default class DataTableSelectableUsage {
  materials: Array<any> = [
    {'id': 1, 'name': 'Acrylic (Transparent)', 'quantity': '25', 'price': '$2.90'},
    {'id': 2, 'name': 'Plywood (Birch)', 'quantity': '50', 'price': '$1.25'},
    {'id': 3, 'name': 'Laminate (Gold on Blue)', 'quantity': '10', 'price': '$2.35'}
  ];

  logEvent(datas) {
    console.log('Event fired', datas);
  }
}
