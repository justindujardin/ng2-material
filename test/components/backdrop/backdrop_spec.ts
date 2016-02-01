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
import {MdBackdrop} from "../../../ng2-material/components/backdrop/backdrop";
import {TimerWrapper} from "angular2/src/facade/async";
import {By} from 'angular2/platform/browser';
import {DOM} from "angular2/src/platform/dom/dom_adapter";

export function main() {

  interface IBackdropFixture {
    fixture:ComponentFixture;
    debug:DebugElement;
    backdrop:MdBackdrop;
  }

  @Component({selector: 'test-app'})
  @View({
    directives: [MdBackdrop],
    template: `<md-backdrop></md-backdrop>`
  })
  class TestComponent {
  }

  describe('Backdrop', () => {
    let builder: TestComponentBuilder;

    function setup(show: boolean = false, transitionAddClass: boolean = true): Promise<IBackdropFixture> {
      return new Promise<IBackdropFixture>((resolve, reject) => {
        TimerWrapper.setTimeout(() => {
          let result:IBackdropFixture = null;
          builder.createAsync(TestComponent)
        .then((fixture: ComponentFixture) => {
          let debug = fixture.debugElement.query(By.css('md-backdrop'));
          let backdrop = <MdBackdrop>debug.componentInstance;
              backdrop.transitionAddClass = transitionAddClass;
              fixture.detectChanges();
          result = {
            fixture: fixture,
            debug: debug,
            backdrop: backdrop
          };
          if (show) {
            return backdrop.show();
          }
        })
            .then(() => resolve(result))
            .catch((e) => reject(e));
        }, 10);
      });
    }


    beforeEachProviders(() => [
      MATERIAL_PROVIDERS,
      provide(UrlResolver, {useValue: new TestUrlResolver()}),
    ]);
    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    describe('md-backdrop', () => {

      describe('transitionClass', () => {
        it('should be added to classList when shown', inject([AsyncTestCompleter], (async) => {
          setup(true).then((api: IBackdropFixture) => {
            let el = api.debug.elementRef.nativeElement;
            expect(DOM.hasClass(el, api.backdrop.transitionClass)).toBe(true);
            async.done();
          });
        }));
        it('should be removed from classList when hidden', inject([AsyncTestCompleter], (async) => {
          setup(true).then((api: IBackdropFixture) => {
            let el = api.debug.elementRef.nativeElement;
            expect(DOM.hasClass(el, api.backdrop.transitionClass)).toBe(true);
            api.backdrop.hide().then(() => {
              expect(DOM.hasClass(el, api.backdrop.transitionClass)).toBe(false);
              async.done();
            });
          });
        }));
      });

      describe('transitionAddClass=false', () => {
        it('should remove transitionClass when shown', inject([AsyncTestCompleter], (async) => {
          setup(false, false).then((api: IBackdropFixture) => {
            let el = api.debug.elementRef.nativeElement;
            expect(DOM.hasClass(el, api.backdrop.transitionClass)).toBe(false);
            DOM.addClass(el, api.backdrop.transitionClass);
            api.backdrop.show().then(() => {
              expect(DOM.hasClass(el, api.backdrop.transitionClass)).toBe(false);
              async.done();
            });
          });
        }));
        it('should add transitionClass when hidden', inject([AsyncTestCompleter], (async) => {
          setup(true, false).then((api: IBackdropFixture) => {
            let el = api.debug.elementRef.nativeElement;
            expect(DOM.hasClass(el, api.backdrop.transitionClass)).toBe(false);
            api.backdrop.hide().then(() => {
              expect(DOM.hasClass(el, api.backdrop.transitionClass)).toBe(true);
              async.done();
            });
          });
        }));
      });

      describe('clickClose', () => {
        it('should be hidden by a click when true', inject([AsyncTestCompleter], (async) => {
          setup(true).then((api: IBackdropFixture) => {
            let triggered = false;
            api.backdrop.clickClose = true;
            api.backdrop.hide = () => {
              triggered = true;
              return Promise.resolve();
            };
            api.debug.nativeElement.click();
            expect(triggered).toBe(true);
            async.done();
          });
        }));
        it('should be hidden by a click when clickClose is true', inject([AsyncTestCompleter], (async) => {
          setup(true).then((api: IBackdropFixture) => {
            let triggered = false;
            api.backdrop.clickClose = false;
            api.backdrop.hide = () => {
              triggered = true;
              return Promise.resolve();
            };
            api.debug.nativeElement.click();
            expect(triggered).toBe(false);
            async.done();
          });
        }));
        it('should not be clickable during transition animation', inject([AsyncTestCompleter], (async) => {
          setup().then((api: IBackdropFixture) => {
            let triggered = false;
            api.backdrop.clickClose = true;
            api.backdrop.hide = () => {
              triggered = true;
              return Promise.resolve();
            };
            api.backdrop.show().then(() => {
              expect(triggered).toBe(false);
              api.debug.nativeElement.click();
              expect(triggered).toBe(true);
            });
            api.debug.nativeElement.click();
            expect(triggered).toBe(false);
            async.done();
          });
        }));
      });
      describe('show', () => {
        it('emit events before and after being shown', inject([AsyncTestCompleter], (async) => {
          setup().then((api: IBackdropFixture) => {
            let changes: string[] = [];
            expect(api.backdrop.visible).toBe(false);
            api.backdrop.onShowing.subscribe(() => changes.push('showing'));
            api.backdrop.onShown.subscribe(() => changes.push('shown'));
            api.backdrop.show().then(() => {
              TimerWrapper.setTimeout(()=> {
                expect(changes.length).toBe(2);
                expect(changes[0]).toBe('showing');
                expect(changes[1]).toBe('shown');
                async.done();
              }, 0);
            });
          });
        }));
        it('does not emit events events if already shown', inject([AsyncTestCompleter], (async) => {
          setup(true).then((api: IBackdropFixture) => {
            let changes: number = 0;
            api.backdrop.onShowing.subscribe(() => changes++);
            api.backdrop.onShown.subscribe(() => changes++);
            return api.backdrop.show().then(() => {
              TimerWrapper.setTimeout(()=> {
                expect(changes).toBe(0);
                async.done();
              }, 0);
            });
          });
        }));
      });

      describe('hide', () => {
        it('hide emits events before and after being hidden', inject([AsyncTestCompleter], (async) => {
          setup(true).then((api: IBackdropFixture) => {
            let changes: string[] = [];
            api.backdrop.onHiding.subscribe(() => changes.push('hiding'));
            api.backdrop.onHidden.subscribe(() => changes.push('hidden'));
            api.backdrop.hide()
              .then(() => {
                TimerWrapper.setTimeout(()=> {
                  expect(changes.length).toBe(2);
                  expect(changes[0]).toBe('hiding');
                  expect(changes[1]).toBe('hidden');
                  async.done();
                }, 0);
              });
          });
        }));
        it('does not emit events events if already hidden', inject([AsyncTestCompleter], (async) => {
          setup().then((api: IBackdropFixture) => {
            let changes: number = 0;
            expect(api.backdrop.visible).toBe(false);
            api.backdrop.onHiding.subscribe(() => changes++);
            api.backdrop.onHidden.subscribe(() => changes++);
            api.backdrop.hide().then(() => {
              TimerWrapper.setTimeout(()=> {
                expect(changes).toBe(0);
                async.done();
              }, 0);
            });
          });
        }));
      });
    });

  });


}

