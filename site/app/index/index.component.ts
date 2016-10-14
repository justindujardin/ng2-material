import {Component, OnInit} from '@angular/core';
import {ComponentsService} from '../shared/index';


@Component({
  moduleId: module.id,
  selector: 'docs-index',
  templateUrl: 'index.component.html'
})
export class IndexComponent implements OnInit {
  constructor(private components: ComponentsService) {}

  ngOnInit() {}
}
