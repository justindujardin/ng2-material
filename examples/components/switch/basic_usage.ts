import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

@Component({
  selector: 'switch-basic-usage',
  templateUrl: 'examples/components/switch/basic_usage.html',
  directives: [MATERIAL_DIRECTIVES]
})
export default class SwitchBasicUsage {
  public data: any = {
    cb1: true,
    cb4: true,
    cb5: false
  };
  public message = 'false';

  public onChange(cbState) {
    this.message = cbState;
  };
}
