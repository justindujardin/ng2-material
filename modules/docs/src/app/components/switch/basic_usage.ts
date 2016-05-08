import {Component} from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material';

@Component({
  moduleId: module.id,
  selector: 'switch-basic-usage',
  templateUrl: 'basic_usage.html',
  directives: [MATERIAL_DIRECTIVES]
})
export default class SwitchBasicUsage {
  public data: any = {cb1: true, cb4: true, cb5: false};
  public message = 'false';

  public onChange(cbState) { this.message = cbState; };
}
