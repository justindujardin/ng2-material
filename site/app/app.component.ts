import {
  Component,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  Input,
  ChangeDetectorRef,
  Renderer,
  ElementRef
} from '@angular/core';
import {MdSidenav} from '@angular/material';
import {IComponentMeta, ComponentsService} from './shared/components.service';
import {Http, Response} from '@angular/http';
import {Media} from '../../src/core/util/media';
import {NavigationService} from './shared/navigation.service';
import {MdPeekaboo} from '../../src/components/peekaboo/peekaboo';

@Component({
  selector: 'app',
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html'
})
export class App implements OnInit, OnDestroy, AfterViewInit {
  static SIDE_MENU_BREAKPOINT: string = 'gt-md';

  @ViewChild(MdSidenav) private menu: MdSidenav;

  @Input() fullPage: boolean = this.media.hasMedia(App.SIDE_MENU_BREAKPOINT);

  public site: string = 'Angular2 Material';

  version: string;

  angularVersion: string = null;
  linkTag: string = null;

  components: IComponentMeta[] = [];

  private _subscription = null;

  constructor(private http: Http,
              private changeDetectorRef: ChangeDetectorRef,
              private navigation: NavigationService,
              private media: Media,
              element: ElementRef,
              renderer: Renderer,
              private _components: ComponentsService) {
    // Remove loading class to unset default styles
    renderer.setElementClass(element.nativeElement, 'loading', false);
  }


  ngAfterViewInit(): any {
    let query = Media.getQuery(App.SIDE_MENU_BREAKPOINT);
    this._subscription = this.media.listen(query).onMatched.subscribe((mql: MediaQueryList) => {
      this.menu.mode = mql.matches ? 'side' : 'over';
      this.menu.toggle(mql.matches).catch(() => undefined);
      this.changeDetectorRef.detectChanges();
    });
  }

  get pushed(): boolean {
    return this.menu && this.menu.mode === 'side';
  }

  get over(): boolean {
    return this.menu && this.menu.mode === 'over' && this.menu.opened;
  }


  getScrollTop(scroller: MdPeekaboo): string {
    return scroller.top + 'px';
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


  ngOnDestroy(): any {
    this._subscription.unsubscribe();
  }
}
