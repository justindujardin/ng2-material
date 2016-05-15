import {Component} from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material';

@Component({
  moduleId: module.id,
  selector: 'button-basic-usage',
  templateUrl: 'button-basic-usage.component.html',
  styleUrls: ['button-basic-usage.component.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export class ButtonBasicUsageComponent {
  googleUrl: string = 'https://www.google.com';
  title1: string = 'Button';
  title4: string = 'Warn';
  isDisabled: boolean = true;
}
