import {View, Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from '../../base';

@Component({selector: 'toolbar-basic-usage'})
@View({
  templateUrl: 'examples/components/toolbar/basic_usage.html',
  styleUrls: ['examples/components/toolbar/basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class ToolbarBasicUsage {
  clicked(message: string) {
    alert(message);
  }
}
