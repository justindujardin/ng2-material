import {beforeEach, describe, expect, inject, it, async} from "@angular/core/testing";
import {TestComponentBuilder, ComponentFixture} from "@angular/compiler/testing";
import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {MdSidenav, SidenavStyle, SidenavAlignment, MdSidenavContainer, SidenavService} from "../../index";
import {promiseWait} from "../../platform/testing/util";

export function main() {

  interface ITestFixture {
    fixture: ComponentFixture<TestComponent>;
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
      return prep.then((fixture: ComponentFixture<TestComponent>) => {
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
      it('should be created and destroyed', async(inject([], () => {
        return setup().then((api: ITestFixture) => api.fixture.destroy());
      })));
      it('should be registered and unregistered with SidenavService', async(inject([], () => {
        expect(service.find('test')).toBeNull();
        return setup(`<md-sidenav name="test"></md-sidenav>`).then((api: ITestFixture) => {
          expect(service.find('test')).not.toBeNull();
          api.fixture.destroy();
          expect(service.find('test')).toBeNull();
        });
      })));
      describe('name', () => {
        it('should default to "default"', async(inject([], () => {
          return setup().then((api: ITestFixture) => {
            expect(api.component.name).toBe('default');
          });
        })));
      });

      describe('style', () => {
        it('should default to over', async(inject([], () => {
          return setup().then((api: ITestFixture) => {
            expect(api.component.style).toBe(SidenavStyle.OVER);
          });
        })));
        it('should set to default when given an invalid value', async(inject([], () => {
          return setup(`<md-sidenav style="gangnam"></md-sidenav>`).then((api: ITestFixture) => {
            expect(api.component.style).toBe(SidenavStyle.OVER);
          });
        })));
        it('should accept "side" for content pushing', async(inject([], () => {
          return setup(`<md-sidenav style="side"></md-sidenav>`).then((api: ITestFixture) => {
            expect(api.component.style).toBe(SidenavStyle.SIDE);
          });
        })));
      });

      describe('align', () => {
        it('should default to "left"', async(inject([], () => {
          return setup().then((api: ITestFixture) => {
            expect(api.component.align).toBe(SidenavAlignment.LEFT);
          });
        })));
        it('should set to default when given an invalid value', async(inject([], () => {
          return setup(`<md-sidenav align="up"></md-sidenav>`).then((api: ITestFixture) => {
            expect(api.component.align).toBe(SidenavAlignment.LEFT);
          });
        })));
        it('should accept "side" for content pushing', async(inject([], () => {
          return setup(`<md-sidenav align="right"></md-sidenav>`).then((api: ITestFixture) => {
            expect(api.component.align).toBe(SidenavAlignment.RIGHT);
          });
        })));

      });

      describe('visible', () => {
        it('should accept "true" for content pushing', async(inject([], () => {
          return setup(`<md-sidenav [visible]="true"></md-sidenav>`).then((api: ITestFixture) => {
            expect(api.component.visible).toBe(true);
          });
        })));

      });
    });
    describe('md-sidenav-container', () => {
      let template = `
      <md-sidenav-container>
        <md-sidenav name="menu"></md-sidenav>
        <md-sidenav name="right" align="right"></md-sidenav>
      </md-sidenav-container>`;
      it('should be created and destroyed', async(inject([], () => {
        return setup(template).then((api: ITestFixture) => {
          api.fixture.destroy();
        });
      })));
      it('should maintain a query list of its children', async(inject([], () => {
        return setup(template).then((api: ITestFixture) => {
          expect(api.container.children.length).toBe(2);
          api.fixture.destroy();
        });
      })));
      it('should hide any open children when the backdrop is hidden', async(inject([], () => {
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
      })));
      it('should set isPushed if any child elements are side style', async(inject([], () => {
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
      })));
    });

  });
}

