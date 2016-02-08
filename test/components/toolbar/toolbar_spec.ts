import {
  TestComponentBuilder,
  beforeEach,
  describe,
  expect,
  inject,
  it,
  ComponentFixture,
  injectAsync
} from "angular2/testing";
import {Component, View} from "angular2/core";
import {MdToolbar} from "../../../ng2-material/components/toolbar/toolbar";
import {By} from "angular2/platform/browser";

export function main() {

  @Component({selector: 'test-app'})
  @View({
    directives: [MdToolbar],
    template: `<md-toolbar></md-toolbar>`
  })
  class TestComponent {
  }

  describe('Toolbar', () => {
    let builder: TestComponentBuilder;

    function setup(template: string = null, typeFn: any = TestComponent): Promise<ComponentFixture> {
      return template ?
        builder.overrideTemplate(typeFn, template).createAsync(typeFn) :
        builder.createAsync(typeFn);
    }

    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    describe('md-toolbar', () => {
      it('defaults mdScrollShrink to false', injectAsync([], () => {
        return setup().then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          let toolbar = <MdToolbar>fixture.debugElement.query(By.css('md-toolbar')).componentInstance;
          expect(toolbar.mdScrollShrink).toBe(false);
        });
      }));
      it('supports scroll shrink', injectAsync([], () => {
        let template = `
          <md-content>
            <md-toolbar mdScrollShrink></md-toolbar>
            <md-content></md-content>
          </md-content>`;
        return setup(template).then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          let toolbar = <MdToolbar>fixture.debugElement.query(By.css('md-toolbar')).componentInstance;
          expect(toolbar.mdScrollShrink).toBe(true);
        });
      }));
    });

  });


}

