import {addProviders, inject} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {HighlightComponent} from './highlight.component';

describe('Component: Highlight', () => {
  let builder:TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      HighlightComponent,
    ]);
  });

  beforeEach(
    inject([TestComponentBuilder], function (tcb:TestComponentBuilder) {
      builder = tcb;
    })
  );

  it('should inject the component',
    inject([HighlightComponent], (component:HighlightComponent) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', inject([], () => {
    return builder.createAsync(HighlightComponentTestController)
      .then((fixture:ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(HighlightComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <docs-highlight></docs-highlight>
  `,
  directives: [HighlightComponent]
})
class HighlightComponentTestController {
}
