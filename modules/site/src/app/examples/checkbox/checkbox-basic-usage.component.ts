import {Component} from '@angular/core';
import {MdCheckbox} from '@angular2-material/checkbox';

@Component({
  moduleId: module.id,
  selector: 'checkbox-basic-usage',
  templateUrl: 'checkbox-basic-usage.component.html',
  styleUrls: ['checkbox-basic-usage.component.css'],
  directives: [MdCheckbox]
})
export class CheckboxBasicUsageComponent {
  public cb1 = true;
  public cb2 = false;
  public cb3 = false;
  public cb4 = true;
  public cb5 = false;
}
