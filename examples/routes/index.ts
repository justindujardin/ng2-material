import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {ComponentsService} from "../services/components";
import {IComponentMeta} from "../services/components";
import {OnInit} from "angular2/core";
import {NavigationService} from "../services/navigation";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
  template: `
    <h1 class="examples-title">Getting Started</h1>
    <p class="examples-intro">
      There are many examples on this page. Here's the <a href="coverage/" target="_blank">test coverage</a> report, and a
      <a href="http://plnkr.co/edit/CnDUjVufVnevluFOBvdD?p=preview" target="_blank">plunkr template</a> to get you going.
    </p>

    <nav class="examples-toc">
      <h1>Components</h1>
      <ul>
        <li *ngFor="#value of components"><a [routerLink]="['Component', {id: value.id}]">{{value.name}}</a></li>
      </ul>
    </nav>`,
  directives: [ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES]
})
export class IndexPage implements OnInit {
  public components: IComponentMeta[] = [];

  constructor(private _components: ComponentsService,
              public navigation: NavigationService) {
  }

  ngOnInit(): any {
    this._components.getComponents()
      .then((comps) => {
        this.components = comps;
        this.navigation.prevLink = this.navigation.componentLink(comps[comps.length - 1]);
        this.navigation.nextLink = this.navigation.componentLink(comps[0]);
      });
  }

}
