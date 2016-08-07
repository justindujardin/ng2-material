import {addProviders, inject} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {CardInlineActionsComponent} from './card-inline-actions.component';

describe('Component: CardInlineActions', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      CardInlineActionsComponent,
    ]);
  });

  beforeEach(
      inject([TestComponentBuilder], function(tcb: TestComponentBuilder) { builder = tcb; }));

  it('should inject the component',
     inject([CardInlineActionsComponent], (component: CardInlineActionsComponent) => {
       expect(component).toBeTruthy();
     }));

  it('should create the component', inject([], () => {
       return builder.createAsync(CardInlineActionsComponentTestController)
           .then((fixture: ComponentFixture<any>) => {
             let query = fixture.debugElement.query(By.directive(CardInlineActionsComponent));
             expect(query).toBeTruthy();
             expect(query.componentInstance).toBeTruthy();
           });
     }));
});

@Component({
  selector: 'test',
  template: `
    <card-inline-actions></card-inline-actions>
  `,
  directives: [CardInlineActionsComponent]
})
class CardInlineActionsComponentTestController {
}
