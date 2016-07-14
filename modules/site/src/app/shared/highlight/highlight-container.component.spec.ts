import {addProviders, inject} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {HighlightContainerComponent} from './highlight-container.component.ts';

describe('Component: HighlightContainer', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      HighlightContainerComponent,
    ]);
  });

  beforeEach(
      inject([TestComponentBuilder], function(tcb: TestComponentBuilder) { builder = tcb; }));

  it('should inject the component',
     inject([HighlightContainerComponent], (component: HighlightContainerComponent) => {
       expect(component).toBeTruthy();
     }));

  it('should create the component', inject([], () => {
       return builder.createAsync(HighlightContainerComponentTestController)
           .then((fixture: ComponentFixture<any>) => {
             let query = fixture.debugElement.query(By.directive(HighlightContainerComponent));
             expect(query).toBeTruthy();
             expect(query.componentInstance).toBeTruthy();
           });
     }));
});

@Component({
  selector: 'test',
  template: `
    <docs-highlight-container></docs-highlight-container>
  `,
  directives: [HighlightContainerComponent]
})
class HighlightContainerComponentTestController {
}
