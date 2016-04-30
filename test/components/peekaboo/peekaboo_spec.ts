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
import {Component, DebugElement} from "angular2/core";
import {MdPeekaboo, PeekabooAction} from "../../../ng2-material/components/peekaboo/peekaboo";
import {By} from "angular2/platform/browser";

export function main() {

  interface IPeekabooFixture {
    fixture: ComponentFixture;
    peek: MdPeekaboo;
    debug: DebugElement;
  }

  @Component({
    selector: 'test-app',
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

    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    describe('[md-peekaboo]', () => {
      it('should be inactive by default', async(inject([], () => {
        return setup().then((api: IPeekabooFixture) => {
          expect(api.peek.active).toBe(false);
          api.fixture.destroy();
        });
      })));
      describe('breakAction', () => {
        it('should be undefined by default', async(inject([], () => {
          return setup().then((api: IPeekabooFixture) => {
            expect(api.peek.breakAction).toBeUndefined();
          });
        })));
        it('should be set by attribute', async(inject([], () => {
          return setup(`<div md-peekaboo breakAction="show"></div>`).then((api: IPeekabooFixture) => {
            expect(api.peek.breakAction).toBe(PeekabooAction.SHOW);
          });
        })));
        it('should be set by binding', async(inject([], () => {
          return setup(`<div md-peekaboo [breakAction]="hideBinding"></div>`).then((api: IPeekabooFixture) => {
            expect(api.peek.breakAction).toBe(PeekabooAction.HIDE);
          });
        })));
      });

      ['breakXs', 'breakSm', 'breakMd', 'breakLg', 'breakXl'].forEach((size: string) => {
        describe(size, () => {
          it('should be -1 by default', async(inject([], () => {
            return setup().then((api: IPeekabooFixture) => {
              expect(api.peek[size]).toBe(-1);
            });
          })));
          it('should be set by attribute', async(inject([], () => {
            return setup(`<div md-peekaboo ${size}="25"></div>`).then((api: IPeekabooFixture) => {
              expect(api.peek[size]).toBe(25);
            });
          })));
          it('should be set by binding', async(inject([], () => {
            return setup(`<div md-peekaboo [${size}]="sizeBinding"></div>`).then((api: IPeekabooFixture) => {
              expect(api.peek[size]).toBe(50);
            });
          })));
          it('should work with all breakpoint sizes', async(inject([], () => {
            return setup(`<div md-peekaboo [${size}]="sizeBinding"></div>`).then((api: IPeekabooFixture) => {
              MdPeekaboo.SIZES.forEach((s: string) => {
                api.peek.breakpoint = s;
              });
            });
          })));
        });

      });
    });
  });
}

