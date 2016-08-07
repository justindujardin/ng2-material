import {addProviders, inject} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {TabsDynamicHeightComponent} from './tabs-dynamic-height.component';

describe('Component: TabsDynamicHeight', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      TabsDynamicHeightComponent,
    ]);
  });

  beforeEach(
      inject([TestComponentBuilder], function(tcb: TestComponentBuilder) { builder = tcb; }));

  it('should inject the component',
     inject([TabsDynamicHeightComponent], (component: TabsDynamicHeightComponent) => {
       expect(component).toBeTruthy();
     }));

  it('should create the component', inject([], () => {
       return builder.createAsync(TabsDynamicHeightComponentTestController)
           .then((fixture: ComponentFixture<any>) => {
             let query = fixture.debugElement.query(By.directive(TabsDynamicHeightComponent));
             expect(query).toBeTruthy();
             expect(query.componentInstance).toBeTruthy();
           });
     }));
});

@Component({
  selector: 'test',
  template: `
    <tabs-dynamic-height></tabs-dynamic-height>
  `,
  directives: [TabsDynamicHeightComponent]
})
class TabsDynamicHeightComponentTestController {
}
