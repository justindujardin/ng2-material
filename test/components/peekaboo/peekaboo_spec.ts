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
import {Component, View, provide, DebugElement} from 'angular2/core';
import {UrlResolver} from 'angular2/compiler';
import {TestUrlResolver} from '../../test_url_resolver';
import {MATERIAL_PROVIDERS} from '../../../ng2-material/all';
import {ComponentFixture} from "angular2/testing";
import {MdPeekaboo} from "../../../ng2-material/components/peekaboo/peekaboo";
import {PeekabooAction} from "../../../ng2-material/components/peekaboo/peekaboo";
import {By} from 'angular2/platform/browser';

export function main() {

  interface IPeekabooFixture {
    fixture:ComponentFixture;
    peek:MdPeekaboo;
    debug:DebugElement;
  }

  @Component({selector: 'test-app'})
  @View({
    directives: [MdPeekaboo],
    template: `<div md-peekaboo></div>`
  })
  class TestComponent {
    hideBinding: string = PeekabooAction.HIDE;
    showBinding: string = PeekabooAction.SHOW;
    sizeBinding: number = 50;
  }

  describe('Peekaboo', () => {
    let builder: TestComponentBuilder;

    function setup(template: string = null): Promise<IPeekabooFixture> {
      let prep = template === null ?
        builder.createAsync(TestComponent) :
        builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
      return prep.then((fixture: ComponentFixture) => {
        fixture.detectChanges();
        let debug = fixture.debugElement.query(By.css('[md-peekaboo]'));
        let component = <MdPeekaboo>debug.componentInstance;
        return {
          fixture: fixture,
          peek: component,
          debug: debug
        };
      }).catch(console.error.bind(console));
    }

    beforeEachProviders(() => [
      MATERIAL_PROVIDERS,
      provide(UrlResolver, {useValue: new TestUrlResolver()}),
    ]);
    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    describe('[md-peekaboo]', () => {
      it('should be inactive by default', inject([AsyncTestCompleter], (async) => {
        setup().then((api: IPeekabooFixture) => {
          expect(api.peek.active).toBe(false);
          api.fixture.destroy();
          async.done();
        });
      }));
      describe('breakAction', () => {
        it('should be undefined by default', inject([AsyncTestCompleter], (async) => {
          setup().then((api: IPeekabooFixture) => {
            expect(api.peek.breakAction).toBeUndefined();
            async.done();
          });
        }));
        it('should be set by attribute', inject([AsyncTestCompleter], (async) => {
          setup(`<div md-peekaboo breakAction="show"></div>`).then((api: IPeekabooFixture) => {
            expect(api.peek.breakAction).toBe(PeekabooAction.SHOW);
            async.done();
          });
        }));
        it('should be set by binding', inject([AsyncTestCompleter], (async) => {
          setup(`<div md-peekaboo [breakAction]="hideBinding"></div>`).then((api: IPeekabooFixture) => {
            expect(api.peek.breakAction).toBe(PeekabooAction.HIDE);
            async.done();
          });
        }));
      });

      ['breakXs', 'breakSm', 'breakMd', 'breakLg', 'breakXl'].forEach((size: string) => {
        describe(size, () => {
          it('should be -1 by default', inject([AsyncTestCompleter], (async) => {
            setup().then((api: IPeekabooFixture) => {
              expect(api.peek[size]).toBe(-1);
              async.done();
            });
          }));
          it('should be set by attribute', inject([AsyncTestCompleter], (async) => {
            setup(`<div md-peekaboo ${size}="25"></div>`).then((api: IPeekabooFixture) => {
              expect(api.peek[size]).toBe(25);
              async.done();
            });
          }));
          it('should be set by binding', inject([AsyncTestCompleter], (async) => {
            setup(`<div md-peekaboo [${size}]="sizeBinding"></div>`).then((api: IPeekabooFixture) => {
              expect(api.peek[size]).toBe(50);
              async.done();
            });
          }));
          it('should work with all breakpoint sizes', inject([AsyncTestCompleter], (async) => {
            setup(`<div md-peekaboo [${size}]="sizeBinding"></div>`).then((api: IPeekabooFixture) => {
              MdPeekaboo.SIZES.forEach((s: string) => {
                api.peek.breakpoint = s;
              });
              async.done();
            });
          }));
        });

      });
    });
  });
}

