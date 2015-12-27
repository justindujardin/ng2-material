import {
  AsyncTestCompleter,
  TestComponentBuilder,
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  inject,
  it,
} from 'angular2/testing_internal';
import {DebugElement} from 'angular2/src/core/debug/debug_element';
import {Component, View, provide} from 'angular2/core';
import {UrlResolver} from 'angular2/compiler';
import {TestUrlResolver} from '../../test_url_resolver';
import {MATERIAL_PROVIDERS} from '../../../ng2-material/all';
import {ComponentFixture} from "angular2/testing";
import {findChildByTag} from "../../util";
import {findChildById} from "../../util";
import {MdToolbar} from "../../../ng2-material/components/toolbar/toolbar";
import {DOM} from "angular2/src/platform/dom/dom_adapter";


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

    beforeEachProviders(() => [
      MATERIAL_PROVIDERS,
      provide(UrlResolver, {useValue: new TestUrlResolver()}),
    ]);
    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    describe('md-toolbar', () => {
      it('defaults mdScrollShrink to false', inject([AsyncTestCompleter], (async) => {
        setup().then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          let toolbar = <MdToolbar>findChildByTag(fixture.debugElement, 'md-toolbar').componentInstance;
          expect(toolbar.mdScrollShrink).toBe(false);
          async.done();
        });
      }));
      it('supports scroll shrink', inject([AsyncTestCompleter], (async) => {
        let template = `
          <md-content>
            <md-toolbar mdScrollShrink></md-toolbar>
            <md-content></md-content>
          </md-content>`;
        setup(template).then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          let toolbar = <MdToolbar>findChildByTag(fixture.debugElement, 'md-toolbar').componentInstance;
          expect(toolbar.mdScrollShrink).toBe(true);
          async.done();
        });
      }));
    });

  });


}

