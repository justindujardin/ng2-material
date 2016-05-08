import {Component} from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material';


@Component({
  moduleId: module.id,
  selector: 'button-basic-usage',
  templateUrl: 'basic_usage.html',
  styleUrls: ['basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class ButtonBasicUsage {
  googleUrl: string = 'https://www.google.com';
  title1: string = 'Button';
  title4: string = 'Warn';
  isDisabled: boolean = true;
}
