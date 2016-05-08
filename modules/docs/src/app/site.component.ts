import {Component, OnInit} from '@angular/core';
import {IndexComponent} from './+index';
import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';
import {ComponentsComponent} from './+components';

@Component({
  moduleId: module.id,
  selector: 'site-app',
  templateUrl: 'site.component.html',
  styleUrls: ['site.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  {path: '/index', component: IndexComponent},
  {path: '/components', component: ComponentsComponent}
])
export class SiteAppComponent implements OnInit {
  title = 'site works!';

  constructor(private router: Router) {}

  ngOnInit() { this.router.navigate(['/index']); }
}
