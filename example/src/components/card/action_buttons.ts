import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

@Component({
  selector: 'card-action-buttons',
  templateUrl: 'src/components/card/action_buttons.html',
  styleUrls: ['src/components/card/action_buttons.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class CardActionButtons {
}
