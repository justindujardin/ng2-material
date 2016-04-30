import {
  TestComponentBuilder,
  beforeEach,
  describe,
  expect,
  inject,
  it,
  async,
  ComponentFixture
} from "angular2/testing";
import {Component, DebugElement} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {ProgressMode} from "../../../ng2-material/components/progress_linear/progress_linear";
import {MdProgressCircular} from "../../../ng2-material/components/progress_circular/progress_circular";
import {By} from "angular2/platform/browser";

export function main() {

  interface IProgressFixture {
    fixture: ComponentFixture;
    progress: MdProgressCircular;
    debug: DebugElement;
  }
  @Component({
    selector: 'test-app',
    directives: [CORE_DIRECTIVES, MdProgressCircular],
    template: `<md-progress-circular mode="determinate" [value]="value"></md-progress-circular>`
  })
  class TestComponent {
    value: number = 25;
    blankValue: number;
    modeDeterminate: string = ProgressMode.DETERMINATE;
    modeIndeterminate: string = ProgressMode.INDETERMINATE;
  }

  describe('Progress Circular', () => {
    let builder: TestComponentBuilder;

    function setup(template: string = null): Promise<IProgressFixture> {
      let prep = template === null ?
        builder.createAsync(TestComponent) :
        builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
      return prep.then((fixture: ComponentFixture) => {
        fixture.detectChanges();
        let debug = fixture.debugElement.query(By.css('md-progress-circular'));
        let component = <MdProgressCircular>debug.componentInstance;
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

    describe('md-progress-circular', () => {

      describe('value', () => {
        it('should be blank until specified', async(inject([], () => {
          return setup(`<md-progress-circular></md-progress-circular>`).then((api: IProgressFixture) => {
            expect(api.progress.value).toBeUndefined();
          });
        })));
        it('should set from binding', async(inject([], () => {
          return setup(`<md-progress-circular [value]="value"></md-progress-circular>`).then((api: IProgressFixture) => {
            expect(api.progress.value).toBe(25);
          });
        })));
        it('should do nothing with undefined value', async(inject([], () => {
          return setup(`<md-progress-circular [value]="blankValue"></md-progress-circular>`).then((api: IProgressFixture) => {
            expect(api.progress.value).toBeUndefined();
          });
        })));


        it('should update aria-valuenow', async(inject([], () => {
          return setup(`<md-progress-circular [value]="value"></md-progress-circular>`).then((api: IProgressFixture) => {

            let compiled = api.fixture.nativeElement;

            expect(compiled.querySelector('md-progress-circular').getAttribute('aria-valuenow')).toBe('25');
          });
        })));
      });

      describe('diameter', () => {
        it('should set scaling using percentage values', async(inject([], () => {
          return setup(`<md-progress-circular [diameter]="'25%'"></md-progress-circular>`).then((api: IProgressFixture) => {
            let compiled = api.fixture.nativeElement;
            let indicator = compiled.querySelector('md-progress-circular');
            let scaleWrapper = compiled.querySelector('.md-scale-wrapper');

            expect(getScale(scaleWrapper)).toBe(0.25);
            expect(indicator.style['height']).toBe('25px');
            expect(indicator.style['width']).toBe('25px');
          });
        })));


        it('should set scaling using pixel values', async(inject([], () => {
          return setup(`<md-progress-circular [diameter]="'37px'"></md-progress-circular>`).then((api: IProgressFixture) => {

            let compiled = api.fixture.nativeElement;
            let indicator = compiled.querySelector('md-progress-circular');
            let scaleWrapper = compiled.querySelector('.md-scale-wrapper');

            expect(getScale(scaleWrapper)).toBe(0.37);
            expect(indicator.style['height']).toBe('37px');
            expect(indicator.style['width']).toBe('37px');
          });
        })));
      });

      describe('mode', () => {
        it('should default to determinate', async(inject([], () => {
          return setup(`<md-progress-circular></md-progress-circular>`).then((api: IProgressFixture) => {
            expect(api.progress.mode).toBe(ProgressMode.DETERMINATE);
          });
        })));
        it('should set from attribute', async(inject([], () => {
          return setup(`<md-progress-circular mode="indeterminate"></md-progress-circular>`).then((api: IProgressFixture) => {
            expect(api.progress.mode).toBe(ProgressMode.INDETERMINATE);
          });
        })));
      });
    });

    /**
     * Lookup the scale value assigned; based on the md-diameter attribute value
     */
    function getScale(element) {
      var transform = element.style['transform'] || element.style['-webkit-transform'];
      var matches = /scale\(\s*([0-9,\.]+)\s*\)/.exec(transform);
      var scale = parseFloat(matches[1].replace(',', '.'));

      return Math.round(scale * 100) / 100;
    }
  });
}

