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
import {MdProgressLinear, ProgressMode} from "../../../ng2-material/components/progress_linear/progress_linear";


export function main() {

  interface IProgressFixture {
    fixture:ComponentFixture;
    progress:MdProgressLinear;
    debug:DebugElement;
  }
  @Component({selector: 'test-app'})
  @View({
    directives: [CORE_DIRECTIVES, MdProgressLinear],
    template: `<md-progress-linear mode="determinate" [value]="value"></md-progress-linear>`
  })
  class TestComponent {
    value: number = 25;
    bufferValue: number = 50;
    blankValue:number;
    modeDeterminate:string = ProgressMode.DETERMINATE;
    modeIndeterminate:string = ProgressMode.INDETERMINATE;
    modeBuffer:string = ProgressMode.BUFFER;
    modeQuery:string = ProgressMode.QUERY;
  }

  describe('Progress Linear', () => {
    let builder: TestComponentBuilder;

    function setup(template: string = null): Promise<IProgressFixture> {
      let prep = template === null ?
        builder.createAsync(TestComponent) :
        builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
      return prep.then((fixture: ComponentFixture) => {
        fixture.detectChanges();
        let debug = findChildByTag(fixture.debugElement, 'md-progress-linear');
        let component = <MdProgressLinear>debug.componentInstance;
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

    describe('md-progress-linear', () => {

      describe('value', () => {
        it('should be blank until specified', inject([AsyncTestCompleter], (async) => {
          setup(`<md-progress-linear></md-progress-linear>`).then((api: IProgressFixture) => {
            expect(api.progress.value).toBeUndefined();
            async.done();
          });
        }));
        it('should set from binding', inject([AsyncTestCompleter], (async) => {
          setup(`<md-progress-linear [value]="value"></md-progress-linear>`).then((api: IProgressFixture) => {
            expect(api.progress.value).toBe(25);
            async.done();
          });
        }));
        it('should do nothing with undefined value', inject([AsyncTestCompleter], (async) => {
          setup(`<md-progress-linear [value]="blankValue"></md-progress-linear>`).then((api: IProgressFixture) => {
            expect(api.progress.value).toBeUndefined();
            async.done();
          });
        }));

      });

      describe('mode', () => {
        it('should default to determinate', inject([AsyncTestCompleter], (async) => {
          setup(`<md-progress-linear></md-progress-linear>`).then((api: IProgressFixture) => {
            expect(api.progress.mode).toBe(ProgressMode.DETERMINATE);
            async.done();
          });
        }));
        it('should set from attribute', inject([AsyncTestCompleter], (async) => {
          setup(`<md-progress-linear mode="indeterminate"></md-progress-linear>`).then((api: IProgressFixture) => {
            expect(api.progress.mode).toBe(ProgressMode.INDETERMINATE);
            async.done();
          });
        }));
        it('should set from binding', inject([AsyncTestCompleter], (async) => {
          setup(`<md-progress-linear [mode]="modeQuery"></md-progress-linear>`).then((api: IProgressFixture) => {
            expect(api.progress.mode).toBe(ProgressMode.QUERY);
            async.done();
          });
        }));

      });

      describe('bufferValue', () => {
        it('should be blank until specified', inject([AsyncTestCompleter], (async) => {
          setup(`<md-progress-linear></md-progress-linear>`).then((api: IProgressFixture) => {
            expect(api.progress.bufferValue).toBeUndefined();
            async.done();
          });
        }));
        it('should set from binding', inject([AsyncTestCompleter], (async) => {
          let template = `<md-progress-linear
                              mode="buffer"
                              [value]="value"
                              [bufferValue]="bufferValue">
                          </md-progress-linear>`
          setup(template).then((api: IProgressFixture) => {
            expect(api.progress.bufferValue).toBe(50);
            async.done();
          });
        }));
        it('should do nothing with undefined value', inject([AsyncTestCompleter], (async) => {
          let template = `<md-progress-linear
                              mode="buffer"
                              [bufferValue]="blankValue">
                          </md-progress-linear>`;
          setup(template).then((api: IProgressFixture) => {
            expect(api.progress.bufferValue).toBeUndefined();
            async.done();
          });
        }));

      });


    });
  });


}

