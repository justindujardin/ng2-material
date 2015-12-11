import {View, Component} from 'angular2/core';

@Component({selector: 'card-in-card-actions'})
@View({templateUrl: 'examples/components/card/in_card_actions.html'})
export default class DemoView {
  public imagePath: string = 'public/images/washedout.png';
}
