import {View, Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from '../../base';

@Component({selector: 'card-in-card-actions'})
@View({
  templateUrl: 'examples/components/card/in_card_actions.html',
  styleUrls: ['examples/components/card/in_card_actions.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class InCardActions {
}
