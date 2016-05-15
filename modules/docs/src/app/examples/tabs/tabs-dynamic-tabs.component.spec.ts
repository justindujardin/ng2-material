import {beforeEach, beforeEachProviders, describe, expect, it, inject,} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {TabsDynamicTabsComponent} from './tabs-dynamic-tabs.component';

describe('Component: TabsDynamicTabs', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [TabsDynamicTabsComponent]);
  beforeEach(
      inject([TestComponentBuilder], function(tcb: TestComponentBuilder) { builder = tcb; }));

  it('should inject the component',
     inject([TabsDynamicTabsComponent], (component: TabsDynamicTabsComponent) => {
       expect(component).toBeTruthy();
     }));

  it('should create the component', inject([], () => {
       return builder.createAsync(TabsDynamicTabsComponentTestController)
           .then((fixture: ComponentFixture<any>) => {
             let query = fixture.debugElement.query(By.directive(TabsDynamicTabsComponent));
             expect(query).toBeTruthy();
             expect(query.componentInstance).toBeTruthy();
           });
     }));
});

@Component({
  selector: 'test',
  template: `
    <tabs-dynamic-tabs></tabs-dynamic-tabs>
  `,
  directives: [TabsDynamicTabsComponent]
})
class TabsDynamicTabsComponentTestController {
}
