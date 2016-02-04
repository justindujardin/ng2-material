import {
  AsyncTestCompleter,
  TestComponentBuilder,
  beforeEach,
  beforeEachProviders,
  ddescribe,
  describe,
  el,
  expect,
  iit,
  inject,
  it,
  xit,
} from 'angular2/testing_internal';

import {Component, View, ViewMetadata, provide, DebugElement} from 'angular2/core';
import {UrlResolver} from 'angular2/compiler';

import {MdButton, MdAnchor} from '../../../ng2-material/components/button/button';

import {TestUrlResolver} from '../../test_url_resolver';
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {ComponentFixture} from "angular2/testing";
import {MATERIAL_PROVIDERS} from "../../../ng2-material/all";
import {Ink} from "../../../ng2-material/core/util/ink";
import {By} from 'angular2/platform/browser';

export function main() {

  const defaultTemplate = `<button md-button type="button" (click)="increment()" [disabled]="isDisabled">Go</button>`;

  /** Test component that contains an MdButton. */
  @Component({selector: 'test-app'})
  @View({
    directives: [MdButton],
    template: defaultTemplate
  })
  class TestComponent {
    clickCount: number = 0;
    isDisabled: boolean = false;

    increment() {
      this.clickCount++;
    }
  }

  describe('MdButton', () => {

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

    describe('button[md-button]', () => {
      it('should handle a click on the button', inject([AsyncTestCompleter], (async) => {
        setup().then((fixture: ComponentFixture) => {
          let testComponent = fixture.debugElement.componentInstance;
          let buttonDebugElement = fixture.debugElement.query(By.css('button'));

          buttonDebugElement.nativeElement.click();
          expect(testComponent.clickCount).toBe(1);

          async.done();
        });
      }), 10000);


      it('should ink ripple when clicked', inject([AsyncTestCompleter], (async) => {
        setup().then((fixture: ComponentFixture) => {
          let button: DebugElement = fixture.debugElement.children[0];

          let save = Ink.rippleEvent;
          let fired = false;
          Ink.rippleEvent = () => {
            fired = true;
            return Promise.resolve();
          };

          let event = DOM.createEvent('mouse');
          button.triggerEventHandler('mousedown', event);


          expect(fired).toBe(true);
          Ink.rippleEvent = save;

          async.done();
        });
      }));

      it('should not ink ripple with md-no-ink attribute', inject([AsyncTestCompleter], (async) => {
        let template = `<button md-button md-no-ink></button>`;
        setup(template).then((fixture: ComponentFixture) => {
          let button: DebugElement = fixture.debugElement.children[0];
          let save = Ink.rippleEvent;
          let fired = false;
          Ink.rippleEvent = () => {
            fired = true;
            return Promise.resolve();
          };

          let event = DOM.createEvent('mouse');
          button.triggerEventHandler('mousedown', event);

          expect(fired).toBe(false);
          Ink.rippleEvent = save;
          async.done();
        });
      }));

      it('should disable the button', inject([AsyncTestCompleter], (async) => {
        setup().then((fixture: ComponentFixture) => {
          let testAppComponent = fixture.debugElement.componentInstance;
          let buttonDebugElement = fixture.debugElement.query(By.css('button'));
          let buttonElement = buttonDebugElement.nativeElement;

          // The button should initially be enabled.
          expect(buttonElement.disabled).toBe(false);

          // After the disabled binding has been changed.
          testAppComponent.isDisabled = true;
          fixture.detectChanges();

          // The button should should now be disabled.
          expect(buttonElement.disabled).toBe(true);

          // Clicking the button should not invoke the handler.
          buttonElement.click();
          expect(testAppComponent.clickCount).toBe(0);
          async.done();
        });
      }), 10000);
    });

    describe('a[md-button]', () => {
      const anchorTemplate = `<a md-button href="javascript:void(0);" [disabled]="isDisabled">Go</a>`;

      beforeEach(() => {
        builder = builder.overrideView(
          TestComponent, new ViewMetadata({template: anchorTemplate, directives: [MdAnchor]}));
      });

      it('should remove disabled anchors from tab order', inject([AsyncTestCompleter], (async) => {
        builder.createAsync(TestComponent).then((fixture: ComponentFixture) => {
          let testAppComponent = fixture.debugElement.componentInstance;
          let anchorDebugElement = fixture.debugElement.query(By.css('a'));
          let anchorElement = anchorDebugElement.nativeElement;

          // The anchor should initially be in the tab order.
          expect(anchorElement.tabIndex).toBe(0);

          // After the disabled binding has been changed.
          testAppComponent.isDisabled = true;
          fixture.detectChanges();

          // The anchor should now be out of the tab order.
          expect(anchorElement.tabIndex).toBe(-1);

          async.done();
        });
      }), 10000);

      it('should not preventDefault on enabled anchor clicks', inject([AsyncTestCompleter], (async) => {
        builder.createAsync(TestComponent).then((fixture: ComponentFixture) => {
          let anchor: DebugElement = fixture.debugElement.children[0];
          let event = DOM.createEvent('mouse');
          let triggered = false;
          event.preventDefault = () => triggered = true;
          anchor.triggerEventHandler('click', event);
          expect(triggered).toBe(false);
          async.done();
        });
      }));
      it('should preventDefault for disabled anchor clicks', inject([AsyncTestCompleter], (async) => {
        builder.createAsync(TestComponent).then((fixture: ComponentFixture) => {
          let anchor: DebugElement = fixture.debugElement.children[0];
          let anchorComp: MdAnchor = anchor.componentInstance;
          let event = DOM.createEvent('mouse');
          let triggered = false;
          event.preventDefault = () => triggered = true;
          anchorComp.disabled = true;
          anchor.triggerEventHandler('click', event);
          expect(triggered).toBe(true);
          fixture.destroy();
          async.done();
        });
      }));
    });
  });
}

