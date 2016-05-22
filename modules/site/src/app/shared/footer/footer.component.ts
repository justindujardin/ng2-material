import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {MdToolbar} from '@angular2-material/toolbar';
import {MATERIAL_DIRECTIVES} from 'ng2-material';

import {NavigationService} from '../navigation.service';

@Component({
  moduleId: module.id,
  selector: 'docs-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css'],
  directives: [ROUTER_DIRECTIVES, MdToolbar, MATERIAL_DIRECTIVES]
})
export class FooterComponent implements OnInit {
  constructor(private navigation: NavigationService) {}

  ngOnInit() {}
}
