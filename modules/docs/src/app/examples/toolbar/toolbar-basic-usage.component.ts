import {Component, OnInit} from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdIcon} from '@angular2-material/icon';

@Component({
  moduleId: module.id,
  selector: 'toolbar-basic-usage',
  templateUrl: 'toolbar-basic-usage.component.html',
  styleUrls: ['toolbar-basic-usage.component.css'],
  directives: [MdToolbar, MdIcon]
})
export class ToolbarBasicUsageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
