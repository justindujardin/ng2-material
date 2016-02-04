import {componentSanityCheck} from "../../util";
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
import {Component, View, provide, DebugElement} from 'angular2/core';
import {UrlResolver} from 'angular2/compiler';
import {TestUrlResolver} from '../../test_url_resolver';
import {MATERIAL_PROVIDERS} from '../../../ng2-material/all';
import {ComponentFixture} from "angular2/testing";
import {CORE_DIRECTIVES} from "angular2/common";
import {MdCheckbox} from "ng2-material/components/checkbox/checkbox";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {KeyCodes} from "../../../ng2-material/core/key_codes";
import {By} from 'angular2/platform/browser';


export function main() {

  interface ICheckboxFixture {
    fixture:ComponentFixture;
    comp:MdCheckbox;
    debug:DebugElement;
  }
  @Component({selector: 'test-app'})
  @View({
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

    beforeEachProviders(() => [
      MATERIAL_PROVIDERS,
      provide(UrlResolver, {useValue: new TestUrlResolver()}),
    ]);
    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    describe('md-checkbox', () => {
      it('should initialize unchecked', inject([AsyncTestCompleter], (async) => {
        setup().then((api: ICheckboxFixture) => {
          expect(api.comp.checked).toBe(false);
          api.fixture.destroy();
          async.done();
        });
      }));
      it('should set checked from binding', inject([AsyncTestCompleter], (async) => {
        setup(true).then((api: ICheckboxFixture) => {
          expect(api.comp.checked).toBe(true);
          async.done();
        });
      }));
      it('should toggle checked value when clicked on', inject([AsyncTestCompleter], (async) => {
        setup(true).then((api: ICheckboxFixture) => {
          expect(api.comp.checked).toBe(true);
          api.debug.nativeElement.click();
          expect(api.comp.checked).toBe(false);
          async.done();
        });
      }));
      it('should not toggle checked value when disabled and clicked on', inject([AsyncTestCompleter], (async) => {
        setup(true, true).then((api: ICheckboxFixture) => {
          expect(api.comp.checked).toBe(true);
          api.debug.nativeElement.click();
          expect(api.comp.checked).toBe(true);
          api.fixture.destroy();
          async.done();
        });
      }));
      describe('Keyboard', () => {
        it('should toggle when the space key is pressed', inject([AsyncTestCompleter], (async) => {
          setup().then((api: ICheckboxFixture) => {
            expect(api.comp.checked).toBe(false);
            let event = DOM.createEvent('key');
            event.keyCode = KeyCodes.SPACE;
            api.debug.triggerEventHandler('keydown', event);
            expect(api.comp.checked).toBe(true);
            async.done();
          });
        }));
        it('should not toggle when any other key is pressed', inject([AsyncTestCompleter], (async) => {
          setup().then((api: ICheckboxFixture) => {
            expect(api.comp.checked).toBe(false);
            let event = DOM.createEvent('key');
            event.keyCode = KeyCodes.DOWN;
            api.debug.triggerEventHandler('keydown', event);
            expect(api.comp.checked).toBe(false);
            async.done();
          });
        }));

      });
    });
  });


}

