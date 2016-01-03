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

/** Gets a child DebugElement by tag name. */
export function findChildByTag(parent: DebugElement, tagName: string): DebugElement {
  return parent.query((debugEl) => {
    return debugEl.nativeElement && debugEl.nativeElement.tagName && debugEl.nativeElement.tagName.toLowerCase() === tagName.toLowerCase();
  });
}
/** Gets a child DebugElement by attribute name. */
export function findChildByAttribute(parent: DebugElement, attr: string): DebugElement {
  return parent.query((debugEl) => {
    return DOM.isElementNode(debugEl.nativeElement) && DOM.hasAttribute(debugEl.nativeElement, attr);
  });
}
/** Gets all children by tag name. */
export function findChildrenByTag(parent: DebugElement, tagName: string): DebugElement[] {
  return parent.queryAll((debugEl) => {
    return debugEl.nativeElement && debugEl.nativeElement.tagName && debugEl.nativeElement.tagName.toLowerCase() === tagName.toLowerCase();
  });
}
/** Gets all children by tag name. */
export function findChildrenByAttribute(parent: DebugElement, attr: string): DebugElement[] {
  return parent.queryAll((debugEl) => {
    return DOM.isElementNode(debugEl.nativeElement) && DOM.hasAttribute(debugEl.nativeElement, attr);
  });

}
/**
 * Get a child DebugElement by id
 */
export function findChildById(parent: DebugElement, id: string): DebugElement {
  return parent.query((debugEl) => {
    return debugEl.nativeElement.id.toLowerCase() === id.toLowerCase();
  });
}


export function componentSanityCheck(name: string, selector:string, template: string) {
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
        setup().then(() => async.done());
      }));
      it('should destroy component without fail', inject([AsyncTestCompleter], (async) => {
        setup().then((api:ComponentFixture) => {
          api.destroy();
          async.done();
        });
      }));
    });

  });

}
