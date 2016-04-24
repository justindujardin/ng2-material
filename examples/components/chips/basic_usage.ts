import {Component, ViewChild, AfterContentInit} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {FORM_DIRECTIVES} from "angular2/common";
import {MdChips} from "../../../ng2-material/components/chips/chips";

@Component({
  selector: 'chips-basic-usage',
  templateUrl: 'examples/components/chips/basic_usage.html',
  styleUrls: ['examples/components/chips/basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})
export default class ChipsBasicUsage implements AfterContentInit {
  ngAfterContentInit(): any {
    console.log(this.child);
  }

  deletable: boolean = false;

  @ViewChild(MdChips) child: MdChips;
}
