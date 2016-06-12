import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ElevationBasicUsageComponent} from './elevation-basic-usage.component';

describe('Component: ElevationBasicUsage', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [ElevationBasicUsageComponent]);
  beforeEach(
      inject([TestComponentBuilder], function(tcb: TestComponentBuilder) { builder = tcb; }));

  it('should inject the component',
     inject([ElevationBasicUsageComponent], (component: ElevationBasicUsageComponent) => {
       expect(component).toBeTruthy();
     }));

  it('should create the component', inject([], () => {
       return builder.createAsync(ElevationBasicUsageComponentTestController)
           .then((fixture: ComponentFixture<any>) => {
             let query = fixture.debugElement.query(By.directive(ElevationBasicUsageComponent));
             expect(query).toBeTruthy();
             expect(query.componentInstance).toBeTruthy();
           });
     }));
});

@Component({
  selector: 'test',
  template: `
    <elevation-basic-usage></elevation-basic-usage>
  `,
  directives: [ElevationBasicUsageComponent]
})
class ElevationBasicUsageComponentTestController {
}
