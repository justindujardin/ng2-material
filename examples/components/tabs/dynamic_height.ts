import {View, Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from '../../base';

@Component({selector: 'tabs-dynamic-height'})
@View({
  templateUrl: 'examples/components/tabs/dynamic_height.html',
  styleUrls: ['examples/components/tabs/dynamic_height.scss'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class TabsDynamicHeight {
  details: any[] = [];
  id: number = 0;

  addDetail() {
    this.id++;
    this.details.push({
      title: `Detail ${this.id}`,
      text: `Some detail text for ${this.id}...`
    });
  }

  removeDetail(detail) {
    this.details = this.details.filter((d) => d !== detail);
  }
}
