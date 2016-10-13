import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'switch-basic-usage',
  templateUrl: 'switch-basic-usage.component.html',
  styleUrls: ['switch-basic-usage.component.css']
})
export class SwitchBasicUsageComponent {
  public data: any = {cb1: true, cb4: true, cb5: false};
  public message = 'false';

  public onChange(cbState) { this.message = cbState; };
}
