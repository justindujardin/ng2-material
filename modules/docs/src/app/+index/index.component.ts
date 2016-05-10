import {Component, OnInit} from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {ComponentsService} from '../shared';
import {Highlight} from '../components/highlight';

@Component({
  moduleId: module.id,
  selector: 'app-index',
  templateUrl: 'index.component.html',
  styleUrls: ['index.component.css'],
  directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES, Highlight]
})
export class IndexComponent implements OnInit {
  constructor(private components: ComponentsService) {
  }

  ngOnInit() {
  }
}
