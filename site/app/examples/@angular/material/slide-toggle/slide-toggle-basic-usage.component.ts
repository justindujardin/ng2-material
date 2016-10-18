import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'slide-toggle-basic-usage',
  templateUrl: 'slide-toggle-basic-usage.component.html',
  styleUrls: ['slide-toggle-basic-usage.component.css']
})
export default class SlideToggleBasicUsageComponent {
  public data: any = {cb1: true, cb4: true, cb5: false};
  public message = 'false';

  public onChange(cbState) { this.message = cbState; };
}
