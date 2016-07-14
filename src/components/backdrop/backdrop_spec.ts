import {inject, async} from "@angular/core/testing";
import {ComponentFixture, TestComponentBuilder} from "@angular/core/testing";
import {Component, DebugElement} from "@angular/core";
import {MdBackdrop} from "../../index";
import {By} from "@angular/platform-browser";
import {promiseWait} from "../../platform/testing/util";

export function main() {

  interface IBackdropFixture {
    fixture: ComponentFixture<TestComponent>;
    debug: DebugElement;
    backdrop: MdBackdrop;
  }

  @Component({
    selector: 'test-app',
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
        .then((fixture: ComponentFixture<TestComponent>) => {
          let debug: DebugElement = fixture.debugElement.query(By.css('md-backdrop'));
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
        .then(() => result)
        .catch(error => console.error.bind(console));
    }

    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    describe('md-backdrop', () => {

      describe('transitionClass', () => {
        it('should be added to classList when shown', async(() => {
          return setup(true).then((api: IBackdropFixture) => {
            return promiseWait().then(() => {
              api.fixture.detectChanges();
              let el = api.debug.nativeElement;
              expect(el.classList.contains(api.backdrop.transitionClass)).toBe(true);
            });
          });
        }));

        it('should be removed from classList when hidden', async(() => {
          return setup(true).then((api: IBackdropFixture) => {
            return promiseWait().then(() => {
              let el = api.debug.nativeElement;
              expect(el.classList.contains(api.backdrop.transitionClass)).toBe(true);
              return api.backdrop
                .hide()
                .then(() => promiseWait())
                .then(() => {
                  expect(el.classList.contains(api.backdrop.transitionClass)).toBe(false);
                });
            });
          });
        }));
      });

      describe('transitionAddClass=false', () => {
        it('should remove transitionClass when shown', async(() => {
          return setup(false, false).then((api: IBackdropFixture) => {
            let el = api.debug.nativeElement;
            expect(el.classList.contains(api.backdrop.transitionClass)).toBe(false);
            el.classList.contains(api.backdrop.transitionClass);
            return api.backdrop.show().then(() => {
              expect(el.classList.contains(api.backdrop.transitionClass)).toBe(false);
            });
          });
        }));

        it('should add transitionClass when hidden', async(() => {
          return setup(true, false).then((api: IBackdropFixture) => {
            let el = api.debug.nativeElement;
            expect(el.classList.contains(api.backdrop.transitionClass)).toBe(false);
            return api.backdrop.hide().then(() => {
              expect(el.classList.contains(api.backdrop.transitionClass)).toBe(true);
            });
          });
        }));
      });

      describe('clickClose', () => {
        it('should be hidden by a click when true', async(() => {
          return setup(true).then((api: IBackdropFixture) => {
            let triggered = false;
            api.backdrop.clickClose = true;
            api.backdrop.hide = () => {
              triggered = true;
              return Promise.resolve();
            };
            api.debug.nativeElement.click();
            expect(triggered).toBe(true);
          })
            .catch(error => console.error.bind(console));
        }));

        it('should not be hidden when clickClose is false', async(() => {
          return setup(true).then((api: IBackdropFixture) => {
            let triggered = false;
            api.backdrop.clickClose = false;
            api.backdrop.hide = () => {
              triggered = true;
              return Promise.resolve();
            };
            api.debug.nativeElement.click();
            expect(triggered).toBe(false);
          })
            .catch(error => console.error.bind(console));
        }));

        it('should not be clickable during transition animation', async(() => {
          return setup().then((api: IBackdropFixture) => {
            let triggered = false;
            api.backdrop.clickClose = true;
            api.backdrop.hide = () => {
              triggered = true;
              return Promise.resolve();
            };
            let promise = api.backdrop.show();
            api.debug.nativeElement.click();
              expect(triggered).toBe(false);
            return promise.then(() => {
              expect(triggered).toBe(false);
              api.debug.nativeElement.click();
              expect(triggered).toBe(true);
            });
          })
            .catch(error => console.error.bind(console));
        }));
      });

      describe('show', () => {
        it('emit events before and after being shown', () => {
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
        });

        it('does not emit events events if already shown', async(() => {
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
          })
            .catch(error => console.error.bind(console));
        }));
      });

      describe('hide', () => {
        it('hide emits events before and after being hidden', async(() => {
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
          })
            .catch(error => console.error.bind(console));
        }));

        it('does not emit events events if already hidden', async(() => {
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
          })
            .catch(error => console.error.bind(console));
        }));
      });
    });

  });


}

