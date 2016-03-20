import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

@Component({
  selector: 'card-basic-usage',
  templateUrl: 'examples/components/card/basic_usage.html',
  styleUrls: ['examples/components/card/basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class CardBasicUsage {
  public imagePath: string = 'public/images/washedout.png';
}
