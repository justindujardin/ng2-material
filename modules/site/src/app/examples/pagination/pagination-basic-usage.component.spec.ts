import {addProviders, inject} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PaginationBasicUsageComponent } from './pagination-basic-usage.component';

describe('Component: PaginationBasicUsage', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      PaginationBasicUsageComponent,
    ]);
  });

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([PaginationBasicUsageComponent],
      (component: PaginationBasicUsageComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(PaginationBasicUsageComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(PaginationBasicUsageComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <pagination-basic-usage></pagination-basic-usage>
  `,
  directives: [PaginationBasicUsageComponent]
})
class PaginationBasicUsageComponentTestController {
}

