import {Component} from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material';

@Component({
  moduleId: module.id,
  selector: 'card-action-buttons',
  templateUrl: 'action_buttons.html',
  styleUrls: ['action_buttons.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class CardActionButtons {
}
