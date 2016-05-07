import {Component} from "@angular/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

@Component({
  selector: 'toolbar-basic-usage',
  templateUrl: 'src/components/toolbar/basic_usage.html',
  styleUrls: ['src/components/toolbar/basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class ToolbarBasicUsage {
  clicked(message: string) {
    alert(message);
  }
}
