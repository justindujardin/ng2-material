import {inject} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {ComponentFixture, TestComponentBuilder} from "@angular/core/testing";
import {Component, DebugElement} from "@angular/core";
import {MdSwitch} from "./switch";
import {componentSanityCheck} from "../../platform/testing/util";
import {KeyCodes} from "../../core/key_codes";

let createEvent = (): KeyboardEvent => {
  var event = document.createEvent('Event');
  event.initEvent('key', true, true);
  return event as KeyboardEvent;
};

export function main() {

  interface ICheckboxFixture {
    fixture: ComponentFixture<TestComponent>;
    comp: MdSwitch;
    debug: DebugElement;
  }
  @Component({
    selector: 'test-app',
    directives: [MdSwitch],
    template: `<md-switch [(checked)]="isChecked" [disabled]="isDisabled" [tabindex]="tabIndex"></md-switch>`
  })
  class TestComponent {
    isChecked: boolean = false;
    isDisabled: boolean = false;
    tabIndex = "1";
  }

  componentSanityCheck('Switch', 'md-switch', `<md-switch checked="true"></md-switch>`);

  describe('Switch', () => {
    let builder: TestComponentBuilder;

    function setup(checked: boolean = false, disabled: boolean = false): Promise<ICheckboxFixture> {
      return builder.createAsync(TestComponent).then((fixture: ComponentFixture<TestComponent>) => {
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
      it('should initialize unchecked', () => {
        return setup().then((api: ICheckboxFixture) => {
          expect(api.comp.checked).toBe(false);
          api.fixture.destroy();
        });
      });

      it('should set checked from binding', () => {
        return setup(true).then((api: ICheckboxFixture) => {
          expect(api.comp.checked).toBe(true);
        });
      });

      it('should toggle checked value when clicked on', () => {
        return setup(true).then((api: ICheckboxFixture) => {
          expect(api.comp.checked).toBe(true);
          api.debug.nativeElement.click();
          expect(api.comp.checked).toBe(false);
        });
      });

      it('should not toggle checked value when disabled and clicked on', () => {
        return setup(true, true).then((api: ICheckboxFixture) => {
          expect(api.comp.checked).toBe(true);
          api.debug.nativeElement.click();
          expect(api.comp.checked).toBe(true);
          api.fixture.destroy();
        });
      });

      describe('Keyboard', () => {
        it('should toggle when the space key is pressed', () => {
          return setup().then((api: ICheckboxFixture) => {
            expect(api.comp.checked).toBe(false);
            let event = createEvent();
            event.keyCode = KeyCodes.SPACE;
            api.debug.triggerEventHandler('keydown', event);
            expect(api.comp.checked).toBe(true);
          });
        });

        it('should not toggle when any other key is pressed', () => {
          return setup().then((api: ICheckboxFixture) => {
            expect(api.comp.checked).toBe(false);
            let event = createEvent();
            event.keyCode = KeyCodes.DOWN;
            api.debug.triggerEventHandler('keydown', event);
            expect(api.comp.checked).toBe(false);
          });
        });

      });
    });
  });


}
