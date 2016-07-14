import {addProviders, inject} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ExampleComponent} from './example.component';

describe('Component: Example', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      ExampleComponent,
    ]);
  });

  beforeEach(
      inject([TestComponentBuilder], function(tcb: TestComponentBuilder) { builder = tcb; }));

  it('should inject the component', inject([ExampleComponent], (component: ExampleComponent) => {
       expect(component).toBeTruthy();
     }));

  it('should create the component', inject([], () => {
       return builder.createAsync(ExampleComponentTestController)
           .then((fixture: ComponentFixture<any>) => {
             let query = fixture.debugElement.query(By.directive(ExampleComponent));
             expect(query).toBeTruthy();
             expect(query.componentInstance).toBeTruthy();
           });
     }));
});

@Component({
  selector: 'test',
  template: `
    <docs-example></docs-example>
  `,
  directives: [ExampleComponent]
})
class ExampleComponentTestController {
}
