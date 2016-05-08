import {Component} from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material';

let imagePath = 'public/images/avatars/avatar11.svg';

@Component({
  moduleId: module.id,
  selector: 'list-basic-usage',
  templateUrl: 'basic_usage.html',
  styleUrls: ['basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class ListBasicUsage {
  phones = [
    {type: 'Home', number: '(555) 251-1234'}, {type: 'Cell', number: '(555) 786-9841'},
    {type: 'Office', number: '(555) 314-1592'}
  ];
  todos = [
    {
      face: imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: ' I\'ll be in your neighborhood doing errands'
    },
    {
      face: imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: ' I\'ll be in your neighborhood doing errands'
    },
    {
      face: imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: ' I\'ll be in your neighborhood doing errands'
    },
    {
      face: imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: ' I\'ll be in your neighborhood doing errands'
    },
    {
      face: imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: ' I\'ll be in your neighborhood doing errands'
    },
  ];
}
