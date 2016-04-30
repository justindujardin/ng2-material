import {
  TestComponentBuilder,
  beforeEach,
  describe,
  expect,
  inject,
  it,
  async,
  ComponentFixture
} from "angular2/testing";
import {Component, DebugElement, ElementRef} from "angular2/core";
import {MdDialogRef, MdDialogConfig, MdDialog, MdDialogBasic} from "../../../ng2-material/components/dialog/dialog";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {By} from "angular2/platform/browser";

export function main() {

  interface IDialogFixture {
    fixture: ComponentFixture;
    debug: DebugElement;
    elementRef: ElementRef;
  }

  @Component({
    selector: 'test-app',
    directives: [MdDialogBasic],
    template: `<div></div>`
  })
  class TestComponent {
  }

  describe('Dialog', () => {
    let builder: TestComponentBuilder;
    let dialog: MdDialog;

    function setup(): Promise<IDialogFixture> {
      return new Promise<IDialogFixture>((resolve) => {
        builder.createAsync(TestComponent)
          .then((fixture: ComponentFixture) => {
            fixture.detectChanges();
            let debug = fixture.debugElement.query(By.css('div'));
            return resolve({
              elementRef: fixture.elementRef,
              fixture: fixture,
              debug: debug
            });
          })
          .catch(console.error.bind(console));
      });
    }

    beforeEach(inject([TestComponentBuilder, MdDialog], (tcb, mdDialog) => {
      builder = tcb;
      dialog = mdDialog;
    }));

    describe('MdDialog', () => {
      describe('open', () => {
        it('should resolve with a reference to the dialog component instance', async(() => {
          setup().then((api: IDialogFixture) => {
            let config = new MdDialogConfig();
            return dialog.open(MdDialogBasic, api.elementRef, config)
              .then((ref: MdDialogRef) => {
                expect(ref.instance).toBeAnInstanceOf(MdDialogBasic);
                return ref.close();
              });
          });
        }));
        it('should initialize default config if not specified', async(inject([], () => {
          setup().then((api: IDialogFixture) => {
            return dialog.open(MdDialogBasic, api.elementRef)
              .then((ref: MdDialogRef) => ref.close());
          });
        })));
      });
      describe('close', () => {
        it('should return a promise that resolves once the dialog is closed', async(inject([], () => {
          setup().then((api: IDialogFixture) => {
            return dialog.open(MdDialogBasic, api.elementRef)
              .then((ref: MdDialogRef) => ref.close());
          });
        })));
        it('should accept a value to resolve whenClosed with', async(inject([], () => {
          setup().then((api: IDialogFixture) => {
            return dialog.open(MdDialogBasic, api.elementRef)
              .then((ref: MdDialogRef) => {
                ref.whenClosed.then((result) => {
                  expect(result).toBe(1337);
                });
                return ref.close(1337);
              });
          });
        })));
      });
    });

    describe('MdDialogBasic', () => {
      it('should open and close with promises', async(inject([], () => {
        setup().then((api: IDialogFixture) => {
          let config = new MdDialogConfig();
          return dialog
            .open(MdDialogBasic, api.elementRef, config)
            .then((ref: MdDialogRef) => ref.close());
        });
      })));
    });
    describe('MdDialogConfig', () => {
      it('can set parent container', async(inject([], () => {
        setup().then(() => {
          let config = new MdDialogConfig().parent(DOM.query('body'));
          expect(config.container).toBeAnInstanceOf(HTMLElement);
          expect(config.container.tagName.toLowerCase()).toBe('body');
        });
      })));
      it('can set targetEvent to specify dialog origin point', async(inject([], () => {
        setup().then(() => {
          let ev = DOM.createMouseEvent('click');
          let config = new MdDialogConfig().targetEvent(ev);
          expect(config.sourceEvent).toBe(ev);
        });
      })));
      it('should bind content options to component instance', async(inject([], () => {
        setup().then((api: IDialogFixture) => {
          let config = new MdDialogConfig()
            .textContent('Content')
            .title('Title')
            .ariaLabel('Aria')
            .ok('Ok')
            .cancel('Cancel')
            .clickOutsideToClose(false);
          return dialog.open(MdDialogBasic, api.elementRef, config)
            .then((ref: MdDialogRef) => {
              let instance: any = ref.instance;
              expect(instance.textContent).toBe('Content');
              expect(instance.title).toBe('Title');
              expect(instance.ariaLabel).toBe('Aria');
              expect(instance.ok).toBe('Ok');
              expect(instance.cancel).toBe('Cancel');
            });
        });
      })));
    });

  });


}

