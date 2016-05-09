import {Component} from '@angular/core';
import {MdRadioButton, MdRadioGroup, MdRadioDispatcher} from '@angular2-material/radio';

// TODO (jdd):

@Component({
  moduleId: module.id,
  selector: 'radio-basic-usage',
  templateUrl: 'basic_usage.html',
  styleUrls: ['basic_usage.css'],
  directives: [MdRadioButton, MdRadioGroup],
  providers: [MdRadioDispatcher]
})
export default class RadioBasicUsage {
  data: any = {group1: 'Banana', group2: '2', group3: 'avatar-1'};

  avatarData: any[] = [
    {id: 'images/avatars/avatar1.svg', title: 'avatar 1', value: 'avatar-1'},
    {id: 'images/avatars/avatar2.svg', title: 'avatar 2', value: 'avatar-2'},
    {id: 'images/avatars/avatar3.svg', title: 'avatar 3', value: 'avatar-3'}
  ];
}
