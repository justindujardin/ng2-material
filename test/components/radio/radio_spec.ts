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
import {MdRadioGroup, MdRadioButton} from 'ng2-material/components/radio/radio_button';
import {MATERIAL_PROVIDERS} from 'ng2-material/all';
import {ComponentFixture} from "angular2/testing";


export function main() {

  /** Gets a child DebugElement by tag name. */
  function findChild(parent: DebugElement, tagName: string): DebugElement {
    return parent.query((debugEl) => {
      return debugEl.nativeElement.tagName.toLowerCase() === tagName.toLowerCase();
    });
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

    beforeEachProviders(() => [
      MATERIAL_PROVIDERS,
      provide(UrlResolver, {useValue: new TestUrlResolver()}),
    ]);
    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    describe('md-radio-group', () => {
      it('should set value from initial binding', inject([AsyncTestCompleter], (async) => {
        builder.createAsync(TestComponent).then(fixture => {
          fixture.detectChanges();
          let radioGroup = <MdRadioGroup>findChild(fixture.debugElement, 'md-radio-group').componentInstance;
          expect(radioGroup.value).toBe('Banana');
          async.done();
        });
      }), 10000);
      it('should disable child radios when disabled', inject([AsyncTestCompleter], (async) => {
        var template = `
            <md-radio-group disabled>
              <md-radio-button>Apple</md-radio-button>
            </md-radio-group>`;
        builder
          .overrideTemplate(TestComponent, template)
          .createAsync(TestComponent)
          .then(fixture => {
            fixture.detectChanges();
            let radioGroup = <MdRadioGroup>findChild(fixture.debugElement, 'md-radio-group').componentInstance;
            expect(radioGroup.disabled).toBe(true);

            let radio = <MdRadioButton>findChild(fixture.debugElement, 'md-radio-button').componentInstance;
            expect(radio.disabled).toBe(true);
            async.done();
          });
      }), 10000);
    });

    describe('md-radio-button', () => {
      it('should not propagate click events when disabled', inject([AsyncTestCompleter], (async) => {
        // Template that will disable the radio item after it has been clicked once.
        let template = `
            <md-radio-group (click)="onClick($event)">
              <md-radio-button [disabled]="clicks > 0" value="Apple">Apple</md-radio-button>
            </md-radio-group>`;

        builder
          .overrideTemplate(TestComponent, template)
          .createAsync(TestComponent)
          .then(fixture => {
            let app: TestComponent = fixture.debugElement.componentInstance;
            fixture.detectChanges();
            let radio = findChild(fixture.debugElement, 'md-radio-button');
            expect(app.clicks).toBe(0);
            radio.nativeElement.click();
            expect(app.clicks).toBe(1);
            fixture.detectChanges();
            radio.nativeElement.click();
            expect(app.clicks).toBe(1);
            async.done();
          });
      }));
      it('should not be selectable when disabled', inject([AsyncTestCompleter], (async) => {
        let template = `
            <md-radio-group>
              <md-radio-button disabled value="Apple">Apple</md-radio-button>
            </md-radio-group>`;

        builder
          .overrideTemplate(TestComponent, template)
          .createAsync(TestComponent)
          .then((fixture:ComponentFixture) => {
            let radio = findChild(fixture.debugElement, 'md-radio-button');
            let group = <MdRadioGroup>findChild(fixture.debugElement, 'md-radio-group').componentInstance;
            expect(group.getSelectedRadioIndex()).toBe(-1);
            fixture.detectChanges();
            radio.nativeElement.click();
            fixture.detectChanges();
            expect(group.getSelectedRadioIndex()).toBe(-1);
            async.done();
          });
      }));
    });

  });


}

