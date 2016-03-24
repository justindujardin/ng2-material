import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

@Component({
  selector: 'checkbox-basic-usage',
  templateUrl: 'examples/components/checkbox/basic_usage.html',
  styleUrls: ['examples/components/checkbox/basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class CheckboxBasicUsage {
  public cb1 = true;
  public cb2 = false;
  public cb3 = false;
  public cb4 = true;
  public cb5 = false;
}
