import {View, Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from '../../base';

@Component({selector: 'card-basic-usage'})
@View({templateUrl: 'examples/components/card/basic_usage.html', directives: [MATERIAL_DIRECTIVES]})
export default class CardBasicUsage {
  public imagePath: string = 'public/images/washedout.png';
}
