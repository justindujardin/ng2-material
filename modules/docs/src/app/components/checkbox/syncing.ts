import {Component} from "@angular/core";
import {MdCheckbox} from "@angular2-material/checkbox";

@Component({
  moduleId: module.id,
  selector: 'checkbox-syncing',
  templateUrl: 'syncing.html',
  styleUrls: ['syncing.css'],
  directives: [MdCheckbox]
})
export default class CheckboxSyncing {
  items = [1, 2, 3, 4, 5];
  selected = [];

  toggle(item, list) {
    var idx = list.indexOf(item);
    if (idx > -1)
      list.splice(idx, 1);
    else
      list.push(item);
  }

  exists(item, list) {
    return list.indexOf(item) > -1;
  }
}
