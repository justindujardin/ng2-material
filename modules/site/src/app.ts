import {Component, Input, OnDestroy, ApplicationRef} from "@angular/core";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "@angular/router-deprecated";
import {DEMO_DIRECTIVES} from "./all";
import Example from "./components/example";
import {Http, Response} from "@angular/http";
import {IndexPage} from "./routes/index";
import {ComponentPage} from "./routes/component";
import {ComponentsService, IComponentMeta} from "./services/components";
import {NavigationService} from "./services/navigation";
import {Media, MATERIAL_DIRECTIVES, SidenavService} from "ng2-material/all";


/**
 * Describe an example that can be dynamically loaded.
 */
export interface IExampleData {
  template: string;
  source: string;
  styles: string;
  component: string;
  name: string;
}

@RouteConfig([
  {path: '/', name: 'Index', component: IndexPage, useAsDefault: true},
  {path: '/components/:id', name: 'Component', component: ComponentPage}
])
@Component({
  selector: 'app',
  templateUrl: 'src/app.html',
  directives: [Example, ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES, DEMO_DIRECTIVES],
  host: {
    '[class.push-menu]': 'fullPage'
  }
})
export class App implements OnDestroy {

  static SIDE_MENU_BREAKPOINT: string = 'gt-md';

  @Input()
  fullPage: boolean = this.media.hasMedia(App.SIDE_MENU_BREAKPOINT);

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
    let query = Media.getQuery(App.SIDE_MENU_BREAKPOINT);
    this._subscription = media.listen(query).onMatched.subscribe((mql: MediaQueryList) => {
      this.fullPage = mql.matches;
      this.appRef.tick();
    });
    this._components.getComponents()
      .then((comps) => {
        this.components = comps;
      });
    http.get('public/version.json')
      .subscribe((res: Response) => {
        this.version = res.json().version;
      });

  }

  ngOnDestroy(): any {
    this._subscription.unsubscribe();
  }

  showMenu(event?) {
    this._sidenav.show('menu');
  }

  navigate(to: any) {
    this.router.navigate(to);
  }

}
