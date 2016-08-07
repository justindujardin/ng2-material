import {Component} from "@angular/core";
import {beforeEach, describe, inject, it, async} from "@angular/core/testing";
import {ComponentFixture, TestComponentBuilder} from "@angular/core/testing";
import {MATERIAL_DIRECTIVES} from "../../index";

export function promiseWait(milliseconds: number = 10): Promise<void> {
  return new Promise<void>((resolve)=> {
    setTimeout(() => resolve(), milliseconds);
  });
}

/**
 * Run a basic lifecycle sanity check on a component. This will create the given component
 * template, wait a few moments, then destroy it.
 * @param name The name for the describe block
 * @param selector The selector that's being tested (for inner describe)
 * @param template The template that contains the component usage.
 */
export function componentSanityCheck(name: string, selector: string, template: string) {
  @Component({
    selector: 'test-app',
    directives: [MATERIAL_DIRECTIVES],
    template: template
  })
  class TestComponent {
  }

  describe(name, () => {
    let builder: TestComponentBuilder;

    function setup(): Promise<any> {
      return builder.createAsync(TestComponent)
        .then((fixture: ComponentFixture<TestComponent>) => {
          fixture.detectChanges();
          return fixture;
        })
        .catch(console.error.bind(console));
    }

    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    describe(selector, () => {
      it('should instantiate component without fail', async(inject([], () => {
        setup()
          .then(() => promiseWait());
      })));
      it('should destroy component without fail', async(inject([], () => {
        setup()
          .then((api: ComponentFixture<TestComponent>) => api.destroy())
          .then(() => promiseWait());
      })));
    });
  });

}
