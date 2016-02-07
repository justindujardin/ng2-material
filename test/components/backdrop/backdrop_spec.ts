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
import {Component, View, DebugElement, ElementRef} from "angular2/core";
import {MdBackdrop} from "../../../ng2-material/components/backdrop/backdrop";
import {By} from "angular2/platform/browser";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {promiseWait} from "../../util";

export function main() {

  interface IBackdropFixture {
    fixture: ComponentFixture;
    debug: DebugElement;
    backdrop: MdBackdrop;
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
      let result: IBackdropFixture = null;
      return promiseWait()
        .then(() => builder.createAsync(TestComponent))
        .then((fixture: ComponentFixture) => {
          let debug:DebugElement = fixture.debugElement.query(By.css('md-backdrop'));
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
        .then(() => result);
    }

    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    describe('md-backdrop', () => {

      describe('transitionClass', () => {
        it('should be added to classList when shown', injectAsync([], () => {
          return setup(true).then((api: IBackdropFixture) => {
            api.fixture.detectChanges();
            let el = api.debug.nativeElement;
            expect(DOM.hasClass(el, api.backdrop.transitionClass)).toBe(true);
          });
        }));
        it('should be removed from classList when hidden', injectAsync([], () => {
          return setup(true).then((api: IBackdropFixture) => {
            return promiseWait().then(() => {
              let el = api.debug.nativeElement;
              expect(DOM.hasClass(el, api.backdrop.transitionClass)).toBe(true);
              return api.backdrop
                .hide()
                .then(() => promiseWait())
                .then(() => {
                  expect(DOM.hasClass(el, api.backdrop.transitionClass)).toBe(false);
                });
            });
          });
        }));
      });

      describe('transitionAddClass=false', () => {
        it('should remove transitionClass when shown', injectAsync([], () => {
          return setup(false, false).then((api: IBackdropFixture) => {
            let el = api.debug.nativeElement;
            expect(DOM.hasClass(el, api.backdrop.transitionClass)).toBe(false);
            DOM.addClass(el, api.backdrop.transitionClass);
            return api.backdrop.show().then(() => {
              expect(DOM.hasClass(el, api.backdrop.transitionClass)).toBe(false);
            });
          });
        }));
        it('should add transitionClass when hidden', injectAsync([], () => {
          return setup(true, false).then((api: IBackdropFixture) => {
            let el = api.debug.nativeElement;
            expect(DOM.hasClass(el, api.backdrop.transitionClass)).toBe(false);
            return api.backdrop.hide().then(() => {
              expect(DOM.hasClass(el, api.backdrop.transitionClass)).toBe(true);
            });
          });
        }));
      });

      describe('clickClose', () => {
        it('should be hidden by a click when true', injectAsync([], () => {
          return setup(true).then((api: IBackdropFixture) => {
            let triggered = false;
            api.backdrop.clickClose = true;
            api.backdrop.hide = () => {
              triggered = true;
              return Promise.resolve();
            };
            api.debug.nativeElement.click();
            expect(triggered).toBe(true);
          });
        }));
        it('should not be hidden when clickClose is false', injectAsync([], () => {
          return setup(true).then((api: IBackdropFixture) => {
            let triggered = false;
            api.backdrop.clickClose = false;
            api.backdrop.hide = () => {
              triggered = true;
              return Promise.resolve();
            };
            api.debug.nativeElement.click();
            expect(triggered).toBe(false);
          });
        }));
        it('should not be clickable during transition animation', injectAsync([], () => {
          return setup().then((api: IBackdropFixture) => {
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
          });
        }));
      });
      describe('show', () => {
        it('emit events before and after being shown', injectAsync([], () => {
          return setup().then((api: IBackdropFixture) => {
            let changes: string[] = [];
            expect(api.backdrop.visible).toBe(false);
            api.backdrop.onShowing.subscribe(() => changes.push('showing'));
            api.backdrop.onShown.subscribe(() => changes.push('shown'));
            return api.backdrop
              .show()
              .then(() => promiseWait())
              .then(() => {
                expect(changes.length).toBe(2);
                expect(changes[0]).toBe('showing');
                expect(changes[1]).toBe('shown');
              });
          });
        }));
        it('does not emit events events if already shown', injectAsync([], () => {
          return setup(true).then((api: IBackdropFixture) => {
            let changes: number = 0;
            api.backdrop.onShowing.subscribe(() => changes++);
            api.backdrop.onShown.subscribe(() => changes++);
            return api.backdrop
              .show()
              .then(() => promiseWait())
              .then(() => {
                expect(changes).toBe(0);
              });
          });
        }));
      });

      describe('hide', () => {
        it('hide emits events before and after being hidden', injectAsync([], () => {
          return setup(true).then((api: IBackdropFixture) => {
            let changes: string[] = [];
            api.backdrop.onHiding.subscribe(() => changes.push('hiding'));
            api.backdrop.onHidden.subscribe(() => changes.push('hidden'));
            return api.backdrop
              .hide()
              .then(() => promiseWait())
              .then(() => {
                expect(changes.length).toBe(2);
                expect(changes[0]).toBe('hiding');
                expect(changes[1]).toBe('hidden');
              });
          });
        }));
        it('does not emit events events if already hidden', injectAsync([], () => {
          return setup().then((api: IBackdropFixture) => {
            let changes: number = 0;
            expect(api.backdrop.visible).toBe(false);
            api.backdrop.onHiding.subscribe(() => changes++);
            api.backdrop.onHidden.subscribe(() => changes++);
            return api.backdrop
              .hide()
              .then(() => promiseWait())
              .then(() => {
                expect(changes).toBe(0);
              });
          });
        }));
      });
    });

  });


}

