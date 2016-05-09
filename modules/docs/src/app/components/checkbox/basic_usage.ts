import {Component} from '@angular/core';
import {MdCheckbox} from '@angular2-material/checkbox';

@Component({
  moduleId: module.id,
  selector: 'checkbox-basic-usage',
  templateUrl: 'basic_usage.html',
  styleUrls: ['basic_usage.css'],
  directives: [MdCheckbox]
})
export default class CheckboxBasicUsage {
  public cb1 = true;
  public cb2 = false;
  public cb3 = false;
  public cb4 = true;
  public cb5 = false;
}
