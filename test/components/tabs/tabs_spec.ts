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


export function main() {

  interface ITabsFixture {
    fixture:ComponentFixture;
    tabs:MdTabs;
    tabButtons:HTMLElement[];
  }
  @Component({selector: 'test-app'})
  @View({
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
      return prep.then((fixture: ComponentFixture) => {
        fixture.detectChanges();
        let tabs = <MdTabs>findChildByTag(fixture.debugElement, 'md-tabs').componentInstance;
        let tabButtons = findChildrenByTag(fixture.debugElement, 'md-tab-item').map(b => b.nativeElement);
        return {
          fixture: fixture,
          tabs: tabs,
          tabButtons: tabButtons
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

    describe('md-tabs', () => {
      it('should initialize with first tab selected', inject([AsyncTestCompleter], (async) => {
        setup().then((api: ITabsFixture) => {
          expect(api.tabs.selected).toBe(0);
          expect(api.tabs.selectedTab).toBe(null);
          async.done();
        });
      }));
      it('should update selected and selectedTab when changed by clicking on tab buttons', inject([AsyncTestCompleter], (async) => {
        setup().then((api: ITabsFixture) => {
          api.tabButtons[1].click();
          expect(api.tabs.selected).toBe(1);
          expect(api.tabs.selectedTab).not.toBeNull();

          api.tabButtons[0].click();
          expect(api.tabs.selected).toBe(0);
          expect(api.tabs.selectedTab).not.toBeNull();
          async.done();
        });
      }));
      it('should update selectedTab when selected is set', inject([AsyncTestCompleter], (async) => {
        setup().then((api: ITabsFixture) => {
          expect(api.tabs.selectedTab).toBeNull();
          api.tabs.selected = 1;
          expect(api.tabs.selectedTab).not.toBeNull();

          api.tabs.selected = 0;
          expect(api.tabs.selectedTab).not.toBeNull();

          api.tabs.selected = -1;
          expect(api.tabs.selectedTab).toBeNull();

          async.done();
        });
      }));

      it('should bind [selected] to an index', inject([AsyncTestCompleter], (async) => {
        let template = `
          <md-tabs [selected]="selectedIndex">
            <template md-tab label="Tab1"><span>Tab1</span></template>
            <template md-tab label="Tab2"><span>Tab2</span></template>
            <template md-tab label="Tab3"><span>Tab3</span></template>
          </md-tabs>`;

        setup(template).then((api: ITabsFixture) => {
          expect(api.tabs.selected).toBe(2);
          async.done();
        });
      }));

      it('md-tabs[md-no-ink] should not ripple', inject([AsyncTestCompleter], (async) => {
        let template = `
          <md-tabs md-no-ink [selected]="selectedIndex">
            <template md-tab label="Tab1"><span>Tab1</span></template>
          </md-tabs>`;

        setup(template).then((api: ITabsFixture) => {
          let save = Ink.rippleEvent;
          let fired = false;
          Ink.rippleEvent = () => {
            fired = true;
            return Promise.resolve();
          };
          api.tabButtons[0].click();
          expect(fired).toBe(false);
          Ink.rippleEvent = save;
          async.done();
        });
      }));
    });
  });


}

