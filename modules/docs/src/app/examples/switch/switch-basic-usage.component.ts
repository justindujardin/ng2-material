import {Component} from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material';

@Component({
  moduleId: module.id,
  selector: 'switch-basic-usage',
  templateUrl: 'switch-basic-usage.component.html',
  styleUrls: ['switch-basic-usage.component.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export class SwitchBasicUsageComponent {
  public data: any = {cb1: true, cb4: true, cb5: false};
  public message = 'false';

  public onChange(cbState) { this.message = cbState; };
}
