import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ComponentsService, IComponentMeta, NavigationService} from '../shared/index';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'docs-components',
  templateUrl: 'components.component.html'
})
export class ComponentsComponent implements OnInit, OnDestroy {
  public value: IComponentMeta = <IComponentMeta>{};

  public next: IComponentMeta = null;
  public previous: IComponentMeta = null;

  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private components: ComponentsService,
              private navigation: NavigationService) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.components.getComponent(params['id']).then((c: IComponentMeta) => {
        this.value = c;
        document.title = 'ng2-material – ' + c.name;
        this.navigation.currentTitle = c.name;
        this.components.getNext(c).then((next: IComponentMeta) => {
          this.navigation.nextLink = this.navigation.componentLink(next);
        });
        this.components.getPrevious(c).then((previous: IComponentMeta) => {
          this.navigation.prevLink = this.navigation.componentLink(previous);
        });
      });
    });
  }

  ngOnDestroy(): any {
    this.subscription.unsubscribe();
  }

}
