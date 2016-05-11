import {Component} from '@angular/core';
import {OnActivate, RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';
import {ComponentsService, IComponentMeta, NavigationService, ExampleComponent} from '../shared';
import {MATERIAL_DIRECTIVES} from 'ng2-material';


@Component({
  moduleId: module.id,
  selector: 'docs-components',
  templateUrl: 'components.component.html',
  styleUrls: ['components.component.css'],
  directives: [ExampleComponent, ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES]
})
export class ComponentsComponent implements OnActivate {
  public id: string;

  public value: IComponentMeta = <IComponentMeta>{};

  public next: IComponentMeta = null;
  public previous: IComponentMeta = null;

  constructor(private _components: ComponentsService, private _navigation: NavigationService) {}

  routerOnActivate(curr: RouteSegment): void {
    this.id = curr.getParam('id');
    this._components.getComponent(this.id).then((c: IComponentMeta) => {
      this.value = c;
      document.title = 'ng2-material – ' + c.name;
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
