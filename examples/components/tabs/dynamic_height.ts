import {View, Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from '../../base';
import {ViewEncapsulation} from "angular2/core";

@Component({selector: 'tabs-dynamic-height'})
@View({
  templateUrl: 'examples/components/tabs/dynamic_height.html',
  styleUrls: ['examples/components/tabs/dynamic_height.css'],
  directives: [MATERIAL_DIRECTIVES],
  encapsulation: ViewEncapsulation.None
})
export default class TabsDynamicHeight {
}
