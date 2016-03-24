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
import {Component} from "angular2/core";
import {MdMessage, MdMessages} from "../../../ng2-material/components/form/messages";
import {CORE_DIRECTIVES, FORM_DIRECTIVES, Control} from "angular2/common";
import {By} from "angular2/platform/browser";
import {promiseWait} from "../../util";


export function main() {

  interface IFormMessagesFixture {
    fixture: ComponentFixture;
    container: MdMessages;
    messages: MdMessage[];
  }
  @Component({
    selector: 'test-app',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, MdMessage, MdMessages],
    template: `
    <form>
      <input ngControl="name" required #name="ngForm"/>
      <section [md-messages]="name">
        <div md-message="required">required</div>
      </section>
    </form>`
  })
  class TestComponent {
    name: string = 'MorTon';
  }

  describe('Form Messages', () => {
    let builder: TestComponentBuilder;

    function setup(template: string = null): Promise<IFormMessagesFixture> {
      let prep = template === null ?
        builder.createAsync(TestComponent) :
        builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
      return prep.then((fixture: ComponentFixture) => {
        fixture.detectChanges();
        let container = <MdMessages>fixture.debugElement.query(By.css('[md-messages]')).componentInstance;
        let messages = <MdMessage[]>fixture.debugElement.queryAll(By.css('[md-message]')).map(b => b.componentInstance);
        return {
          fixture: fixture,
          container: container,
          messages: messages
        };
      });
    }

    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    describe('md-messages', () => {
      it('should error if used outside of an NgFormControl', injectAsync([], () => {
        return setup(`<div md-messages></div>`).catch((err: any) => {
          expect(err).toBeDefined();
        });
      }));
      it('should initialize when given model and control group are present', injectAsync([], () => {
        return setup().then((api: IFormMessagesFixture) => {
          expect(api.container.isTouched).toBe(false);
          api.fixture.destroy();
        });
      }));
      it('should bind local view references #ref="ngForm"', injectAsync([], () => {
        return setup().then((api: IFormMessagesFixture) => {
          expect(api.container.isTouched).toBe(false);
          expect(api.messages.length).toBe(1);
          expect(api.container.form).not.toBeNull();
          expect(api.fixture.componentInstance.name).toBe('MorTon');
        });
      }));
      it('should re-export valid from control or form', injectAsync([], () => {
        return setup().then((api: IFormMessagesFixture) => {
          return promiseWait().then(() => {
            let ctrl: Control = (<any>api.container.property).control;
            expect(ctrl.value).toBe(null);
            expect(api.container.valid).toBe(false);
            expect(api.container.valid).toBe(ctrl.valid);
            ctrl.updateValue('MorTon', {emitEvent: true});
            api.fixture.detectChanges();
            expect(api.container.valid).toBe(true);
          });
        });
      }));
    });


// TODO(jd): Behaviors to test
// - md-messages with no md-message children act as message for all errors in a field
// - md-message="propName" binds to FormBuilder group by given name
// - [md-messages]="viewLocal" binds to given NgControlName referenced from the view
// - [md-messages] adds md-valid and md-invalid class based on field validation state
// - throws informative errors when it fails to bind to a given form field because it cannot be found.

  });


}

