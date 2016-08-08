import {addProviders, inject} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {CardActionButtonsComponent} from './card-action-buttons.component';

describe('Component: CardActionButtons', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      CardActionButtonsComponent,
    ]);
  });

  beforeEach(
      inject([TestComponentBuilder], function(tcb: TestComponentBuilder) { builder = tcb; }));

  it('should inject the component',
     inject([CardActionButtonsComponent], (component: CardActionButtonsComponent) => {
       expect(component).toBeTruthy();
     }));

  it('should create the component', inject([], () => {
       return builder.createAsync(CardActionButtonsComponentTestController)
           .then((fixture: ComponentFixture<any>) => {
             let query = fixture.debugElement.query(By.directive(CardActionButtonsComponent));
             expect(query).toBeTruthy();
             expect(query.componentInstance).toBeTruthy();
           });
     }));
});

@Component({
  selector: 'test',
  template: `
    <card-action-buttons></card-action-buttons>
  `,
  directives: [CardActionButtonsComponent]
})
class CardActionButtonsComponentTestController {
}
