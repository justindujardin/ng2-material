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
import {MdDialogRef, MdDialogConfig, MdDialog, MdDialogBasic} from "../../../ng2-material/components/dialog/dialog";
import {TimerWrapper} from "angular2/src/facade/async";
import {DOM} from "angular2/src/platform/dom/dom_adapter";


export function main() {

  interface IDialogFixture {
    fixture:ComponentFixture;
    debug:DebugElement;
  }

  @Component({selector: 'test-app'})
  @View({
    directives: [MdDialogBasic],
    template: `<div></div>`
  })
  class TestComponent {
  }

  describe('Dialog', () => {
    let builder: TestComponentBuilder;
    let dialog: MdDialog;

    function setup(): Promise<IDialogFixture> {
      return builder.createAsync(TestComponent)
        .then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          let debug = findChildByTag(fixture.debugElement, 'div');
          return {
            fixture: fixture,
            debug: debug
          };
        })
        .catch(console.error.bind(console));
    }


    beforeEachProviders(() => [
      MATERIAL_PROVIDERS,
      provide(UrlResolver, {useValue: new TestUrlResolver()}),
    ]);
    beforeEach(inject([TestComponentBuilder, MdDialog], (tcb, mdDialog) => {
      builder = tcb;
      dialog = mdDialog;
    }));

    describe('MdDialog', () => {
      describe('open', () => {
        it('should resolve with a reference to the dialog component instance', inject([AsyncTestCompleter], (async) => {
          setup().then((api: IDialogFixture) => {
            let config = new MdDialogConfig();
            dialog.open(MdDialogBasic, api.debug.elementRef, config)
              .then((ref: MdDialogRef) => {
                expect(ref.instance).toBeAnInstanceOf(MdDialogBasic);
                ref.close().then(() => async.done());
              });
          });
        }));
        it('should initialize default config if not specified', inject([AsyncTestCompleter], (async) => {
          setup().then((api: IDialogFixture) => {
            dialog.open(MdDialogBasic, api.debug.elementRef)
              .then((ref: MdDialogRef) => {
                return ref.close();
              })
              .then(() => async.done());
          });
        }));
      });
      describe('close', () => {
        it('should return a promise that resolves once the dialog is closed', inject([AsyncTestCompleter], (async) => {
          setup().then((api: IDialogFixture) => {
            dialog.open(MdDialogBasic, api.debug.elementRef)
              .then((ref: MdDialogRef) => ref.close())
              .then(() => async.done());
          });
        }));
        it('should accept a value to resolve whenClosed with', inject([AsyncTestCompleter], (async) => {
          setup().then((api: IDialogFixture) => {
            dialog.open(MdDialogBasic, api.debug.elementRef)
              .then((ref: MdDialogRef) => {
                ref.whenClosed.then((result) => {
                  expect(result).toBe(1337);
                  async.done();
                });
                ref.close(1337);
              });
          });
        }));
      });
    });

    describe('MdDialogBasic', () => {
      it('should open and close with promises', inject([AsyncTestCompleter], (async) => {
        setup().then((api: IDialogFixture) => {
          let config = new MdDialogConfig();
          dialog.open(MdDialogBasic, api.debug.elementRef, config)
            .then((ref: MdDialogRef) => {
              ref.close().then(() => {
                async.done();
              });
            });
        });
      }));
    });
    describe('MdDialogConfig', () => {
      it('can set parent container', inject([AsyncTestCompleter], (async) => {
        setup().then(() => {
          let config = new MdDialogConfig().parent(DOM.query('body'));
          expect(config.container).toBeAnInstanceOf(HTMLElement);
          expect(config.container.tagName.toLowerCase()).toBe('body');
          async.done();
        });
      }));
      it('can set targetEvent to specify dialog origin point', inject([AsyncTestCompleter], (async) => {
        setup().then(() => {
          let ev = DOM.createMouseEvent('click');
          let config = new MdDialogConfig().targetEvent(ev);
          expect(config.sourceEvent).toBe(ev);
          async.done();
        });
      }));
      it('should bind content options to component instance', inject([AsyncTestCompleter], (async) => {
        setup().then((api: IDialogFixture) => {
          let config = new MdDialogConfig()
            .textContent('Content')
            .title('Title')
            .ariaLabel('Aria')
            .ok('Ok')
            .cancel('Cancel')
            .clickOutsideToClose(false);
          dialog.open(MdDialogBasic, api.debug.elementRef, config)
            .then((ref: MdDialogRef) => {
              let instance: any = ref.instance;
              expect(instance.textContent).toBe('Content');
              expect(instance.title).toBe('Title');
              expect(instance.ariaLabel).toBe('Aria');
              expect(instance.ok).toBe('Ok');
              expect(instance.cancel).toBe('Cancel');
              async.done();
            });
        });
      }));
    });

  });


}

