import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

@Component({
  selector: 'menu-basic-usage',
  templateUrl: 'examples/components/menu/basic_usage.html',
  styleUrls: ['examples/components/menu/basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class MenuBasicUsage {
 display: boolean = false;

test()
{
  alert('Hello md-menu');
}

}
