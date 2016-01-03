import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {ComponentsService} from "../services/components";
import {IComponentMeta} from "../services/components";
import {OnInit} from "angular2/core";
import {NavigationService} from "../services/navigation";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {Highlight} from "../highlight";

@Component({
  templateUrl: 'examples/routes/index.html',
  directives: [ROUTER_DIRECTIVES, Highlight, MATERIAL_DIRECTIVES]
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
        let title = 'Angular2 Material';
        DOM.setTitle(title);
        this.navigation.currentTitle = title;
        this.navigation.prevLink = this.navigation.componentLink(comps[comps.length - 1]);
        this.navigation.nextLink = this.navigation.componentLink(comps[0]);
      });
  }

}
