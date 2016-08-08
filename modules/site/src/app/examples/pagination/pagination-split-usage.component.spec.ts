import {addProviders, inject} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PaginationSplitUsageComponent } from './pagination-split-usage.component';

describe('Component: PaginationSplitUsage', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      PaginationSplitUsageComponent,
    ]);
  });

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([PaginationSplitUsageComponent],
      (component: PaginationSplitUsageComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(PaginationSplitUsageComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(PaginationSplitUsageComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <pagination-split-usage></pagination-split-usage>
  `,
  directives: [PaginationSplitUsageComponent]
})
class PaginationSplitUsageComponentTestController {
}

