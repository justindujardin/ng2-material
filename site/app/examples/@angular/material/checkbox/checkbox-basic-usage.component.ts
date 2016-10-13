import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'checkbox-basic-usage',
  templateUrl: 'checkbox-basic-usage.component.html',
  styleUrls: ['checkbox-basic-usage.component.css']
})
export class CheckboxBasicUsageComponent {
  public cb1 = true;
  public cb2 = false;
  public cb3 = false;
  public cb4 = true;
  public cb5 = false;
}
