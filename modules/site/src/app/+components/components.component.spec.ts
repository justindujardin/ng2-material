import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {addProviders, inject} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {ComponentsComponent} from './components.component';

describe('Component: Components', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      ComponentsComponent,
    ]);
  });

  beforeEach(
      inject([TestComponentBuilder], function(tcb: TestComponentBuilder) { builder = tcb; }));

  it('should inject the component',
     inject([ComponentsComponent], (component: ComponentsComponent) => {
       expect(component).toBeTruthy();
     }));

  it('should create the component', inject([], () => {
       return builder.createAsync(ComponentsComponentTestController)
           .then((fixture: ComponentFixture<any>) => {
             let query = fixture.debugElement.query(By.directive(ComponentsComponent));
             expect(query).toBeTruthy();
             expect(query.componentInstance).toBeTruthy();
           });
     }));
});

@Component({
  selector: 'test',
  template: `
    <docs-components></docs-components>
  `,
  directives: [ComponentsComponent]
})
class ComponentsComponentTestController {
}
