import {Component, View, enableProdMode, bind, Input, OnDestroy, ApplicationRef} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import {
  ROUTER_PROVIDERS,
  ROUTER_DIRECTIVES,
  RouteConfig,
  HashLocationStrategy,
  LocationStrategy,
  Router
} from "angular2/router";
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "../ng2-material/all";
import {DEMO_DIRECTIVES} from "./all";
import Example from "./example";
import {Http, Response, HTTP_PROVIDERS} from "angular2/http";
import {IndexPage} from "./routes/index";
import {ComponentPage} from "./routes/component";
import {ComponentsService, IComponentMeta} from "./services/components";
import {NavigationService} from "./services/navigation";
import {VersionService} from "./services/version";
import {SidenavService} from "ng2-material/components/sidenav/sidenav_service";
import {Media} from "ng2-material/core/util/media";

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
  templateUrl: 'examples/app.html',
  directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES, Example, DEMO_DIRECTIVES],
  host: {
    '[class.push-menu]': 'fullPage'
  }
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
              public router: Router,
              public appRef: ApplicationRef,
              private _components: ComponentsService,
              private _sidenav: SidenavService) {
    let query = Media.getQuery(DemosApp.SIDE_MENU_BREAKPOINT);
    this._subscription = media.listen(query).onMatched.subscribe((mql: MediaQueryList) => {
      this.fullPage = mql.matches;
      this.appRef.tick();
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

  navigate(to:any) {
    this.router.navigate(to);
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

bootstrap(DemosApp, appProviders);
