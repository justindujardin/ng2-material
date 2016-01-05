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
import {MdTab, MdTabs} from '../../../ng2-material/components/tabs/tabs';
import {MATERIAL_PROVIDERS} from '../../../ng2-material/all';
import {ComponentFixture} from "angular2/testing";
import {CORE_DIRECTIVES} from "angular2/common";
import {findChildrenByAttribute,findChildrenByTag,findChildByTag} from "../../util";
import {TimerWrapper} from "angular2/src/facade/async";
import {Ink} from "../../../ng2-material/core/util/ink";
import {ProgressMode} from "../../../ng2-material/components/progress_linear/progress_linear";
import {MdProgressCircular} from "../../../ng2-material/components/progress_circular/progress_circular";


export function main() {

  interface IProgressFixture {
    fixture:ComponentFixture;
    progress:MdProgressCircular;
    debug:DebugElement;
  }
  @Component({selector: 'test-app'})
  @View({
    directives: [CORE_DIRECTIVES, MdProgressCircular],
    template: `<md-progress-circular mode="determinate" [value]="value"></md-progress-circular>`
  })
  class TestComponent {
    value:number = 25;
    blankValue:number;
    modeDeterminate:string = ProgressMode.DETERMINATE;
    modeIndeterminate:string = ProgressMode.INDETERMINATE;
  }

  describe('Progress Circular', () => {
    let builder:TestComponentBuilder;

    function setup(template:string = null):Promise<IProgressFixture> {
      let prep = template === null ?
        builder.createAsync(TestComponent) :
        builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
      return prep.then((fixture:ComponentFixture) => {
        fixture.detectChanges();
        let debug = findChildByTag(fixture.debugElement, 'md-progress-circular');
        let component = <MdProgressCircular>debug.componentInstance;
        return {
          fixture: fixture,
          progress: component,
          debug: debug
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

    describe('md-progress-circular', () => {

      describe('value', () => {
        it('should be blank until specified', inject([AsyncTestCompleter], (async) => {
          setup(`<md-progress-circular></md-progress-circular>`).then((api:IProgressFixture) => {
            expect(api.progress.value).toBeUndefined();
            async.done();
          });
        }));
        it('should set from binding', inject([AsyncTestCompleter], (async) => {
          setup(`<md-progress-circular [value]="value"></md-progress-circular>`).then((api:IProgressFixture) => {
            expect(api.progress.value).toBe(25);
            async.done();
          });
        }));
        it('should do nothing with undefined value', inject([AsyncTestCompleter], (async) => {
          setup(`<md-progress-circular [value]="blankValue"></md-progress-circular>`).then((api:IProgressFixture) => {
            expect(api.progress.value).toBeUndefined();
            async.done();
          });
        }));


        it('should update aria-valuenow', inject([AsyncTestCompleter], (async) => {
          setup(`<md-progress-circular [value]="value"></md-progress-circular>`).then((api:IProgressFixture) => {

            let compiled = api.fixture.nativeElement;

            expect(compiled.querySelector('md-progress-circular').getAttribute('aria-valuenow')).toBe('25');
            async.done();
          });
        }));
      });

      describe('diameter', () => {
        it('should set scaling using percentage values', inject([AsyncTestCompleter], (async) => {
          setup(`<md-progress-circular [diameter]="'25%'"></md-progress-circular>`).then((api:IProgressFixture) => {

            let compiled = api.fixture.nativeElement;
            let indicator = compiled.querySelector('md-progress-circular');
            let scaleWrapper = compiled.querySelector('.md-scale-wrapper');

            expect(getScale(scaleWrapper)).toBe(0.25);
            expect(indicator.style['height']).toBe('25px');
            expect(indicator.style['width']).toBe('25px');

            async.done();
          });
        }));


        it('should set scaling using pixel values', inject([AsyncTestCompleter], (async) => {
          setup(`<md-progress-circular [diameter]="'37px'"></md-progress-circular>`).then((api:IProgressFixture) => {

            let compiled = api.fixture.nativeElement;
            let indicator = compiled.querySelector('md-progress-circular');
            let scaleWrapper = compiled.querySelector('.md-scale-wrapper');

            expect(getScale(scaleWrapper)).toBe(0.37);
            expect(indicator.style['height']).toBe('37px');
            expect(indicator.style['width']).toBe('37px');

            async.done();
          });
        }));
      });

      describe('mode', () => {
        it('should default to determinate', inject([AsyncTestCompleter], (async) => {
          setup(`<md-progress-circular></md-progress-circular>`).then((api:IProgressFixture) => {
            expect(api.progress.mode).toBe(ProgressMode.DETERMINATE);
            async.done();
          });
        }));
        it('should set from attribute', inject([AsyncTestCompleter], (async) => {
          setup(`<md-progress-circular mode="indeterminate"></md-progress-circular>`).then((api:IProgressFixture) => {
            expect(api.progress.mode).toBe(ProgressMode.INDETERMINATE);
            async.done();
          });
        }));
      });
    });

    /**
     * Lookup the scale value assigned; based on the md-diameter attribute value
     */
    function getScale(element) {
      var transform = element.style['transform'] || element.style['-webkit-transform'];
      var matches = /scale\(\s*([0-9\.]+)\s*\)/.exec(transform);
      var scale = parseFloat(matches[1]);

      return Math.round(scale * 100) / 100;
    }
  });
}

