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
import {SidenavService} from "ng2-material/components/sidenav/sidenav_service";
import {IComponentMeta} from "./services/components";
import {Media} from "ng2-material/core/util/media";
import {Input} from "angular2/core";
import {OnDestroy} from "angular2/core";
import {TimerWrapper} from "angular2/src/facade/async";
import {ChangeDetectorRef} from "angular2/core";

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
  selector: 'demos-app',
  host: {
    '[class.push-menu]': 'fullPage'
  }
})
@View({
  templateUrl: 'examples/app.html',
  directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES, Example, DEMO_DIRECTIVES]
})
export class DemosApp implements OnDestroy {

  static SIDE_MENU_BREAKPOINT: string = 'gt-md';

  @Input()
  fullPage: boolean = Media.hasMedia(DemosApp.SIDE_MENU_BREAKPOINT);

  public site: string = 'Angular2 Material';

  version: string;

  components: IComponentMeta[] = [];

  private _subscription = null;

  constructor(http: Http,
              public navigation: NavigationService,
              public media: Media,
              public changeDetection:ChangeDetectorRef,
              private _components: ComponentsService,
              private _sidenav: SidenavService) {
    let query = Media.getQuery(DemosApp.SIDE_MENU_BREAKPOINT);
    this._subscription = media.listen(query).onMatched.subscribe((mql: MediaQueryList) => {
      this.fullPage = mql.matches;
      changeDetection.detectChanges();
    });
    http.get('public/version.json')
      .subscribe((res: Response) => {
        this.version = res.json().version;
      });

    this._components.getComponents()
      .then((comps) => {
        this.components = comps;
      });

  }

  ngOnDestroy(): any {
    this._subscription.unsubscribe();
  }

  showMenu(event?) {
    this._sidenav.show('menu');
  }

}

let appProviders = [
  HTTP_PROVIDERS, ROUTER_PROVIDERS, MATERIAL_PROVIDERS,
  ComponentsService, NavigationService, VersionService,
  bind(LocationStrategy).toClass(HashLocationStrategy)
];

if (window.location.href.indexOf('github.com') !== -1) {
  enableProdMode();
}
else {
  appProviders.push(bind(AppViewListener).toClass(DebugElementViewListener))
}

bootstrap(DemosApp, appProviders);
