import {View, Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from '../../base';

@Component({selector: 'card-action-buttons'})
@View({
  templateUrl: 'examples/components/card/action_buttons.html',
  styleUrls: ['examples/components/card/action_buttons.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class CardActionButtons {
}
