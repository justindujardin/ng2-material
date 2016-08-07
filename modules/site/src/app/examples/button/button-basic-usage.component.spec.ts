import {addProviders, inject, ComponentFixture, TestComponentBuilder} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ButtonBasicUsageComponent} from './button-basic-usage.component';

describe('Component: ButtonBasicUsage', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      ButtonBasicUsageComponent,
    ]);
  });

  beforeEach(
      inject([TestComponentBuilder], function(tcb: TestComponentBuilder) { builder = tcb; }));

  it('should inject the component',
     inject([ButtonBasicUsageComponent], (component: ButtonBasicUsageComponent) => {
       expect(component).toBeTruthy();
     }));

  it('should create the component', inject([], () => {
       return builder.createAsync(ButtonBasicUsageComponentTestController)
           .then((fixture: ComponentFixture<any>) => {
             let query = fixture.debugElement.query(By.directive(ButtonBasicUsageComponent));
             expect(query).toBeTruthy();
             expect(query.componentInstance).toBeTruthy();
           });
     }));
});

@Component({
  selector: 'test',
  template: `
    <button-basic-usage></button-basic-usage>
  `,
  directives: [ButtonBasicUsageComponent]
})
class ButtonBasicUsageComponentTestController {
}
