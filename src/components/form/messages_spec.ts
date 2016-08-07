import {inject, addProviders, ComponentFixture, TestComponentBuilder} from "@angular/core/testing";
import {Component, QueryList} from "@angular/core";
import {MdMessage, MdMessages} from "../../index";
import {
  REACTIVE_FORM_DIRECTIVES,
  FormGroup,
  disableDeprecatedForms,
  provideForms,
  Validators,
  FormBuilder
} from "@angular/forms";
import {By} from "@angular/platform-browser";


export function main() {

  const defaultTemplate = `<form [formGroup]="form">
      <input type="text" formControlName="name" name="name" />
      <section mdMessages="name"> 
        <div mdMessage="required">required</div>
      </section>
    </form>`;

  interface IFormMessagesFixture {
    fixture:ComponentFixture<TestComponent>;
    container:MdMessages;
    messages:MdMessage[];
  }
  @Component({
    selector: 'test-app',
    directives: [REACTIVE_FORM_DIRECTIVES, MdMessage, MdMessages],
    template: defaultTemplate
  })
  class TestComponent {
    form:FormGroup;

    constructor(fb:FormBuilder) {
      this.form = fb.group({
        name: fb.control('MorTon', Validators.required)
      });
    }
  }

  describe('Form Messages', () => {
    let builder:TestComponentBuilder;

    function setup(template:string = defaultTemplate):Promise<IFormMessagesFixture> {
      return builder
        .overrideTemplate(TestComponent, template)
        .createAsync(TestComponent)
        .then((fixture:ComponentFixture<TestComponent>) => {
          fixture.detectChanges();
          let container = fixture.debugElement.query(By.directive(MdMessages)).injector.get(MdMessages) as MdMessages;
          let messages = fixture.debugElement.queryAll(By.directive(MdMessage)).map(b => b.injector.get(MdMessage)) as MdMessage[];
          return {
            fixture: fixture,
            container: container,
            messages: messages
          };
        }).catch(() => {
        });
    }

    beforeEach(() => {
      addProviders([
        disableDeprecatedForms(),
        provideForms(),
        {provide: QueryList, useClass: QueryList},
        {provide: FormBuilder, useClass: FormBuilder}
      ]);
    });

    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    describe('md-messages', () => {
      it('should error if used outside of an FormGroup', () => {
        return setup(`<div md-messages></div>`).catch((err:any) => {
          expect(err).toBeDefined();
        });
      });

      it('should initialize when given model and control group are present', () => {
        return setup().then((api:IFormMessagesFixture) => {
          expect(api.container.isTouched).toBe(false);
          api.fixture.destroy();
        });
      });

      it('should bind local view references formControlName="ref"', () => {
        return setup().then((api:IFormMessagesFixture) => {
          expect(api.container.isTouched).toBe(false);
          expect(api.messages.length).toBe(1);
          expect(api.container.formDirective).not.toBeNull();
          expect(api.container.control.value).toBe('MorTon');
        });
      });

      it('should add md-invalid class on [mdMessages] based on field validation state', () => {
        return setup().then((api:IFormMessagesFixture) => {
          expect(api.fixture.debugElement.query(By.css('[md-messages].md-invalid'))).toBeNull();
          api.container.control.updateValue(null, {emitEvent: true});
          let input = api.fixture.debugElement.query(By.css('input'));
          input.nativeElement.focus();
          input.nativeElement.blur();
          api.fixture.detectChanges();
          expect(api.fixture.debugElement.query(By.css('[md-messages].md-invalid'))).not.toBeNull();
        });
      });

      it('should add md-valid class on [mdMessages] based on field validation state', () => {
        return setup().then((api:IFormMessagesFixture) => {
          expect(api.fixture.debugElement.query(By.css('[md-messages].md-valid'))).toBeNull();
          api.container.control.updateValue(null, {emitEvent: true});
          let input = api.fixture.debugElement.query(By.css('input'));
          input.nativeElement.focus();
          api.container.control.updateValue('MorTon', {emitEvent: true});
          input.nativeElement.blur();
          api.fixture.detectChanges();
          expect(api.fixture.debugElement.query(By.css('[md-messages].md-valid'))).not.toBeNull();
        });
      });


      it('should re-export invalid from control or form', () => {
        return setup().then((api:IFormMessagesFixture) => {
          api.container.control.updateValue(null, {emitEvent: true});
          api.fixture.detectChanges();
          expect(api.container.control.value).toBe(null);
          expect(api.container.valid).toBe(false);
          expect(api.container.formDirective.valid).toBe(false);
        }).catch((e) => console.log(e));
      });

      it('should re-export valid from control or form', () => {
        return setup().then((api:IFormMessagesFixture) => {
          api.container.control.updateValue('MorTon', {emitEvent: true});
          api.fixture.detectChanges();
          expect(api.container.control.valid).toBe(true);
          expect(api.container.formDirective.valid).toBe(true);
        }).catch((e) => console.log(e));
      });

    });

// TODO(jd): Behaviors to test
// - md-messages with no md-message children act as message for all errors in a field
// - md-message="propName" binds to FormBuilder group by given name
// - [md-messages]="viewLocal" binds to given NgControlName referenced from the view
// - throws informative errors when it fails to bind to a given form field because it cannot be found.

  });


}

