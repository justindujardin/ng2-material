import {View, Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from '../../base';

@Component({selector: 'card-inline-actions'})
@View({
  templateUrl: 'examples/components/card/inline_actions.html',
  styleUrls: ['examples/components/card/inline_actions.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class CardInlineActions {
}
