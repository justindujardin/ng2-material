import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {MdPeekaboo} from '../../index';
import {By} from '@angular/platform-browser';
import {MdServicesModule} from '../../core/util/util.module';


interface IPeekabooFixture {
  fixture: ComponentFixture<TestComponent>;
  peek: MdPeekaboo;
  debug: DebugElement;
}

@Component({
  selector: 'test-app',
  template: `<div md-peekaboo></div>`
})
class TestComponent {
  hideBinding: string = 'hide';
  showBinding: string = 'show';
  sizeBinding: number = 50;
}

describe('Peekaboo', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MdPeekaboo,
        TestComponent
      ],
      imports: [MdServicesModule],
      providers: []
    });
  });

  function setup(template: string = null): Promise<IPeekabooFixture> {
    if (template) {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: template
        }
      });
    }
    return TestBed.compileComponents()
      .then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        let debug = fixture.debugElement.query(By.directive(MdPeekaboo));
        let component = debug.injector.get(MdPeekaboo) as MdPeekaboo;
        return {
          fixture: fixture,
          peek: component,
          debug: debug
        };
      })
      .catch(error => console.error.bind(console));
  }


  describe('[md-peekaboo]', () => {
    it('should be inactive by default', async(() => {
      return setup().then((api: IPeekabooFixture) => {
        expect(api.peek.active).toBe(false);
        api.fixture.destroy();
      });
    }));

    describe('breakAction', () => {
      it('should be undefined by default', async(() => {
        return setup().then((api: IPeekabooFixture) => {
          expect(api.peek.breakAction).toBeUndefined();
        });
      }));

      it('should be set by attribute', async(() => {
        return setup(`<div md-peekaboo breakAction="show"></div>`).then((api: IPeekabooFixture) => {
          expect(api.peek.breakAction).toBe('show');
        });
      }));

      it('should be set by binding', async(() => {
        return setup(`<div md-peekaboo [breakAction]="hideBinding"></div>`).then((api: IPeekabooFixture) => {
          expect(api.peek.breakAction).toBe('hide');
        });
      }));
    });

    ['breakXs', 'breakSm', 'breakMd', 'breakLg', 'breakXl'].forEach((size: string) => {
      describe(size, () => {
        it('should be -1 by default', async(() => {
          return setup().then((api: IPeekabooFixture) => {
            expect(api.peek[size]).toBe(-1);
          });
        }));

        it('should be set by attribute', async(() => {
          return setup(`<div md-peekaboo ${size}="25"></div>`).then((api: IPeekabooFixture) => {
            expect(api.peek[size]).toBe(25);
          });
        }));

        it('should be set by binding', async(() => {
          return setup(`<div md-peekaboo [${size}]="sizeBinding"></div>`).then((api: IPeekabooFixture) => {
            expect(api.peek[size]).toBe(50);
          });
        }));

        it('should work with all breakpoint sizes', async(() => {
          return setup(`<div md-peekaboo [${size}]="sizeBinding"></div>`).then((api: IPeekabooFixture) => {
            MdPeekaboo.SIZES.forEach((s: string) => {
              api.peek.breakpoint = s;
            });
          });
        }));
      });

    });
  });
});
