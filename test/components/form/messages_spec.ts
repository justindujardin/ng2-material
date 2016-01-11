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
import {MdMessage, MdMessages} from '../../../ng2-material/components/form/messages';
import {MATERIAL_PROVIDERS} from '../../../ng2-material/all';
import {ComponentFixture} from "angular2/testing";
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgFormControl, NgFormModel, NgControlName} from "angular2/common";
import {findChildrenByAttribute,findChildrenByTag,findChildByTag} from "../../util";
import {TimerWrapper} from "angular2/src/facade/async";
import {Ink} from "../../../ng2-material/core/util/ink";
import {findChildByAttribute} from "../../util";


export function main() {

  interface IFormMessagesFixture {
    fixture:ComponentFixture;
    container:MdMessages;
    messages:MdMessage[];
  }
  @Component({selector: 'test-app'})
  @View({
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
        let container = <MdMessages>findChildByAttribute(fixture.debugElement, 'md-messages').componentInstance;
        let messages = <MdMessage[]>findChildrenByAttribute(fixture.debugElement, 'md-message').map(b => b.componentInstance);
        return {
          fixture: fixture,
          container: container,
          messages: messages
        };
      });
    }

    function getByInstance<T>(debug: DebugElement, type: any): T {
      let found = debug.query((debugEl: DebugElement) => {
        return debugEl.componentInstance instanceof type;
      });
      return <T>(found ? found.componentInstance : null);
    }

    beforeEachProviders(() => [MATERIAL_PROVIDERS, provide(UrlResolver, {useValue: new TestUrlResolver()}),]);
    beforeEach(inject([TestComponentBuilder], (tcb) => builder = tcb));

    describe('md-messages', () => {
      it('should error if used outside of an NgFormControl', inject([AsyncTestCompleter], (async) => {
        setup(`<div md-messages></div>`).catch((err: any) => {
          expect(err).toBeDefined();
          async.done();
        });
      }));
      it('should initialize when given model and control group are present', inject([AsyncTestCompleter], (async) => {
        setup().then((api: IFormMessagesFixture) => {
          expect(api.container.isTouched).toBe(false);
          async.done();
          api.fixture.destroy();
        }).catch((e) => console.log(e));
      }));
      it('should bind local view references #ref="ngForm"', inject([AsyncTestCompleter], (async) => {
        setup().then((api: IFormMessagesFixture) => {
          expect(api.container.isTouched).toBe(false);
          expect(api.messages.length).toBe(1);
          expect(api.container.form).not.toBeNull();
          expect(api.fixture.componentInstance.name).toBe('MorTon');
          async.done();
        }).catch((e) => console.log(e));
      }));
      // TODO(jd): how to test form value changes? Need to change the control and have it
      // trigger its own change events so that md-messages picks them up.
      //it('should add md-valid and md-invalid classes to host', inject([AsyncTestCompleter], (async) => {
      //  setup().then((api: IFormMessagesFixture) => {
      //    TimerWrapper.setTimeout(()=> {
      //      let app: TestComponent = api.fixture.componentInstance;
      //      expect(app.name).toBe('MorTon');
      //      expect(api.container.valid).toBe(true);
      //      app.name = null;
      //      let form = getByInstance<NgControlName>(api.fixture.debugElement, NgControlName);
      //      form.control.updateValue('');
      //      api.fixture.detectChanges();
      //      expect(api.container.valid).toBe(false);
      //
      //      async.done();
      //    }, 0);
      //
      //  });
      //}));
    });


// TODO(jd): Behaviors to test
// - md-messages with no md-message children act as message for all errors in a field
// - md-message="propName" binds to FormBuilder group by given name
// - [md-messages]="viewLocal" binds to given NgControlName referenced from the view
// - [md-messages] adds md-valid and md-invalid class based on field validation state
// - throws informative errors when it fails to bind to a given form field because it cannot be found.

  });


}

