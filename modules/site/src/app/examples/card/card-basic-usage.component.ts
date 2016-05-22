import {Component} from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material';

@Component({
  moduleId: module.id,
  selector: 'card-basic-usage',
  templateUrl: 'card-basic-usage.component.html',
  styleUrls: ['card-basic-usage.component.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export class CardBasicUsageComponent {
  public imagePath: string = 'images/washedout.png';
}
