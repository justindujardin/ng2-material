import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';
import {MATERIAL_DIRECTIVES} from 'ng2-material';
import {ComponentsService, IComponentMeta, NavigationService, ExampleComponent} from '../shared';
import {HighlightComponent, HighlightContainerComponent} from '../shared/highlight/index';
import {Subscription} from 'rxjs/Subscription';


@Component({
  moduleId: module.id,
  selector: 'docs-components',
  templateUrl: 'components.component.html',
  styleUrls: ['components.component.css'],
  directives: [
    ExampleComponent, ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES, HighlightComponent,
    HighlightContainerComponent
  ]
})
export class ComponentsComponent implements OnInit, OnDestroy {
  public id: string;

  public value: IComponentMeta = <IComponentMeta>{};

  public next: IComponentMeta = null;
  public previous: IComponentMeta = null;

  private subscription: Subscription;

  constructor(private _route: ActivatedRoute,
              private _components: ComponentsService,
              private _navigation: NavigationService) {}

  ngOnInit(): void {
    this.subscription = this._route.params.subscribe((params) => {
      this.id = params['id'];
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
    });
  }

  ngOnDestroy(): any {
    this.subscription.unsubscribe();
  }

}
