import {describe, it, beforeEach, expect, inject, async} from '@angular/core/testing';
import {MATERIAL_DIRECTIVES} from '../../index';
import {Component} from '@angular/core';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {promiseWait} from '../../platform/testing/util';
import {Ink} from './ink';
import {By} from "@angular/platform-browser";

export function main() {

  const defaultTemplate = `<div md-ink></div>`;

  @Component({
    selector: 'ink-test-component',
    directives: [MATERIAL_DIRECTIVES],
    template: defaultTemplate
  })
  class TestComponent {
  }

  describe('Ink', () => {
    let builder: TestComponentBuilder;
    let _api: ComponentFixture<TestComponent> = null;

    function setup(template: string = defaultTemplate): Promise<ComponentFixture<TestComponent>> {
      return builder
        .overrideTemplate(TestComponent, template)
        .createAsync(TestComponent)
        .then((fixture: ComponentFixture<TestComponent>) => {
          fixture.detectChanges();
          _api = fixture;
          return fixture;
        }).catch(console.error.bind(console));
    }

    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    afterEach(() => {
      _api.destroy();
    });

    describe('canApply', () => {
      it('should return true if element does not have md-no-ink attribute', async(() => {
        setup(`<div></div>`)
          .then((api: ComponentFixture<TestComponent>) => {
            const el = api.debugElement.query(By.css('div'));
            expect(Ink.canApply(el.nativeElement)).toBe(true);
          });
      }));
      it('should return true if element does not have md-no-ink attribute', async(() => {
        setup(`<div md-no-ink></div>`)
          .then((api: ComponentFixture<TestComponent>) => {
            const el = api.debugElement.query(By.css('div'));
            expect(Ink.canApply(el.nativeElement)).toBe(false);
          });
      }));
    });

    describe('ripple', () => {
      it('should ripple and resolve when the ink animation is done', async(() => {
        setup(`<div></div>`)
          .then((api: ComponentFixture<TestComponent>) => {
            const el = api.debugElement.query(By.css('div'));
            Ink.ripple(el.nativeElement, 0, 0).then(() => {
              // Second time for conditional that already has an ink ripple container
              Ink.ripple(el.nativeElement, 0, 0);
            });
          });
      }));
    });
  });
}
