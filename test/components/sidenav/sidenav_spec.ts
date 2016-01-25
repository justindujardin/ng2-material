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
import {By} from 'angular2/platform/browser';
import {MdSidenav} from "../../../ng2-material/components/sidenav/sidenav";
import {SidenavService} from "../../../ng2-material/components/sidenav/sidenav_service";
import {SidenavStyle} from "../../../ng2-material/components/sidenav/sidenav";
import {SidenavAlignment} from "../../../ng2-material/components/sidenav/sidenav";

export function main() {

  interface ITestFixture {
    fixture:ComponentFixture;
    component:MdSidenav;
    debug:DebugElement;
  }

  @Component({selector: 'test-app'})
  @View({
    directives: [MdSidenav],
    template: `<md-sidenav></md-sidenav>`
  })
  class TestComponent {
  }

  describe('Sidenav', () => {
    let builder: TestComponentBuilder;
    let service: SidenavService;

    function setup(template: string = null): Promise<ITestFixture> {
      let prep = template === null ?
        builder.createAsync(TestComponent) :
        builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
      return prep.then((fixture: ComponentFixture) => {
        fixture.detectChanges();
        let debug = fixture.debugElement.query(By.css('md-sidenav'));
        return {
          fixture: fixture,
          component: debug.componentInstance,
          debug: debug
        };
      }).catch(console.error.bind(console));
    }

    beforeEachProviders(() => [
      MATERIAL_PROVIDERS,
      provide(UrlResolver, {useValue: new TestUrlResolver()}),
    ]);
    beforeEach(inject([TestComponentBuilder, SidenavService], (tcb, serv) => {
      builder = tcb;
      service = serv;
    }));

    describe('[md-sidenav]', () => {
      it('should be created and destroyed', inject([AsyncTestCompleter], (async) => {
        setup().then((api: ITestFixture) => {
          api.fixture.destroy();
          async.done();
        });
      }));
      it('should be registered and unregistered with SidenavService', inject([AsyncTestCompleter], (async) => {
        expect(service.find('test')).toBeNull();
        setup(`<md-sidenav name="test"></md-sidenav>`).then((api: ITestFixture) => {
          expect(service.find('test')).not.toBeNull();
          api.fixture.destroy();
          expect(service.find('test')).toBeNull();
          async.done();
        });
      }));
      describe('name', () => {
        it('should default to "default"', inject([AsyncTestCompleter], (async) => {
          setup().then((api: ITestFixture) => {
            expect(api.component.name).toBe('default');
            async.done();
          });
        }));
      });

      describe('style', () => {
        it('should default to over', inject([AsyncTestCompleter], (async) => {
          setup().then((api: ITestFixture) => {
            expect(api.component.style).toBe(SidenavStyle.OVER);
            async.done();
          });
        }));
        it('should set to default when given an invalid value', inject([AsyncTestCompleter], (async) => {
          setup(`<md-sidenav style="gangnam"></md-sidenav>`).then((api: ITestFixture) => {
            expect(api.component.style).toBe(SidenavStyle.OVER);
            async.done();
          });
        }));
        it('should accept "side" for content pushing', inject([AsyncTestCompleter], (async) => {
          setup(`<md-sidenav style="side"></md-sidenav>`).then((api: ITestFixture) => {
            expect(api.component.style).toBe(SidenavStyle.SIDE);
            async.done();
          });
        }));
      });

      describe('align', () => {
        it('should default to "left"', inject([AsyncTestCompleter], (async) => {
          setup().then((api: ITestFixture) => {
            expect(api.component.align).toBe(SidenavAlignment.LEFT);
            async.done();
          });
        }));
        it('should set to default when given an invalid value', inject([AsyncTestCompleter], (async) => {
          setup(`<md-sidenav align="up"></md-sidenav>`).then((api: ITestFixture) => {
            expect(api.component.align).toBe(SidenavAlignment.LEFT);
            async.done();
          });
        }));
        it('should accept "side" for content pushing', inject([AsyncTestCompleter], (async) => {
          setup(`<md-sidenav align="right"></md-sidenav>`).then((api: ITestFixture) => {
            expect(api.component.align).toBe(SidenavAlignment.RIGHT);
            async.done();
          });
        }));

      });
    });
  });
}

