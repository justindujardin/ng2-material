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
import {
  MdSidenav,
  SidenavStyle,
  SidenavAlignment,
  MdSidenavContainer
} from "../../../ng2-material/components/sidenav/sidenav";
import {SidenavService} from "../../../ng2-material/components/sidenav/sidenav_service";
import {promiseWait} from "../../util";

export function main() {

  interface ITestFixture {
    fixture: ComponentFixture;
    component: MdSidenav;
    container?: MdSidenavContainer;
    cdebug: DebugElement;
    debug: DebugElement;
  }

  @Component({
    selector: 'test-app',
    directives: [MdSidenav, MdSidenavContainer],
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
        let cdebug = fixture.debugElement.query(By.css('md-sidenav-container'));
        return {
          fixture: fixture,
          component: debug.componentInstance,
          debug: debug,
          cdebug: cdebug,
          container: cdebug ? cdebug.componentInstance : null
        };
      }).catch(console.error.bind(console));
    }

    beforeEach(inject([TestComponentBuilder, SidenavService], (tcb, serv) => {
      builder = tcb;
      service = serv;
    }));

    describe('md-sidenav', () => {
      it('should be created and destroyed', injectAsync([], () => {
        return setup().then((api: ITestFixture) => api.fixture.destroy());
      }));
      it('should be registered and unregistered with SidenavService', injectAsync([], () => {
        expect(service.find('test')).toBeNull();
        return setup(`<md-sidenav name="test"></md-sidenav>`).then((api: ITestFixture) => {
          expect(service.find('test')).not.toBeNull();
          api.fixture.destroy();
          expect(service.find('test')).toBeNull();
        });
      }));
      describe('name', () => {
        it('should default to "default"', injectAsync([], () => {
          return setup().then((api: ITestFixture) => {
            expect(api.component.name).toBe('default');
          });
        }));
      });

      describe('style', () => {
        it('should default to over', injectAsync([], () => {
          return setup().then((api: ITestFixture) => {
            expect(api.component.style).toBe(SidenavStyle.OVER);
          });
        }));
        it('should set to default when given an invalid value', injectAsync([], () => {
          return setup(`<md-sidenav style="gangnam"></md-sidenav>`).then((api: ITestFixture) => {
            expect(api.component.style).toBe(SidenavStyle.OVER);
          });
        }));
        it('should accept "side" for content pushing', injectAsync([], () => {
          return setup(`<md-sidenav style="side"></md-sidenav>`).then((api: ITestFixture) => {
            expect(api.component.style).toBe(SidenavStyle.SIDE);
          });
        }));
      });

      describe('align', () => {
        it('should default to "left"', injectAsync([], () => {
          return setup().then((api: ITestFixture) => {
            expect(api.component.align).toBe(SidenavAlignment.LEFT);
          });
        }));
        it('should set to default when given an invalid value', injectAsync([], () => {
          return setup(`<md-sidenav align="up"></md-sidenav>`).then((api: ITestFixture) => {
            expect(api.component.align).toBe(SidenavAlignment.LEFT);
          });
        }));
        it('should accept "side" for content pushing', injectAsync([], () => {
          return setup(`<md-sidenav align="right"></md-sidenav>`).then((api: ITestFixture) => {
            expect(api.component.align).toBe(SidenavAlignment.RIGHT);
          });
        }));

      });

      describe('visible', () => {
        it('should accept "true" for content pushing', injectAsync([], () => {
          return setup(`<md-sidenav [visible]="true"></md-sidenav>`).then((api: ITestFixture) => {
            expect(api.component.visible).toBe(true);
          });
        }));

      });
    });
    describe('md-sidenav-container', () => {
      let template = `
      <md-sidenav-container>
        <md-sidenav name="menu"></md-sidenav>
        <md-sidenav name="right" align="right"></md-sidenav>
      </md-sidenav-container>`;
      it('should be created and destroyed', injectAsync([], () => {
        return setup(template).then((api: ITestFixture) => {
          api.fixture.destroy();
        });
      }));
      it('should maintain a query list of its children', injectAsync([], () => {
        return setup(template).then((api: ITestFixture) => {
          expect(api.container.children.length).toBe(2);
          api.fixture.destroy();
        });
      }));
      it('should hide any open children when the backdrop is hidden', injectAsync([], () => {
        return setup(template).then((api: ITestFixture) => {
          let menu: MdSidenav = service.find('menu');
          return menu.show().then(() => {
              return new Promise((resolve) => {
                expect(menu.visible).toBe(true);
                let sub = menu.onHidden.subscribe(() => {
                  expect(menu.visible).toBe(false);
                  sub.unsubscribe();
                  resolve();
                });
                menu.backdropRef.onClick();
              });
            })
            .then(() => promiseWait())
            .then(() => api.fixture.destroy());
        });
      }));
      it('should set isPushed if any child elements are side style', injectAsync([], () => {
        return setup(template).then((api: ITestFixture) => {
          expect(api.container.isPushed).toBe(false);
          let menu: MdSidenav = service.find('menu');
          menu.style = SidenavStyle.SIDE;
          return menu.show()
            .then(() => {
              expect(api.container.isPushed).toBe(true);
            })
            .then(() => promiseWait())
            .then(() => api.fixture.destroy());
        });
      }));
    });

  });
}

