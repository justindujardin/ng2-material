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
import {DebugElement} from 'angular2/src/core/debug/debug_element';
import {Component, View, provide} from 'angular2/core';
import {UrlResolver} from 'angular2/compiler';
import {TestUrlResolver} from '../../test_url_resolver';
import {MATERIAL_PROVIDERS} from '../../../ng2-material/all';
import {ComponentFixture} from "angular2/testing";
import {MdInput,MdInputContainer} from "../../../ng2-material/components/input/input";
import {TimerWrapper} from "angular2/src/facade/async";
import {By} from 'angular2/platform/browser';

export function main() {

  let template = `<md-input-container><input md-input type="text"></md-input-container>`;
  componentSanityCheck('Input Container', 'md-input-container', template);

  interface IInputFixture {
    fixture:ComponentFixture;
    input:MdInput;
    container:MdInputContainer;
    inputDebug:DebugElement;
    containerDebug:DebugElement;
  }

  @Component({selector: 'test-app'})
  @View({
    directives: [MdInput, MdInputContainer],
    template: template
  })
  class TestComponent {
  }

  describe('Input', () => {
    let builder: TestComponentBuilder;

    function setup(template: string = null): Promise<IInputFixture> {
      let prep = template === null ?
        builder.createAsync(TestComponent) :
        builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
      return prep.then((fixture: ComponentFixture) => {
        fixture.detectChanges();
        let input = fixture.debugElement.query(By.css('[md-input]'));
        let container = fixture.debugElement.query(By.css('md-input-container'));
        return {
          fixture: fixture,
          input: input.componentInstance,
          container: container.componentInstance,
          inputDebug: input,
          containerDebug: container,
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

    describe('input[md-input]', () => {
      it('should initialize with empty string value', inject([AsyncTestCompleter], (async) => {
        setup().then((api: IInputFixture) => {
          api.fixture.destroy();
          expect(api.input.value).toBe('');
          async.done();
        });
      }));
    });
  });


}

