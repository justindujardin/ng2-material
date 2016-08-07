import {Component} from '@angular/core';
import {MdUniqueSelectionDispatcher} from '@angular2-material/core';
import {MD_RADIO_DIRECTIVES} from '@angular2-material/radio';

@Component({
  moduleId: module.id,
  selector: 'radio-basic-usage',
  templateUrl: 'radio-basic-usage.component.html',
  styleUrls: ['radio-basic-usage.component.css'],
  directives: [MD_RADIO_DIRECTIVES],
  providers: [MdUniqueSelectionDispatcher]
})
export class RadioBasicUsageComponent {
  data: any = {default: 'Banana', avatar: 'avatar-1'};

  avatarData: any[] = [
    {id: 'images/avatars/avatar1.svg', title: 'avatar 1', value: 'avatar-1'},
    {id: 'images/avatars/avatar2.svg', title: 'avatar 2', value: 'avatar-2'},
    {id: 'images/avatars/avatar3.svg', title: 'avatar 3', value: 'avatar-3'}
  ];
}
