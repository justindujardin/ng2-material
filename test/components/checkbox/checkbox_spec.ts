import {componentSanityCheck} from "../../util";
import {TestComponentBuilder, beforeEach, describe, expect, inject, it, async, ComponentFixture} from "angular2/testing";
import {Component, DebugElement} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {MdCheckbox} from "../../../ng2-material/components/checkbox/checkbox";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {KeyCodes} from "../../../ng2-material/core/key_codes";
import {By} from "angular2/platform/browser";


export function main() {

  interface ICheckboxFixture {
    fixture: ComponentFixture;
    comp: MdCheckbox;
    debug: DebugElement;
  }
  @Component({
    selector: 'test-app',
    directives: [CORE_DIRECTIVES, MdCheckbox],
    template: `<md-checkbox [(checked)]="isChecked" [disabled]="isDisabled"></md-checkbox>` 
  })
  class TestComponent {
    isChecked: boolean = false;
    isDisabled: boolean = false;
  }

  componentSanityCheck('Checkbox', 'md-checkbox', `<md-checkbox checked="true"></md-checkbox>`);

  describe('Checkbox', () => {
    let builder: TestComponentBuilder;

    function setup(checked: boolean = false, disabled: boolean = false): Promise<ICheckboxFixture> {
      return builder.createAsync(TestComponent).then((fixture: ComponentFixture) => {
        let debug = fixture.debugElement.query(By.css('md-checkbox'));
        let comp: MdCheckbox = debug.componentInstance;
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

    describe('md-checkbox', () => {
      it('should initialize unchecked', async(inject([], () => {
        return setup().then((api: ICheckboxFixture) => {
          expect(api.comp.checked).toBe(false);
          api.fixture.destroy();
        });
      })));
      it('should set checked from binding', async(inject([], () => {
        return setup(true).then((api: ICheckboxFixture) => {
          expect(api.comp.checked).toBe(true);
        });
      })));
      it('should toggle checked value when clicked on', async(inject([], () => {
        return setup(true).then((api: ICheckboxFixture) => {
          expect(api.comp.checked).toBe(true);
          api.debug.nativeElement.click();
          expect(api.comp.checked).toBe(false);
        });
      })));
      it('should not toggle checked value when disabled and clicked on', async(inject([], () => {
        return setup(true, true).then((api: ICheckboxFixture) => {
          expect(api.comp.checked).toBe(true);
          api.debug.nativeElement.click();
          expect(api.comp.checked).toBe(true);
          api.fixture.destroy();
        });
      })));
      describe('Keyboard', () => {
        it('should toggle when the space key is pressed', async(inject([], () => {
          return setup().then((api: ICheckboxFixture) => {
            expect(api.comp.checked).toBe(false);
            let event = DOM.createEvent('key');
            event.keyCode = KeyCodes.SPACE;
            api.debug.triggerEventHandler('keydown', event);
            expect(api.comp.checked).toBe(true);
          });
        })));
        it('should not toggle when any other key is pressed', async(inject([], () => {
          return setup().then((api: ICheckboxFixture) => {
            expect(api.comp.checked).toBe(false);
            let event = DOM.createEvent('key');
            event.keyCode = KeyCodes.DOWN;
            api.debug.triggerEventHandler('keydown', event);
            expect(api.comp.checked).toBe(false);
          });
        })));

      });
    });
  });


}

