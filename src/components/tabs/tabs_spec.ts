import {beforeEach, describe, expect, inject, it, async} from "@angular/core/testing";
import {TestComponentBuilder, ComponentFixture} from "@angular/compiler/testing";
import {Component} from "@angular/core";
import {MdTab, MdTabs, Ink} from "../../index";
import {CORE_DIRECTIVES} from "@angular/common";
import {By} from "@angular/platform-browser";

export function main() {

  interface ITabsFixture {
    fixture: ComponentFixture<TestComponent>;
    tabs: MdTabs;
    tabButtons: HTMLElement[];
  }
  @Component({
    selector: 'test-app',
    directives: [CORE_DIRECTIVES, MdTabs, MdTab],
    template: `
    <md-tabs>
      <template md-tab label="Tab1"><span>Tab1</span></template>
      <template md-tab label="Tab2"><span>Tab2</span></template>
      <template md-tab label="Tab3"><span>Tab3</span></template>
    </md-tabs>`
  })
  class TestComponent {
    selectedIndex: number = 2;
  }

  describe('Tabs', () => {
    let builder: TestComponentBuilder;

    function setup(template: string = null): Promise<ITabsFixture> {
      let prep = template === null ?
        builder.createAsync(TestComponent) :
        builder.overrideTemplate(TestComponent, template).createAsync(TestComponent);
      return prep.then((fixture: ComponentFixture<TestComponent>) => {
        fixture.detectChanges();
        let tabs = <MdTabs>fixture.debugElement.query(By.css('md-tabs')).componentInstance;
        let tabButtons = fixture.debugElement.queryAll(By.css('md-tab-item')).map(b => b.nativeElement);
        return {
          fixture: fixture,
          tabs: tabs,
          tabButtons: tabButtons
        };
      }).catch(console.error.bind(console));
    }

    beforeEach(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    }));

    describe('md-tabs', () => {
      it('should initialize with first tab selected', async(inject([], () => {
        return setup().then((api: ITabsFixture) => {
          expect(api.tabs.selected).toBe(0);
          expect(api.tabs.selectedTab).toBe(null);
        });
      })));
      it('should update selected and selectedTab when changed by clicking on tab buttons', async(inject([], () => {
        return setup().then((api: ITabsFixture) => {
          api.tabButtons[1].click();
          expect(api.tabs.selected).toBe(1);
          expect(api.tabs.selectedTab).not.toBeNull();

          api.tabButtons[0].click();
          expect(api.tabs.selected).toBe(0);
          expect(api.tabs.selectedTab).not.toBeNull();
        });
      })));
      it('should update selectedTab when selected is set', async(inject([], () => {
        return setup().then((api: ITabsFixture) => {
          expect(api.tabs.selectedTab).toBeNull();
          api.tabs.selected = 1;
          expect(api.tabs.selectedTab).not.toBeNull();

          api.tabs.selected = 0;
          expect(api.tabs.selectedTab).not.toBeNull();

          api.tabs.selected = -1;
          expect(api.tabs.selectedTab).toBeNull();
        });
      })));

      it('should bind [selected] to an index', async(inject([], () => {
        let template = `
          <md-tabs [selected]="selectedIndex">
            <template md-tab label="Tab1"><span>Tab1</span></template>
            <template md-tab label="Tab2"><span>Tab2</span></template>
            <template md-tab label="Tab3"><span>Tab3</span></template>
          </md-tabs>`;

        return setup(template).then((api: ITabsFixture) => {
          expect(api.tabs.selected).toBe(2);
        });
      })));

      it('md-tabs should ripple when tab buttons are clicked', async(inject([], () => {
        let template = `
          <md-tabs [selected]="selectedIndex">
            <template md-tab label="Tab1"><span>Tab1</span></template>
          </md-tabs>`;

        return setup(template).then((api: ITabsFixture) => {
          let save = Ink.rippleEvent;
          let fired = false;
          Ink.rippleEvent = () => {
            fired = true;
            return Promise.resolve();
          };
          api.tabButtons[0].click();
          expect(fired).toBe(true);
          Ink.rippleEvent = save;
        });
      })));

      it('md-tabs[md-no-ink] should not ripple when tab buttons are clicked', async(inject([], () => {
        let template = `
          <md-tabs md-no-ink [selected]="selectedIndex">
            <template md-tab label="Tab1"><span>Tab1</span></template>
          </md-tabs>`;

        return setup(template).then((api: ITabsFixture) => {
          let save = Ink.rippleEvent;
          let fired = false;
          Ink.rippleEvent = () => {
            fired = true;
            return Promise.resolve();
          };
          api.tabButtons[0].click();
          expect(fired).toBe(false);
          Ink.rippleEvent = save;
        });
      })));
    });
  });


}

