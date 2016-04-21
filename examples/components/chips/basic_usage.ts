import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {FORM_DIRECTIVES} from "angular2/common";

@Component({
  selector: 'chips-basic-usage',
  templateUrl: 'examples/components/chips/basic_usage.html',
  styleUrls: ['examples/components/chips/basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})
export default class ChipsBasicUsage {

}
