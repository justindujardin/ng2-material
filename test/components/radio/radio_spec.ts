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
import {MdRadioGroup, MdRadioButton} from '../../../ng2-material/components/radio/radio_button';
import {MATERIAL_PROVIDERS} from '../../../ng2-material/all';
import {ComponentFixture} from "angular2/testing";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {KeyCodes} from "../../../ng2-material/core/key_codes";
import {By} from 'angular2/platform/browser';


// TODO(jd): This needs a better fixture.  There are a TON of debug queries inline.

export function main() {

  let sendKey = (to: DebugElement, keyCode: number) => {
    let event = DOM.createEvent('key');
    event.keyCode = keyCode;
    to.triggerEventHandler('keydown', event);
  }


  @Component({selector: 'test-app'})
  @View({
    directives: [MdRadioGroup, MdRadioButton],
    template: `
    <md-radio-group (click)="onClick($event)" [(value)]="selected">
      <md-radio-button value="Apple" class="md-primary">Apple</md-radio-button>
      <md-radio-button value="Banana" checked="true"> Banana</md-radio-button>
    </md-radio-group>`
  })
  class TestComponent {
    selected: string = 'Banana';
    clicks: number = 0;

    onClick() {
      this.clicks++;
    }
  }

  describe('Radios', () => {
    let builder: TestComponentBuilder;

    function setup(template: string = null, typeFn: any = TestComponent): Promise<ComponentFixture> {
      return template ?
        builder.overrideTemplate(typeFn, template).createAsync(typeFn) :
        builder.createAsync(typeFn);
    }

    beforeEachProviders(() => [
      MATERIAL_PROVIDERS,
      provide(UrlResolver, {useValue: new TestUrlResolver()}),
    ]);
    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    describe('md-radio-group', () => {
      it('should set value from initial binding', inject([AsyncTestCompleter], (async) => {
        builder.createAsync(TestComponent).then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          let radioGroup = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;
          expect(radioGroup.value).toBe('Banana');
          fixture.destroy();
          async.done();
        });
      }));
      it('should only have one selected child at a time', inject([AsyncTestCompleter], (async) => {
        let template = `
            <md-radio-group>
              <md-radio-button id="rdo1" value="Apple"></md-radio-button>
              <md-radio-button id="rdo2" value="Banana"></md-radio-button>
            </md-radio-group>`;
        setup(template).then((fixture: ComponentFixture) => {
          let radio = fixture.debugElement.query(By.css('#rdo1'));
          let radio2 = fixture.debugElement.query(By.css('#rdo2'));
          let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;
          expect(group.value).toBeFalsy();

          radio.nativeElement.click();
          expect(radio.componentInstance.checked).toBe(true);
          expect(radio2.componentInstance.checked).toBe(false);
          expect(group.value).toBe('Apple');

          radio2.nativeElement.click();
          expect(radio2.componentInstance.checked).toBe(true);
          expect(radio.componentInstance.checked).toBe(false);
          expect(group.value).toBe('Banana');
          async.done();
        });
      }));
      it('should select a child by value when value is initially set on group', inject([AsyncTestCompleter], (async) => {
        let template = `
            <md-radio-group [value]="selected">
              <md-radio-button id="rdo1" value="Apple"></md-radio-button>
              <md-radio-button id="rdo2" value="Banana"></md-radio-button>
            </md-radio-group>`;
        setup(template).then((fixture: ComponentFixture) => {
          let radio = fixture.debugElement.query(By.css('#rdo1'));
          let radio2 = fixture.debugElement.query(By.css('#rdo2'));
          let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;
          fixture.detectChanges();
          expect(group.value).toBe('Banana');
          expect(radio2.componentInstance.checked).toBe(true);
          async.done();
        });
      }));

      it('should select a child by value when value is set on group', inject([AsyncTestCompleter], (async) => {
        let template = `
            <md-radio-group>
              <md-radio-button id="rdo1" value="Apple"></md-radio-button>
              <md-radio-button id="rdo2" value="Banana"></md-radio-button>
            </md-radio-group>`;
        setup(template).then((fixture: ComponentFixture) => {
          let radio = fixture.debugElement.query(By.css('#rdo1'));
          let radio2 = fixture.debugElement.query(By.css('#rdo2'));
          let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;
          expect(group.value).toBeFalsy();
          expect(radio.componentInstance.checked).toBe(false);
          group.value = "Apple";
          fixture.detectChanges();
          expect(radio.componentInstance.checked).toBe(true);
          expect(group.value).toBe('Apple');
          async.done();
        });
      }));
      it('should accept value even if no matching child is found', inject([AsyncTestCompleter], (async) => {
        let template = `<md-radio-group></md-radio-group>`;
        setup(template).then((fixture: ComponentFixture) => {
          let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;
          expect(group.value).toBeFalsy();
          group.value = "Apple";
          fixture.detectChanges();
          expect(group.value).toBe('Apple');
          async.done();
        });
      }));
      it('should disable child radio buttons when disabled', inject([AsyncTestCompleter], (async) => {
        var template = `
            <md-radio-group disabled>
              <md-radio-button>Apple</md-radio-button>
            </md-radio-group>`;
        setup(template).then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;
          expect(group.disabled).toBe(true);

          let radio = <MdRadioButton>fixture.debugElement.query(By.css('md-radio-button')).componentInstance;
          expect(radio.disabled).toBe(true);
          async.done();
        });
      }));
      it('should initialize value from checked child radio', inject([AsyncTestCompleter], (async) => {
        let template = `
            <md-radio-group>
              <md-radio-button checked value="Apple"></md-radio-button>
              <md-radio-button value="Banana"></md-radio-button>
            </md-radio-group>`;
        setup(template).then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;
          expect(group.value).toBe('Apple');
          async.done();
        });
      }));


      describe('Keyboard', () => {
        let template = `
          <md-radio-group>
            <md-radio-button value="Apple"></md-radio-button>
            <md-radio-button checked="true" value="Banana"></md-radio-button>
            <md-radio-button disabled value="Orange"></md-radio-button>
            <md-radio-button value="Mango"></md-radio-button>
          </md-radio-group>`;

        it('should step to the previous radio when the up arrow key is pressed', inject([AsyncTestCompleter], (async) => {
          setup(template).then((fixture: ComponentFixture) => {
            fixture.detectChanges();

            let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;

            expect(group.value).toBe('Banana');
            sendKey(fixture.debugElement.componentViewChildren[0], KeyCodes.UP);
            expect(group.value).toBe('Apple');

            fixture.destroy();
            async.done();
          });
        }));
        it('should not step beyond the first radio when up key is pressed', inject([AsyncTestCompleter], (async) => {
          setup(template).then((fixture: ComponentFixture) => {
            fixture.detectChanges();

            let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;

            expect(group.value).toBe('Banana');
            sendKey(fixture.debugElement.componentViewChildren[0], KeyCodes.UP);
            expect(group.value).toBe('Apple');
            sendKey(fixture.debugElement.componentViewChildren[0], KeyCodes.UP);
            expect(group.value).toBe('Apple');

            fixture.destroy();
            async.done();
          });
        }));
        it('should step to the next radio when the down arrow key is pressed', inject([AsyncTestCompleter], (async) => {
          setup(template).then((fixture: ComponentFixture) => {
            fixture.detectChanges();

            let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;

            expect(group.value).toBe('Banana');
            sendKey(fixture.debugElement.componentViewChildren[0], KeyCodes.DOWN);
            expect(group.value).toBe('Mango');

            fixture.destroy();
            async.done();
          });
        }));
        it('should not step beyond the last radio when down key is pressed', inject([AsyncTestCompleter], (async) => {
          setup(template).then((fixture: ComponentFixture) => {
            fixture.detectChanges();

            let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;

            expect(group.value).toBe('Banana');
            sendKey(fixture.debugElement.componentViewChildren[0], KeyCodes.DOWN);
            expect(group.value).toBe('Mango');
            sendKey(fixture.debugElement.componentViewChildren[0], KeyCodes.DOWN);
            expect(group.value).toBe('Mango');

            fixture.destroy();
            async.done();
          });
        }));

        it('should not step forward or back when radio group is disabled', inject([AsyncTestCompleter], (async) => {
          setup(template).then((fixture: ComponentFixture) => {
            fixture.detectChanges();

            let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;
            group.disabled = true;

            expect(group.value).toBe('Banana');
            sendKey(fixture.debugElement.componentViewChildren[0], KeyCodes.UP);
            expect(group.value).toBe('Banana');
            sendKey(fixture.debugElement.componentViewChildren[0], KeyCodes.DOWN);
            expect(group.value).toBe('Banana');

            fixture.destroy();
            async.done();
          });
        }));


        it('should skip over disabled radios when up/down keys are pressed', inject([AsyncTestCompleter], (async) => {
          setup(template).then((fixture: ComponentFixture) => {
            fixture.detectChanges();

            let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;

            expect(group.value).toBe('Banana');
            sendKey(fixture.debugElement.componentViewChildren[0], KeyCodes.DOWN);
            expect(group.value).toBe('Mango');
            sendKey(fixture.debugElement.componentViewChildren[0], KeyCodes.UP);
            expect(group.value).toBe('Banana');

            fixture.destroy();
            async.done();
          });
        }));


      });
    });

    describe('md-radio-button', () => {
      it('should not be selectable when disabled', inject([AsyncTestCompleter], (async) => {
        let template = `
            <md-radio-group>
              <md-radio-button disabled value="Apple">Apple</md-radio-button>
            </md-radio-group>`;
        setup(template).then((fixture: ComponentFixture) => {
          let radio = fixture.debugElement.query(By.css('md-radio-button'));
          let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;
          expect(group.getSelectedRadioIndex()).toBe(-1);
          fixture.detectChanges();
          radio.nativeElement.click();
          fixture.detectChanges();
          expect(group.getSelectedRadioIndex()).toBe(-1);
          async.done();
        });
      }));

      it('should update parent group value when when selected', inject([AsyncTestCompleter], (async) => {
        let template = `
            <md-radio-group>
              <md-radio-button value="Apple">Apple</md-radio-button>
            </md-radio-group>`;
        setup(template).then((fixture: ComponentFixture) => {
          let radio = fixture.debugElement.query(By.css('md-radio-button'));
          let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;
          expect(group.value).toBeFalsy();
          radio.nativeElement.click();
          expect(group.value).toBe('Apple');
          async.done();
        });
      }));

      it('should default tabindex to 0 when used outside of a md-radio-group', inject([AsyncTestCompleter], (async) => {
        let template = `<md-radio-button></md-radio-button>`;
        setup(template).then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          let radio: MdRadioButton = fixture.debugElement.query(By.css('md-radio-button')).componentInstance;
          expect(radio.tabindex).toBe(0);
          fixture.destroy();
          async.done();
        });
      }));
      it('should set tabindex by attribute when used outside of a md-radio-group', inject([AsyncTestCompleter], (async) => {
        let template = `<md-radio-button tabindex="17"></md-radio-button>`;
        setup(template).then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          let radio: MdRadioButton = fixture.debugElement.query(By.css('md-radio-button')).componentInstance;
          expect(radio.tabindex).toBe(17);
          fixture.destroy();
          async.done();
        });
      }));

      it('should be checkable without a md-radio-group', inject([AsyncTestCompleter], (async) => {
        let template = `<md-radio-button value="Apple">Apple</md-radio-button>`;
        setup(template).then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          let debug = fixture.debugElement.query(By.css('md-radio-button'));
          let radio: MdRadioButton = debug.componentInstance;
          expect(radio.checked).toBe(false);
          debug.nativeElement.click();
          expect(radio.checked).toBe(true);
          fixture.destroy();
          async.done();
        });
      }));

      describe('Keyboard', () => {
        it('should check the focused radio when the space key is pressed', inject([AsyncTestCompleter], (async) => {
          let template = `<md-radio-button></md-radio-button>`;
          setup(template).then((fixture: ComponentFixture) => {
            fixture.detectChanges();

            let debug = fixture.debugElement.query(By.css('md-radio-button'));
            let radio: MdRadioButton = debug.componentInstance;

            debug.nativeElement.click();
            expect(radio.checked).toBe(true);
            radio.checked = false;
            expect(radio.checked).toBe(false);
            sendKey(fixture.debugElement.componentViewChildren[0], KeyCodes.SPACE);
            expect(radio.checked).toBe(true);

            fixture.destroy();
            async.done();
          });
        }));
        it('should do nothing with other keypresses', inject([AsyncTestCompleter], (async) => {
          let template = `<md-radio-button></md-radio-button>`;
          setup(template).then((fixture: ComponentFixture) => {
            fixture.detectChanges();

            let radio: MdRadioButton = fixture.debugElement.query(By.css('md-radio-button')).componentInstance;
            expect(radio.checked).toBe(false);
            sendKey(fixture.debugElement.componentViewChildren[0], KeyCodes.UP);
            expect(radio.checked).toBe(false);

            fixture.destroy();
            async.done();
          });
        }));

      });
    });

  });


}

