import {ChangeDetectorRef,Component, OnInit, OnDestroy, Input, ViewChild, NgZone, AfterViewInit} from '@angular/core';
import {IndexComponent} from './+index';
import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';
import {ComponentsComponent} from './+components';
import {MATERIAL_DIRECTIVES, Media} from 'ng2-material';
import {NavigationService} from './shared/navigation.service';
import {MD_SIDENAV_DIRECTIVES, MdSidenav} from '@angular2-material/sidenav';
import {MdToolbar} from '@angular2-material/toolbar';
import {ComponentsService, IComponentMeta} from './shared/components.service';
import {Response, Http} from '@angular/http';

@Component({
  moduleId: module.id,
  selector: 'site-app',
  templateUrl: 'site.component.html',
  styleUrls: ['site.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    MATERIAL_DIRECTIVES,
    MD_SIDENAV_DIRECTIVES,
    MdToolbar,

  ]
})
@Routes([
  {path: '/index', component: IndexComponent},
  {path: '/components/:id', component: ComponentsComponent}
])
export class SiteAppComponent implements OnInit,
    OnDestroy, AfterViewInit {
  static SIDE_MENU_BREAKPOINT: string = 'gt-md';

  @ViewChild(MdSidenav) private menu: MdSidenav;

  @Input()
  fullPage: boolean = this.media.hasMedia(SiteAppComponent.SIDE_MENU_BREAKPOINT);

  public site: string = 'Angular2 Material';

  version: string;

  angularVersion: string = null;
  linkTag: string = null;

  components: IComponentMeta[] = [];

  private _subscription = null;

  constructor(
      private http: Http, private navigation: NavigationService, private media: Media, private cdr:ChangeDetectorRef,
      private router: Router, private zone: NgZone, private _components: ComponentsService) {}
  ngAfterViewInit(): any {
    let query = Media.getQuery(SiteAppComponent.SIDE_MENU_BREAKPOINT);
    this._subscription = this.media.listen(query).onMatched.subscribe((mql: MediaQueryList) => {
      this.zone.run(() => {
        this.menu.mode = mql.matches ? 'side' : 'over';
        this.menu.toggle(mql.matches).catch(() => undefined);
        this.cdr.detectChanges();
      });
    });
  }

  ngOnInit() {
    this.http.get('version.json').subscribe((res: Response) => {
      const json = res.json();
      this.version = json.version;
      this.angularVersion = json['@angular/core'];
      this.linkTag = this.angularVersion.replace(/[>=^~]/g, '');
    });
    this._components.getComponents().then((comps) => {
      this.components = comps;
      let title = 'Angular2 Material';
      document.title = title;
      this.navigation.currentTitle = title;
      this.navigation.prevLink = this.navigation.componentLink(comps[comps.length - 1]);
      this.navigation.nextLink = this.navigation.componentLink(comps[0]);
    });
  }


  ngOnDestroy(): any { this._subscription.unsubscribe(); }
}
