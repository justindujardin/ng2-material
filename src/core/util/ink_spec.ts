import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {Ink} from './ink';
import {By} from '@angular/platform-browser';


const defaultTemplate = `<div md-ink></div>`;

@Component({
  selector: 'ink-test-component',
  template: defaultTemplate
})
class TestComponent {
}

describe('Ink', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ],
      providers: []
    });
  });

  function setup(template: string = null): Promise<ComponentFixture<TestComponent>> {
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
        return fixture;
      })
      .catch(error => console.error.bind(console));
  }

  describe('canApply', () => {
    it('should return true if element does not have md-no-ink attribute', () => {
      setup(`<div></div>`)
        .then((api: ComponentFixture<TestComponent>) => {
          const el = api.debugElement.query(By.css('div'));
          expect(Ink.canApply(el.nativeElement)).toBe(true);
        });
    });

    it('should return true if element does not have md-no-ink attribute', () => {
      setup(`<div md-no-ink></div>`)
        .then((api: ComponentFixture<TestComponent>) => {
          const el = api.debugElement.query(By.css('div'));
          expect(Ink.canApply(el.nativeElement)).toBe(false);
        });
    });
  });

  describe('ripple', () => {
    it('should ripple and resolve when the ink animation is done', () => {
      setup(`<div></div>`)
        .then((api: ComponentFixture<TestComponent>) => {
          const el = api.debugElement.query(By.css('div'));
          Ink.ripple(el.nativeElement, 0, 0).then(() => {
            // Second time for conditional that already has an ink ripple container
            Ink.ripple(el.nativeElement, 0, 0);
          });
        });
    });
  });
});
