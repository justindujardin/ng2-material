import {Component} from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material';

@Component({
  selector: 'checkbox-syncing',
  templateUrl: 'src/components/checkbox/syncing.html',
  styleUrls: ['src/components/checkbox/syncing.css'],
  directives: [MATERIAL_DIRECTIVES]
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

  exists(item, list) { return list.indexOf(item) > -1; }
}
