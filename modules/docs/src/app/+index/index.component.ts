import {Component, OnInit} from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material';

@Component({
  moduleId: module.id,
  selector: 'app-index',
  templateUrl: 'index.component.html',
  directives: [MATERIAL_DIRECTIVES],
  styleUrls: ['index.component.css']
})
export class IndexComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
