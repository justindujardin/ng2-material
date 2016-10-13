import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'button-basic-usage',
  templateUrl: 'button-basic-usage.component.html',
  styleUrls: ['button-basic-usage.component.css']
})
export class ButtonBasicUsageComponent {
  googleUrl: string = 'https://www.google.com';
  title1: string = 'Button';
  title4: string = 'Warn';
  isDisabled: boolean = true;
}
