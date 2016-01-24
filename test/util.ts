import {DebugElement} from "angular2/core";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {ComponentFixture} from "angular2/testing";
import {Component} from "angular2/core";
import {View} from "angular2/core";
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
import {MATERIAL_PROVIDERS} from "../ng2-material/all";
import {provide} from "angular2/core";
import {UrlResolver} from "angular2/compiler";
import {TestUrlResolver} from "./test_url_resolver";
import {MATERIAL_DIRECTIVES} from "../ng2-material/all";
import {TimerWrapper} from "angular2/src/facade/async";

/**
 * Run a basic lifecycle sanity check on a component. This will create the given component
 * template, wait a few moments, then destroy it.
 * @param name The name for the describe block
 * @param selector The selector that's being tested (for inner describe)
 * @param template The template that contains the component usage.
 */
export function componentSanityCheck(name: string, selector: string, template: string) {
  @Component({selector: 'test-app'})
  @View({
    directives: [MATERIAL_DIRECTIVES],
    template: template
  })
  class TestComponent {
  }

  describe(name, () => {
    let builder: TestComponentBuilder;

    function setup(): Promise<any> {
      return builder.createAsync(TestComponent)
        .then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          return fixture;
        })
        .catch(console.error.bind(console));
    }

    beforeEachProviders(() => [
      MATERIAL_PROVIDERS,
      provide(UrlResolver, {useValue: new TestUrlResolver()}),
    ]);
    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    describe(selector, () => {
      it('should instantiate component without fail', inject([AsyncTestCompleter], (async) => {
        setup().then(() => TimerWrapper.setTimeout(() => async.done(), 10));
      }));
      it('should destroy component without fail', inject([AsyncTestCompleter], (async) => {
        setup().then((api: ComponentFixture) => {
          api.destroy();
          TimerWrapper.setTimeout(() => async.done(), 10);
        });
      }));
    });

  });

}
