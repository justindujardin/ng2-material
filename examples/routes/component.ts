import {Component, OnInit} from "angular2/core";
import {RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import {ComponentsService, IComponentMeta} from "../services/components";
import {MATERIAL_DIRECTIVES, SidenavService} from "ng2-material/all";
import Example from "../example";
import {NavigationService} from "../services/navigation";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {TimerWrapper} from "angular2/src/facade/async";

@Component({
  selector: 'component-page',
  template: `
    <h1 class="examples-title">Examples</h1>
    <p class="examples-intro" *ngIf="value.readme" [innerHtml]="value.readme"></p>

    <example *ngFor="#demo of value.examples" [model]="demo"></example>`,
  directives: [Example, ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES]
})
export class ComponentPage implements OnInit {

  public id: string;

  public value: IComponentMeta = <IComponentMeta>{};

  public next: IComponentMeta = null;
  public previous: IComponentMeta = null;

  constructor(private _components: ComponentsService,
              private _navigation: NavigationService,
              private _sidenav: SidenavService,
              private _routeParams: RouteParams) {
  }

  ngOnInit() {
    TimerWrapper.setTimeout(() => {
      this._sidenav.hide('menu');
    }, 0);
    let id = this._routeParams.get('id');
    this._components.getComponent(id).then((c: IComponentMeta) => {
      this.value = c;
      DOM.setTitle('ng2-material – ' + c.name);
      this._navigation.currentTitle = c.name;
      this._components.getNext(c).then((next: IComponentMeta) => {
        this._navigation.nextLink = this._navigation.componentLink(next);
      });
      this._components.getPrevious(c).then((previous: IComponentMeta) => {
        this._navigation.prevLink = this._navigation.componentLink(previous);
      });
    });
  }

}
