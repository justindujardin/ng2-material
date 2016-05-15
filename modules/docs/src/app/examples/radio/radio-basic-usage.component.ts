import {Component} from '@angular/core';
import {MdRadioButton, MdRadioGroup, MdRadioDispatcher} from '@angular2-material/radio';

@Component({
  moduleId: module.id,
  selector: 'radio-basic-usage',
  templateUrl: 'radio-basic-usage.component.html',
  styleUrls: ['radio-basic-usage.component.css'],
  directives: [MdRadioButton, MdRadioGroup],
  providers: [MdRadioDispatcher]
})
export class RadioBasicUsageComponent {
  data: any = {group1: 'Banana', group2: '2', group3: 'avatar-1'};

  avatarData: any[] = [
    {id: 'images/avatars/avatar1.svg', title: 'avatar 1', value: 'avatar-1'},
    {id: 'images/avatars/avatar2.svg', title: 'avatar 2', value: 'avatar-2'},
    {id: 'images/avatars/avatar3.svg', title: 'avatar 3', value: 'avatar-3'}
  ];

}
