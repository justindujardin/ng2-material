import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {MATERIAL_DIRECTIVES} from 'ng2-material';

import {ComponentsService, HighlightComponent} from '../shared';


@Component({
  moduleId: module.id,
  selector: 'docs-index',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css'],
  directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES, HighlightComponent]
})
export class IndexComponent implements OnInit {
  constructor(private components: ComponentsService) {}

  ngOnInit() {}
}
