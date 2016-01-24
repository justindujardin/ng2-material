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

export function main() {

  interface ITestFixture {
    fixture:ComponentFixture;
    component:MdSidenav;
    debug:DebugElement;
  }

  @Component({selector: 'test-app'})
  @View({
    directives: [MdSidenav],
    template: `<div md-sidenav="test"></div>`
  })
  class TestComponent {
  }

  describe('Sidenav Service', () => {
    let builder: TestComponentBuilder;
    let service: SidenavService;
    function setup(template: string = null): Promise<ITestFixture> {
      let prep = template === null ?
        builder.createAsync(TestComponent) :
        builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
      return prep.then((fixture: ComponentFixture) => {
        fixture.detectChanges();
        let debug = fixture.debugElement.query(By.css('[md-sidenav]'));
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
    beforeEach(inject([TestComponentBuilder, SidenavService], (tcb,serv) => {
      builder = tcb;
      service = serv;
    }));

    describe('find', () => {
      it('should find sidenav by name', inject([AsyncTestCompleter], (async) => {
        setup().then((api: ITestFixture) => {
          expect(service.find('test')).not.toBeNull();
          expect(service.find('fake')).toBeNull();
          api.fixture.destroy();
          async.done();
        });
      }));
    });
    describe('show', () => {
      it('should show sidenav by name', inject([AsyncTestCompleter], (async) => {
        setup()
          .then(() => service.show('test'))
          .then(() => async.done());
      }));
      it('should reject with invalid sidenav name', inject([AsyncTestCompleter], (async) => {
        setup()
          .then(() => service.show('fake'))
          .catch(() => async.done());
      }));
    });
    describe('hide', () => {
      it('should hide sidenav by name', inject([AsyncTestCompleter], (async) => {
        setup()
          .then(() => service.hide('test'))
          .then(() => async.done());
      }));
      it('should reject with invalid sidenav name', inject([AsyncTestCompleter], (async) => {
        setup()
          .then(() => service.hide('fake'))
          .catch(() => async.done());
      }));
    });

  });
}

