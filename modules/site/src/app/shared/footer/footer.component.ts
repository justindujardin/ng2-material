import {Component, OnInit} from '@angular/core';


import {NavigationService} from '../navigation.service';

@Component({
  moduleId: module.id,
  selector: 'docs-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css'],
    // directives: [ROUTER_DIRECTIVES, MdToolbar, MATERIAL_DIRECTIVES]
})
export class FooterComponent implements OnInit {
  constructor(private navigation: NavigationService) {}

  ngOnInit() {}
}
