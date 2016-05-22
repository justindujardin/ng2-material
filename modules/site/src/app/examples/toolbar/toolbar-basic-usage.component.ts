import {Component} from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdIcon} from 'ng2-material';

@Component({
  moduleId: module.id,
  selector: 'toolbar-basic-usage',
  templateUrl: 'toolbar-basic-usage.component.html',
  styleUrls: ['toolbar-basic-usage.component.css'],
  directives: [MdToolbar, MdIcon]
})
export class ToolbarBasicUsageComponent {
}
