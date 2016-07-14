import {addProviders, inject} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ProgressBarBasicUsageComponent} from './progress-bar-basic-usage.component';

describe('Component: ProgressBarBasicUsage', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      ProgressBarBasicUsageComponent,
    ]);
  });

  beforeEach(
      inject([TestComponentBuilder], function(tcb: TestComponentBuilder) { builder = tcb; }));

  it('should inject the component',
     inject([ProgressBarBasicUsageComponent], (component: ProgressBarBasicUsageComponent) => {
       expect(component).toBeTruthy();
     }));

  it('should create the component', inject([], () => {
       return builder.createAsync(ProgressBarBasicUsageComponentTestController)
           .then((fixture: ComponentFixture<any>) => {
             let query = fixture.debugElement.query(By.directive(ProgressBarBasicUsageComponent));
             expect(query).toBeTruthy();
             expect(query.componentInstance).toBeTruthy();
           });
     }));
});

@Component({
  selector: 'test',
  template: `
    <progress-bar-basic-usage></progress-bar-basic-usage>
  `,
  directives: [ProgressBarBasicUsageComponent]
})
class ProgressBarBasicUsageComponentTestController {
}
