import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {MdMessage, MdMessages} from '../../index';
import {By} from '@angular/platform-browser';
import {promiseWait} from '../../platform/testing/util';
import {CommonModule} from '@angular/common';
import {FormsModule, FormControl} from '@angular/forms';


interface IFormMessagesFixture {
  fixture: ComponentFixture<TestComponent>;
  container: MdMessages;
  messages: MdMessage[];
}
@Component({
  selector: 'test-app',
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

fdescribe('Form Messages', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MdMessage, MdMessages, TestComponent
      ],
      imports: [CommonModule, FormsModule],
      providers: []
    });
  });

  function setup(template: string = null): Promise<IFormMessagesFixture> {
    if (template) {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: template
        }
      });
    }
    return TestBed.compileComponents()
      .then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        let container = fixture.debugElement.query(By.directive(MdMessages)).injector.get(MdMessages) as MdMessages;
        let messages = fixture.debugElement.queryAll(By.directive(MdMessage)).map(b => b.injector.get(MdMessage)) as MdMessage[];
        return {
          fixture: fixture,
          container: container,
          messages: messages
        };
      })
      .catch(error => console.error.bind(console));
  }

  describe('md-messages', () => {
    it('should error if used outside of an NgFormControl', () => {
      return setup(`<div md-messages></div>`).catch((err: any) => {
        expect(err).toBeDefined();
      });
    });

    it('should initialize when given model and control group are present', () => {
      return setup().then((api: IFormMessagesFixture) => {
        expect(api.container.isTouched).toBe(false);
        api.fixture.destroy();
      });
    });

    it('should bind local view references #ref="ngForm"', () => {
      return setup().then((api: IFormMessagesFixture) => {
        expect(api.container.isTouched).toBe(false);
        expect(api.messages.length).toBe(1);
        expect(api.container.form).not.toBeNull();
        expect(api.fixture.componentInstance.name).toBe('MorTon');
      });
    });

    it('should re-export valid from control or form', async(() => {
      return setup().then((api: IFormMessagesFixture) => {
        return promiseWait().then(() => {
          let ctrl: FormControl = (<any>api.container.property).control;
          expect(ctrl.value).toBe(null);
          expect(api.container.valid).toBe(false);
          expect(api.container.valid).toBe(ctrl.valid);
          ctrl.setValue('MorTon', {emitEvent: true});
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


