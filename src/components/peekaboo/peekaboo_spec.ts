import {inject} from "@angular/core/testing";
import {ComponentFixture, TestComponentBuilder} from "@angular/core/testing";
import {Component, DebugElement} from "@angular/core";
import {MdPeekaboo} from "../../index";
import {By} from "@angular/platform-browser";

export function main() {

  interface IPeekabooFixture {
    fixture: ComponentFixture<TestComponent>;
    peek: MdPeekaboo;
    debug: DebugElement;
  }

  @Component({
    selector: 'test-app',
    directives: [MdPeekaboo],
    template: `<div md-peekaboo></div>`
  })
  class TestComponent {
    hideBinding: string = 'hide';
    showBinding: string = 'show';
    sizeBinding: number = 50;
  }

  describe('Peekaboo', () => {
    let builder: TestComponentBuilder;

    function setup(template: string = null): Promise<IPeekabooFixture> {
      let prep = template === null ?
        builder.createAsync(TestComponent) :
        builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
      return prep.then((fixture: ComponentFixture<TestComponent>) => {
        fixture.detectChanges();
        let debug = fixture.debugElement.query(By.directive(MdPeekaboo));
        let component = debug.injector.get(MdPeekaboo) as MdPeekaboo;
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
      it('should be inactive by default', () => {
        return setup().then((api: IPeekabooFixture) => {
          expect(api.peek.active).toBe(false);
          api.fixture.destroy();
        });
      });

      describe('breakAction', () => {
        it('should be undefined by default', () => {
          return setup().then((api: IPeekabooFixture) => {
            expect(api.peek.breakAction).toBeUndefined();
          });
        });

        it('should be set by attribute', () => {
          return setup(`<div md-peekaboo breakAction="show"></div>`).then((api: IPeekabooFixture) => {
            expect(api.peek.breakAction).toBe('show');
          });
        });

        it('should be set by binding', () => {
          return setup(`<div md-peekaboo [breakAction]="hideBinding"></div>`).then((api: IPeekabooFixture) => {
            expect(api.peek.breakAction).toBe('hide');
          });
        });
      });

      ['breakXs', 'breakSm', 'breakMd', 'breakLg', 'breakXl'].forEach((size: string) => {
        describe(size, () => {
          it('should be -1 by default', () => {
            return setup().then((api: IPeekabooFixture) => {
              expect(api.peek[size]).toBe(-1);
            });
          });

          it('should be set by attribute', () => {
            return setup(`<div md-peekaboo ${size}="25"></div>`).then((api: IPeekabooFixture) => {
              expect(api.peek[size]).toBe(25);
            });
          });

          it('should be set by binding', () => {
            return setup(`<div md-peekaboo [${size}]="sizeBinding"></div>`).then((api: IPeekabooFixture) => {
              expect(api.peek[size]).toBe(50);
            });
          });

          it('should work with all breakpoint sizes', () => {
            return setup(`<div md-peekaboo [${size}]="sizeBinding"></div>`).then((api: IPeekabooFixture) => {
              MdPeekaboo.SIZES.forEach((s: string) => {
                api.peek.breakpoint = s;
              });
            });
          });
        });

      });
    });
  });
}

