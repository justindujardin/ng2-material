import {Component} from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material';

@Component({
  moduleId: module.id,
  selector: 'checkbox-basic-usage',
  templateUrl: 'basic_usage.html',
  styleUrls: ['basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class CheckboxBasicUsage {
  public cb1 = true;
  public cb2 = false;
  public cb3 = false;
  public cb4 = true;
  public cb5 = false;
}
