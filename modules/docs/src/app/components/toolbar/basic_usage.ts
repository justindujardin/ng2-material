import {Component} from "@angular/core";
import {MdToolbar} from "@angular2-material/toolbar";
import {MdIcon} from "@angular2-material/icon";

@Component({
  moduleId: module.id,
  selector: 'toolbar-basic-usage',
  templateUrl: 'basic_usage.html',
  styleUrls: ['basic_usage.css'],
  directives: [MdToolbar, MdIcon]
})
export default class ToolbarBasicUsage {
  clicked(message: string) {
    alert(message);
  }
}
