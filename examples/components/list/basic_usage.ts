import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

let imagePath = 'public/images/avatars/avatar11.svg';

@Component({
  selector: 'list-basic-usage',
  templateUrl: 'examples/components/list/basic_usage.html',
  styleUrls: ['examples/components/list/basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class ListBasicUsage {
  phones = [
    {type: 'Home', number: '(555) 251-1234'},
    {type: 'Cell', number: '(555) 786-9841'},
    {type: 'Office', number: '(555) 314-1592'}
  ];
  todos = [
    {
      face: imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    },
    {
      face: imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    },
    {
      face: imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    },
    {
      face: imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    },
    {
      face: imagePath,
      what: 'Brunch this weekend?',
      who: 'Min Li Chan',
      when: '3:08PM',
      notes: " I'll be in your neighborhood doing errands"
    },
  ];
}
