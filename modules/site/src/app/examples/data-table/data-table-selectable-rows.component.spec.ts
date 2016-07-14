import {addProviders, inject} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {DataTableSelectableRowsComponent} from './data-table-selectable-rows.component';

describe('Component: DataTableSelectableRows', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      DataTableSelectableRowsComponent,
    ]);
  });

  beforeEach(
      inject([TestComponentBuilder], function(tcb: TestComponentBuilder) { builder = tcb; }));

  it('should inject the component',
     inject([DataTableSelectableRowsComponent], (component: DataTableSelectableRowsComponent) => {
       expect(component).toBeTruthy();
     }));

  it('should create the component', inject([], () => {
       return builder.createAsync(DataTableSelectableRowsComponentTestController)
           .then((fixture: ComponentFixture<any>) => {
             let query = fixture.debugElement.query(By.directive(DataTableSelectableRowsComponent));
             expect(query).toBeTruthy();
             expect(query.componentInstance).toBeTruthy();
           });
     }));
});

@Component({
  selector: 'test',
  template: `
    <data-table-selectable-rows></data-table-selectable-rows>
  `,
  directives: [DataTableSelectableRowsComponent]
})
class DataTableSelectableRowsComponentTestController {
}
