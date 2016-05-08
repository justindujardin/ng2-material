import {Component} from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material';

@Component({
  selector: 'card-basic-usage',
  templateUrl: 'src/components/card/basic_usage.html',
  styleUrls: ['src/components/card/basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class CardBasicUsage {
  public imagePath: string = 'public/images/washedout.png';
}
