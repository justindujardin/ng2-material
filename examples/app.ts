import {Component, View, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from '../ng2-material/all';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {DEMO_DIRECTIVES} from './all';
import Example from './example';
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http';
import {IndexPage} from "./routes/index";
import {ComponentPage} from "./routes/component";
import {HashLocationStrategy} from "angular2/router";
import {LocationStrategy} from "angular2/router";
import {bind} from "angular2/core";
import {ComponentsService} from "./services/components";
import {Router} from "angular2/router";
import {Query} from "angular2/core";
import {QueryList} from "angular2/core";
import {NavigationService} from "./services/navigation";
import {AfterViewInit} from "angular2/core";
import {VersionService} from "./services/version";
import { AppViewListener } from 'angular2/src/core/linker/view_listener';
import { DebugElementViewListener } from 'angular2/platform/common_dom';

//
// PLUNKR for ng2: http://plnkr.co/edit/UPJESEgyKFsm4hyW4fWR
//

/**
 * Describe an example that can be dynamically loaded.
 */
export interface IExampleData {
  template:string;
  source:string;
  styles:string;
  component:string;
  name:string;
}

@RouteConfig([
  {path: '/', name: 'Index', component: IndexPage, useAsDefault: true},
  {path: '/components/:id', name: 'Component', component: ComponentPage}
])

@Component({
  selector: 'demos-app'
})
@View({
  templateUrl: 'examples/app.html',
  directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES, Example, DEMO_DIRECTIVES]
})
export class DemosApp {

  public site:string = 'Angular2 Material';

  meta: any;

  version: string;

  constructor(http: Http, public navigation: NavigationService) {
    http.get('public/version.json')
      .subscribe((res: Response) => {
        this.version = res.json().version;
      });
  }

}

let appProviders = [
  HTTP_PROVIDERS, ROUTER_PROVIDERS, MATERIAL_PROVIDERS,
  ComponentsService, NavigationService, VersionService,
  bind(LocationStrategy).toClass(HashLocationStrategy)
];

if(window.location.href.indexOf('github.com') !== -1){
  enableProdMode();
}
else {
  appProviders.push(bind(AppViewListener).toClass(DebugElementViewListener))
}

bootstrap(DemosApp, appProviders);
