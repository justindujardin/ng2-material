import {
  TestComponentBuilder,
  beforeEach,
  describe,
  expect,
  inject,
  it,
  injectAsync,
  ComponentFixture
} from "angular2/testing";
import {Component, View, DebugElement} from "angular2/core";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
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

    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    describe('[md-ink]', () => {
      it('should ink ripple when clicked', injectAsync([], () => {
        return setup().then((fixture: ComponentFixture) => {
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
        });
      }));

      it('should not ink ripple with md-no-ink attribute', injectAsync([], () => {
        let template = `<div md-ink md-no-ink></div>`;
        return setup(template).then((fixture: ComponentFixture) => {
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
        });
      }));
    });
  });
}

