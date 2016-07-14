import {addProviders, inject} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ListBasicUsageComponent} from './list-basic-usage.component';

describe('Component: ListBasicUsage', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      ListBasicUsageComponent,
    ]);
  });

  beforeEach(
      inject([TestComponentBuilder], function(tcb: TestComponentBuilder) { builder = tcb; }));

  it('should inject the component',
     inject([ListBasicUsageComponent], (component: ListBasicUsageComponent) => {
       expect(component).toBeTruthy();
     }));

  it('should create the component', inject([], () => {
       return builder.createAsync(ListBasicUsageComponentTestController)
           .then((fixture: ComponentFixture<any>) => {
             let query = fixture.debugElement.query(By.directive(ListBasicUsageComponent));
             expect(query).toBeTruthy();
             expect(query.componentInstance).toBeTruthy();
           });
     }));
});

@Component({
  selector: 'test',
  template: `
    <list-basic-usage></list-basic-usage>
  `,
  directives: [ListBasicUsageComponent]
})
class ListBasicUsageComponentTestController {
}
