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
import {Component, DebugElement} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {DOM} from "angular2/src/platform/dom/dom_adapter";

import {By} from "angular2/platform/browser";
import {MdSwitch} from "./switch";
import {componentSanityCheck} from "../../platform/testing/util";
import {KeyCodes} from "../../core/key_codes";


export function main() {

  interface ICheckboxFixture {
    fixture: ComponentFixture;
    comp: MdSwitch;
    debug: DebugElement;
  }
  @Component({
    selector: 'test-app',
    directives: [CORE_DIRECTIVES, MdSwitch],
    template: `<md-switch [(checked)]="isChecked" [disabled]="isDisabled"></md-switch>`
  })
  class TestComponent {
    isChecked: boolean = false;
    isDisabled: boolean = false;
  }

  componentSanityCheck('Switch', 'md-switch', `<md-switch checked="true"></md-switch>`);

  describe('Switch', () => {
    let builder: TestComponentBuilder;

    function setup(checked: boolean = false, disabled: boolean = false): Promise<ICheckboxFixture> {
      return builder.createAsync(TestComponent).then((fixture: ComponentFixture) => {
        let debug = fixture.debugElement.query(By.css('md-switch'));
        let comp: MdSwitch = debug.componentInstance;
        let testComp = fixture.debugElement.componentInstance;
        testComp.isDisabled = disabled;
        testComp.isChecked = checked;
        fixture.detectChanges();
        return {
          fixture: fixture,
          comp: comp,
          debug: debug
        };
      }).catch(console.error.bind(console));
    }

    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    describe('md-switch', () => {
      it('should initialize unchecked', injectAsync([], () => {
        return setup().then((api: ICheckboxFixture) => {
          expect(api.comp.checked).toBe(false);
          api.fixture.destroy();
        });
      }));
      it('should set checked from binding', injectAsync([], () => {
        return setup(true).then((api: ICheckboxFixture) => {
          expect(api.comp.checked).toBe(true);
        });
      }));
      it('should toggle checked value when clicked on', injectAsync([], () => {
        return setup(true).then((api: ICheckboxFixture) => {
          expect(api.comp.checked).toBe(true);
          api.debug.nativeElement.click();
          expect(api.comp.checked).toBe(false);
        });
      }));
      it('should not toggle checked value when disabled and clicked on', injectAsync([], () => {
        return setup(true, true).then((api: ICheckboxFixture) => {
          expect(api.comp.checked).toBe(true);
          api.debug.nativeElement.click();
          expect(api.comp.checked).toBe(true);
          api.fixture.destroy();
        });
      }));
      describe('Keyboard', () => {
        it('should toggle when the space key is pressed', injectAsync([], () => {
          return setup().then((api: ICheckboxFixture) => {
            expect(api.comp.checked).toBe(false);
            let event = DOM.createEvent('key');
            event.keyCode = KeyCodes.SPACE;
            api.debug.triggerEventHandler('keydown', event);
            expect(api.comp.checked).toBe(true);
          });
        }));
        it('should not toggle when any other key is pressed', injectAsync([], () => {
          return setup().then((api: ICheckboxFixture) => {
            expect(api.comp.checked).toBe(false);
            let event = DOM.createEvent('key');
            event.keyCode = KeyCodes.DOWN;
            api.debug.triggerEventHandler('keydown', event);
            expect(api.comp.checked).toBe(false);
          });
        }));

      });
    });
  });


}
