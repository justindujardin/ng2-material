import {addProviders, inject} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ProgressCircleBasicUsageComponent} from './progress-circle-basic-usage.component';

describe('Component: ProgressCircleBasicUsage', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      ProgressCircleBasicUsageComponent,
    ]);
  });

  beforeEach(
      inject([TestComponentBuilder], function(tcb: TestComponentBuilder) { builder = tcb; }));

  it('should inject the component',
     inject([ProgressCircleBasicUsageComponent], (component: ProgressCircleBasicUsageComponent) => {
       expect(component).toBeTruthy();
     }));

  it('should create the component', inject([], () => {
       return builder.createAsync(ProgressCircleBasicUsageComponentTestController)
           .then((fixture: ComponentFixture<any>) => {
             let query =
                 fixture.debugElement.query(By.directive(ProgressCircleBasicUsageComponent));
             expect(query).toBeTruthy();
             expect(query.componentInstance).toBeTruthy();
           });
     }));
});

@Component({
  selector: 'test',
  template: `
    <progress-circle-basic-usage></progress-circle-basic-usage>
  `,
  directives: [ProgressCircleBasicUsageComponent]
})
class ProgressCircleBasicUsageComponentTestController {
}
