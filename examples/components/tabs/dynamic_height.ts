import {View, Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from '../../base';

@Component({selector: 'tabs-dynamic-height'})
@View({
  templateUrl: 'examples/components/tabs/dynamic_height.html',
  //styleUrls: ['examples/components/tabs/dynamic_height.scss'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class TabsDynamicHeight {
}
