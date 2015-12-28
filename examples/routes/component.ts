import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {RouteParams} from "angular2/router";
import {Router} from "angular2/router";
import {OnInit} from "angular2/core";
import {ComponentsService, IComponentMeta} from "../services/components";
import {MATERIAL_DIRECTIVES} from "../../ng2-material/all";
import Example from "../example";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {NavigationService} from "../services/navigation";

@Component({
  selector: 'component-page',
  template: `
    <h1 class="examples-title">{{ value.name }}</h1>
    <p class="examples-intro" *ngIf="value.readme" [innerHtml]="value.readme"></p>

    <example *ngFor="#demo of value.examples" [model]="demo"></example>
    <md-divider></md-divider>`,
  directives: [Example, ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES]
})
export class ComponentPage implements OnInit {

  public id: string;

  public value: IComponentMeta = <IComponentMeta>{};

  public next: IComponentMeta = null;
  public previous: IComponentMeta = null;

  constructor(private _components: ComponentsService,
              private _navigation: NavigationService,
              private _routeParams: RouteParams) {
  }

  ngOnInit() {
    let id = this._routeParams.get('id');
    this._components.getComponent(id).then((c: IComponentMeta) => {
      this.value = c;
      this._components.getNext(c).then((next: IComponentMeta) => {
        this._navigation.nextLink = this._navigation.componentLink(next);
      });
      this._components.getPrevious(c).then((previous: IComponentMeta) => {
        this._navigation.prevLink = this._navigation.componentLink(previous);
      });
    });
  }

}
