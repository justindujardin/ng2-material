import {View, Component} from 'angular2/core';

@Component({selector: 'card-action-buttons'})
@View({templateUrl: 'examples/components/card/card_action_buttons.html'})
export default class DemoView {
  public imagePath: string = 'public/images/washedout.png';
}
