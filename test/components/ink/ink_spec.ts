import {
  AsyncTestCompleter,
  TestComponentBuilder,
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  inject,
  it
} from "angular2/testing_internal";
import {DebugElement} from "angular2/src/core/debug/debug_element";
import {Component, View, provide} from "angular2/core";
import {UrlResolver} from "angular2/compiler";
import {TestUrlResolver} from "../../test_url_resolver";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {ComponentFixture} from "angular2/testing";
import {MATERIAL_PROVIDERS} from "../../../ng2-material/all";
import {Ink} from "../../../ng2-material/core/util/ink";
import {By} from "angular2/platform/browser";
import {MdInk} from "../../../ng2-material/components/ink/ink";

export function main() {

  const defaultTemplate = `<div md-ink></div>`;

  @Component({selector: 'test-app'})
  @View({
    directives: [MdInk],
    template: defaultTemplate
  })
  class TestComponent {
  }

  describe('MdInk', () => {

    let builder: TestComponentBuilder;

    function setup(template: string = defaultTemplate): Promise<ComponentFixture> {
      return builder
        .overrideTemplate(TestComponent, template)
        .createAsync(TestComponent)
        .then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          return fixture;
        }).catch(console.error.bind(console));
    }

    beforeEachProviders(() => [
      MATERIAL_PROVIDERS,
      provide(UrlResolver, {useValue: new TestUrlResolver()}),
    ]);
    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    describe('[md-ink]', () => {
      it('should ink ripple when clicked', inject([AsyncTestCompleter], (async) => {
        setup().then((fixture: ComponentFixture) => {
          let element: DebugElement = fixture.debugElement.query(By.css('[md-ink]'));

          let save = Ink.rippleEvent;
          let fired = false;
          Ink.rippleEvent = () => {
            fired = true;
            return Promise.resolve();
          };

          let event = DOM.createEvent('mouse');
          element.triggerEventHandler('mousedown', event);


          expect(fired).toBe(true);
          Ink.rippleEvent = save;

          async.done();
        });
      }));

      it('should not ink ripple with md-no-ink attribute', inject([AsyncTestCompleter], (async) => {
        let template = `<div md-ink md-no-ink></div>`;
        setup(template).then((fixture: ComponentFixture) => {
          let element: DebugElement = fixture.debugElement.query(By.css('[md-ink]'));
          let save = Ink.rippleEvent;
          let fired = false;
          Ink.rippleEvent = () => {
            fired = true;
            return Promise.resolve();
          };

          let event = DOM.createEvent('mouse');
          element.triggerEventHandler('mousedown', event);

          expect(fired).toBe(false);
          Ink.rippleEvent = save;
          async.done();
        });
      }));
    });
  });
}

