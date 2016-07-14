import {addProviders, inject} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {RadioBasicUsageComponent} from './radio-basic-usage.component';

describe('Component: RadioBasicUsage', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      RadioBasicUsageComponent,
    ]);
  });

  beforeEach(
      inject([TestComponentBuilder], function(tcb: TestComponentBuilder) { builder = tcb; }));

  it('should inject the component',
     inject([RadioBasicUsageComponent], (component: RadioBasicUsageComponent) => {
       expect(component).toBeTruthy();
     }));

  it('should create the component', inject([], () => {
       return builder.createAsync(RadioBasicUsageComponentTestController)
           .then((fixture: ComponentFixture<any>) => {
             let query = fixture.debugElement.query(By.directive(RadioBasicUsageComponent));
             expect(query).toBeTruthy();
             expect(query.componentInstance).toBeTruthy();
           });
     }));
});

@Component({
  selector: 'test',
  template: `
    <radio-basic-usage></radio-basic-usage>
  `,
  directives: [RadioBasicUsageComponent]
})
class RadioBasicUsageComponentTestController {
}
