import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {FORM_DIRECTIVES} from "angular2/common";
import {MdChips} from "../../../ng2-material/components/chips/chips";

@Component({
  selector: 'chips-basic-usage',
  templateUrl: 'examples/components/chips/basic_usage.html',
  styleUrls: ['examples/components/chips/basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})
export default class ChipsBasicUsage {
  deletable: boolean = true;
  unique: boolean = true;
  readonly: boolean = false;
  placeholder: string = "Start typing";
}
