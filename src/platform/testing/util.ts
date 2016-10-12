import {Component} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Ng2MaterialModule} from '../../index';

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
    template: template
  })
  class TestComponent {
  }

  describe(name, () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          TestComponent
        ],
        imports: [Ng2MaterialModule],
        providers: []
      });
    });

    function setup(template: string = null): Promise<ComponentFixture<TestComponent>> {
      if (template) {
        TestBed.overrideComponent(TestComponent, {
          set: {
            template: template
          }
        });
      }
      return TestBed.compileComponents()
        .then(() => {
          const fixture = TestBed.createComponent(TestComponent);
          fixture.detectChanges();
          return fixture.whenStable().then(() => fixture);
        })
        .catch(error => {
          return console.error(error);
        });
    }

    describe(selector, () => {
      it('should instantiate component without fail', async(() => {
        setup().then(() => promiseWait());
      }));
      it('should destroy component without fail', async(() => {
        setup()
          .then((api: ComponentFixture<TestComponent>) => {
            return api.destroy();
          })
          .then(() => promiseWait());
      }));
    });
  });

}
