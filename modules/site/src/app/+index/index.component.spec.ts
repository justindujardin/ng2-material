import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {addProviders, inject} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {IndexComponent} from './index.component';

describe('Component: Index', () => {
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      IndexComponent,
    ]);
  });

  beforeEach(
      inject([TestComponentBuilder], function(tcb: TestComponentBuilder) { builder = tcb; }));

  it('should inject the component',
     inject([IndexComponent], (component: IndexComponent) => { expect(component).toBeTruthy(); }));

  it('should create the component', inject([], () => {
       return builder.createAsync(IndexComponentTestController)
           .then((fixture: ComponentFixture<any>) => {
             let query = fixture.debugElement.query(By.directive(IndexComponent));
             expect(query).toBeTruthy();
             expect(query.componentInstance).toBeTruthy();
           });
     }));
});

@Component({
  selector: 'test',
  template: `
    <docs-index></docs-index>
  `,
  directives: [IndexComponent]
})
class IndexComponentTestController {
}
