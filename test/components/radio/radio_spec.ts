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
import {MdRadioGroup, MdRadioButton} from "../../../ng2-material/components/radio/radio_button";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {KeyCodes} from "../../../ng2-material/core/key_codes";
import {By} from "angular2/platform/browser";


// TODO(jd): This needs a better fixture.  There are a TON of debug queries inline.

export function main() {

  let sendKey = (to: DebugElement, keyCode: number) => {
    let event = DOM.createEvent('key');
    event.keyCode = keyCode;
    to.triggerEventHandler('keydown', event);
  }


  @Component({
    selector: 'test-app',
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

    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    describe('md-radio-group', () => {
      it('should set value from initial binding', injectAsync([], () => {
        return builder.createAsync(TestComponent).then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          let radioGroup = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;
          expect(radioGroup.value).toBe('Banana');
        });
      }));
      it('should only have one selected child at a time', injectAsync([], () => {
        let template = `
            <md-radio-group>
              <md-radio-button id="rdo1" value="Apple"></md-radio-button>
              <md-radio-button id="rdo2" value="Banana"></md-radio-button>
            </md-radio-group>`;
        return setup(template).then((fixture: ComponentFixture) => {
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
        });
      }));
      it('should select a child by value when value is initially set on group', injectAsync([], () => {
        let template = `
            <md-radio-group [value]="selected">
              <md-radio-button id="rdo1" value="Apple"></md-radio-button>
              <md-radio-button id="rdo2" value="Banana"></md-radio-button>
            </md-radio-group>`;
        return setup(template).then((fixture: ComponentFixture) => {
          let radio = fixture.debugElement.query(By.css('#rdo1'));
          let radio2 = fixture.debugElement.query(By.css('#rdo2'));
          let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;
          fixture.detectChanges();
          expect(group.value).toBe('Banana');
          expect(radio2.componentInstance.checked).toBe(true);
        });
      }));

      it('should select a child by value when value is set on group', injectAsync([], () => {
        let template = `
            <md-radio-group>
              <md-radio-button id="rdo1" value="Apple"></md-radio-button>
              <md-radio-button id="rdo2" value="Banana"></md-radio-button>
            </md-radio-group>`;
        return setup(template).then((fixture: ComponentFixture) => {
          let radio = fixture.debugElement.query(By.css('#rdo1'));
          let radio2 = fixture.debugElement.query(By.css('#rdo2'));
          let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;
          expect(group.value).toBeFalsy();
          expect(radio.componentInstance.checked).toBe(false);
          group.value = "Apple";
          fixture.detectChanges();
          expect(radio.componentInstance.checked).toBe(true);
          expect(group.value).toBe('Apple');
        });
      }));
      it('should accept value even if no matching child is found', injectAsync([], () => {
        let template = `<md-radio-group></md-radio-group>`;
        return setup(template).then((fixture: ComponentFixture) => {
          let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;
          expect(group.value).toBeFalsy();
          group.value = "Apple";
          fixture.detectChanges();
          expect(group.value).toBe('Apple');
        });
      }));
      it('should disable child radio buttons when disabled', injectAsync([], () => {
        var template = `
            <md-radio-group disabled>
              <md-radio-button>Apple</md-radio-button>
            </md-radio-group>`;
        return setup(template).then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;
          expect(group.disabled).toBe(true);

          let radio = <MdRadioButton>fixture.debugElement.query(By.css('md-radio-button')).componentInstance;
          expect(radio.disabled).toBe(true);
        });
      }));
      it('should initialize value from checked child radio', injectAsync([], () => {
        let template = `
            <md-radio-group>
              <md-radio-button checked value="Apple"></md-radio-button>
              <md-radio-button value="Banana"></md-radio-button>
            </md-radio-group>`;
        return setup(template).then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;
          expect(group.value).toBe('Apple');
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

        it('should step to the previous radio when the up arrow key is pressed', injectAsync([], () => {
          return setup(template).then((fixture: ComponentFixture) => {
            fixture.detectChanges();

            let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;

            expect(group.value).toBe('Banana');
            sendKey(fixture.debugElement.children[0], KeyCodes.UP);
            expect(group.value).toBe('Apple');
          });
        }));
        it('should not step beyond the first radio when up key is pressed', injectAsync([], () => {
          return setup(template).then((fixture: ComponentFixture) => {
            fixture.detectChanges();

            let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;

            expect(group.value).toBe('Banana');
            sendKey(fixture.debugElement.children[0], KeyCodes.UP);
            expect(group.value).toBe('Apple');
            sendKey(fixture.debugElement.children[0], KeyCodes.UP);
            expect(group.value).toBe('Apple');
          });
        }));
        it('should step to the next radio when the down arrow key is pressed', injectAsync([], () => {
          return setup(template).then((fixture: ComponentFixture) => {
            fixture.detectChanges();

            let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;

            expect(group.value).toBe('Banana');
            sendKey(fixture.debugElement.children[0], KeyCodes.DOWN);
            expect(group.value).toBe('Mango');
          });
        }));
        it('should not step beyond the last radio when down key is pressed', injectAsync([], () => {
          return setup(template).then((fixture: ComponentFixture) => {
            fixture.detectChanges();

            let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;

            expect(group.value).toBe('Banana');
            sendKey(fixture.debugElement.children[0], KeyCodes.DOWN);
            expect(group.value).toBe('Mango');
            sendKey(fixture.debugElement.children[0], KeyCodes.DOWN);
            expect(group.value).toBe('Mango');
          });
        }));

        it('should not step forward or back when radio group is disabled', injectAsync([], () => {
          return setup(template).then((fixture: ComponentFixture) => {
            fixture.detectChanges();

            let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;
            group.disabled = true;

            expect(group.value).toBe('Banana');
            sendKey(fixture.debugElement.children[0], KeyCodes.UP);
            expect(group.value).toBe('Banana');
            sendKey(fixture.debugElement.children[0], KeyCodes.DOWN);
            expect(group.value).toBe('Banana');
          });
        }));


        it('should skip over disabled radios when up/down keys are pressed', injectAsync([], () => {
          return setup(template).then((fixture: ComponentFixture) => {
            fixture.detectChanges();

            let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;

            expect(group.value).toBe('Banana');
            sendKey(fixture.debugElement.children[0], KeyCodes.DOWN);
            expect(group.value).toBe('Mango');
            sendKey(fixture.debugElement.children[0], KeyCodes.UP);
            expect(group.value).toBe('Banana');
          });
        }));


      });
    });

    describe('md-radio-button', () => {
      it('should not be selectable when disabled', injectAsync([], () => {
        let template = `
            <md-radio-group>
              <md-radio-button disabled value="Apple">Apple</md-radio-button>
            </md-radio-group>`;
        return setup(template).then((fixture: ComponentFixture) => {
          let radio = fixture.debugElement.query(By.css('md-radio-button'));
          let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;
          expect(group.getSelectedRadioIndex()).toBe(-1);
          fixture.detectChanges();
          radio.nativeElement.click();
          fixture.detectChanges();
          expect(group.getSelectedRadioIndex()).toBe(-1);
        });
      }));

      it('should update parent group value when when selected', injectAsync([], () => {
        let template = `
            <md-radio-group>
              <md-radio-button value="Apple">Apple</md-radio-button>
            </md-radio-group>`;
        return setup(template).then((fixture: ComponentFixture) => {
          let radio = fixture.debugElement.query(By.css('md-radio-button'));
          let group = <MdRadioGroup>fixture.debugElement.query(By.css('md-radio-group')).componentInstance;
          expect(group.value).toBeFalsy();
          radio.nativeElement.click();
          expect(group.value).toBe('Apple');
        });
      }));

      it('should default tabindex to 0 when used outside of a md-radio-group', injectAsync([], () => {
        let template = `<md-radio-button></md-radio-button>`;
        return setup(template).then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          let radio: MdRadioButton = fixture.debugElement.query(By.css('md-radio-button')).componentInstance;
          expect(radio.tabindex).toBe(0);
          fixture.destroy();
        });
      }));
      it('should set tabindex by attribute when used outside of a md-radio-group', injectAsync([], () => {
        let template = `<md-radio-button tabindex="17"></md-radio-button>`;
        return setup(template).then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          let radio: MdRadioButton = fixture.debugElement.query(By.css('md-radio-button')).componentInstance;
          expect(radio.tabindex).toBe(17);
          fixture.destroy();
        });
      }));

      it('should be checkable without a md-radio-group', injectAsync([], () => {
        let template = `<md-radio-button value="Apple">Apple</md-radio-button>`;
        return setup(template).then((fixture: ComponentFixture) => {
          fixture.detectChanges();
          let debug = fixture.debugElement.query(By.css('md-radio-button'));
          let radio: MdRadioButton = debug.componentInstance;
          expect(radio.checked).toBe(false);
          debug.nativeElement.click();
          expect(radio.checked).toBe(true);
          fixture.destroy();
        });
      }));

      describe('Keyboard', () => {
        it('should check the focused radio when the space key is pressed', injectAsync([], () => {
          let template = `<md-radio-button></md-radio-button>`;
          return setup(template).then((fixture: ComponentFixture) => {
            fixture.detectChanges();

            let debug = fixture.debugElement.query(By.css('md-radio-button'));
            let radio: MdRadioButton = debug.componentInstance;

            debug.nativeElement.click();
            expect(radio.checked).toBe(true);
            radio.checked = false;
            expect(radio.checked).toBe(false);
            sendKey(fixture.debugElement.children[0], KeyCodes.SPACE);
            expect(radio.checked).toBe(true);

            fixture.destroy();
          });
        }));
        it('should do nothing with other keypresses', injectAsync([], () => {
          let template = `<md-radio-button></md-radio-button>`;
          return setup(template).then((fixture: ComponentFixture) => {
            fixture.detectChanges();

            let radio: MdRadioButton = fixture.debugElement.query(By.css('md-radio-button')).componentInstance;
            expect(radio.checked).toBe(false);
            sendKey(fixture.debugElement.children[0], KeyCodes.UP);
            expect(radio.checked).toBe(false);

            fixture.destroy();
          });
        }));

      });
    });

  });


}

