import {
  TestComponentBuilder,
  beforeEach,
  describe,
  expect,
  inject,
  it,
  ComponentFixture,
  injectAsync
} from "angular2/testing";
import {Component, DebugElement} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {MdProgressLinear, ProgressMode} from "../../../ng2-material/components/progress_linear/progress_linear";
import {By} from "angular2/platform/browser";

export function main() {

  interface IProgressFixture {
    fixture:ComponentFixture;
    progress:MdProgressLinear;
    debug:DebugElement;
  }
  @Component({
    selector: 'test-app',
    directives: [CORE_DIRECTIVES, MdProgressLinear],
    template: `<md-progress-linear mode="determinate" [value]="value"></md-progress-linear>`
  })
  class TestComponent {
    value: number = 25;
    bufferValue: number = 50;
    blankValue: number;
    modeDeterminate: string = ProgressMode.DETERMINATE;
    modeIndeterminate: string = ProgressMode.INDETERMINATE;
    modeBuffer: string = ProgressMode.BUFFER;
    modeQuery: string = ProgressMode.QUERY;
  }

  describe('Progress Linear', () => {
    let builder: TestComponentBuilder;

    function setup(template: string = null): Promise<IProgressFixture> {
      let prep = template === null ?
        builder.createAsync(TestComponent) :
        builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
      return prep.then((fixture: ComponentFixture) => {
        fixture.detectChanges();
        let debug = fixture.debugElement.query(By.css('md-progress-linear'));
        let component = <MdProgressLinear>debug.componentInstance;
        return {
          fixture: fixture,
          progress: component,
          debug: debug
        };
      }).catch(console.error.bind(console));
    }

    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    describe('md-progress-linear', () => {

      describe('value', () => {
        it('should be blank until specified', injectAsync([], () => {
          return setup(`<md-progress-linear></md-progress-linear>`).then((api: IProgressFixture) => {
            expect(api.progress.value).toBeUndefined();
          });
        }));
        it('should set from binding', injectAsync([], () => {
          return setup(`<md-progress-linear [value]="value"></md-progress-linear>`).then((api: IProgressFixture) => {
            expect(api.progress.value).toBe(25);
          });
        }));
        it('should do nothing with undefined value', injectAsync([], () => {
          return setup(`<md-progress-linear [value]="blankValue"></md-progress-linear>`).then((api: IProgressFixture) => {
            expect(api.progress.value).toBeUndefined();
          });
        }));

      });

      describe('mode', () => {
        it('should default to determinate', injectAsync([], () => {
          return setup(`<md-progress-linear></md-progress-linear>`).then((api: IProgressFixture) => {
            expect(api.progress.mode).toBe(ProgressMode.DETERMINATE);
          });
        }));
        it('should set from attribute', injectAsync([], () => {
          return setup(`<md-progress-linear mode="indeterminate"></md-progress-linear>`).then((api: IProgressFixture) => {
            expect(api.progress.mode).toBe(ProgressMode.INDETERMINATE);
          });
        }));
        it('should set from binding', injectAsync([], () => {
          return setup(`<md-progress-linear [mode]="modeQuery"></md-progress-linear>`).then((api: IProgressFixture) => {
            expect(api.progress.mode).toBe(ProgressMode.QUERY);
          });
        }));

      });

      describe('bufferValue', () => {
        it('should be blank until specified', injectAsync([], () => {
          return setup(`<md-progress-linear></md-progress-linear>`).then((api: IProgressFixture) => {
            expect(api.progress.bufferValue).toBeUndefined();
          });
        }));
        it('should set from binding', injectAsync([], () => {
          let template = `<md-progress-linear
                              mode="buffer"
                              [value]="value"
                              [bufferValue]="bufferValue">
                          </md-progress-linear>`
          return setup(template).then((api: IProgressFixture) => {
            expect(api.progress.bufferValue).toBe(50);
          });
        }));
        it('should do nothing with undefined value', injectAsync([], () => {
          let template = `<md-progress-linear
                              mode="buffer"
                              [bufferValue]="blankValue">
                          </md-progress-linear>`;
          return setup(template).then((api: IProgressFixture) => {
            expect(api.progress.bufferValue).toBeUndefined();
          });
        }));
      });
    });
  });
}

