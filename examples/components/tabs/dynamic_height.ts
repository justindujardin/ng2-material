import {Component, ViewEncapsulation} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

@Component({
  selector: 'tabs-dynamic-height',
  templateUrl: 'examples/components/tabs/dynamic_height.html',
  styleUrls: ['examples/components/tabs/dynamic_height.css'],
  directives: [MATERIAL_DIRECTIVES],
  encapsulation: ViewEncapsulation.None
})
export default class TabsDynamicHeight {
}
