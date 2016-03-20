import {
  TestComponentBuilder,
  beforeEach,
  describe,
  expect,
  inject,
  it,
  injectAsync,
  ComponentFixture
} from "angular2/testing";
import {Component, DebugElement} from "angular2/core";
import {By} from "angular2/platform/browser";
import {MdSidenav} from "../../../ng2-material/components/sidenav/sidenav";
import {SidenavService} from "../../../ng2-material/components/sidenav/sidenav_service";

export function main() {

  interface ITestFixture {
    fixture: ComponentFixture;
    component: MdSidenav;
    debug: DebugElement;
  }

  @Component({
    selector: 'test-app',
    directives: [MdSidenav],
    template: `
    <md-sidenav-container>
      <md-sidenav name="test"></md-sidenav>
    </md-sidenav-container>`
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
        let debug = fixture.debugElement.query(By.css('md-sidenav'));
        return {
          fixture: fixture,
          component: debug.componentInstance,
          debug: debug
        };
      }).catch(console.error.bind(console));
    }

    beforeEach(inject([TestComponentBuilder, SidenavService], (tcb, serv) => {
      builder = tcb;
      service = serv;
    }));

    describe('find', () => {
      it('should find sidenav by name', injectAsync([], () => {
        return setup().then((api: ITestFixture) => {
          expect(service.find('test')).not.toBeNull();
          expect(service.find('fake')).toBeNull();
          api.fixture.destroy();
        });
      }));
    });
    describe('show', () => {
      it('should show sidenav by name', injectAsync([], () => {
        return setup()
          .then(() => service.show('test'));
      }));
      it('should reject with invalid sidenav name', injectAsync([], () => {
        return setup()
          .then(() => service.show('fake'))
          .catch(() => Promise.resolve());
      }));
    });
    describe('hide', () => {
      it('should hide sidenav by name', injectAsync([], () => {
        return setup()
          .then(() => service.hide('test'));
      }));
      it('should reject with invalid sidenav name', injectAsync([], () => {
        return setup()
          .then(() => service.hide('fake'))
          .catch(() => Promise.resolve());
      }));
    });

  });
}

