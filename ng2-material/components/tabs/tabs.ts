import {
  Component,
  Directive,
  Input,
  QueryList,
  ViewContainerRef,
  TemplateRef,
  ViewEncapsulation,
  Query,
  ElementRef
} from "angular2/core";
import {Ink} from "../../core/util/ink";
import {NgFor} from "angular2/common";


// TODO: behaviors to test
//  - Tabs will become paginated if there isn't enough room for them
//  - You can swipe left and right on a mobile device to change tabs
//  - You can bind the selected tab via the selected attribute on the md-tabs element
//  - If you set the selected tab binding to -1, it will leave no tab selected
//  - If you remove a tab, it will try to select a new one
//  - There's an ink bar that follows the selected tab, you can turn it off if you want
//  - If you set the disabled attribute on a tab, it becomes unselectable
//  - If you set md-theme=\"green\" on the md-tabs element, you'll get green tabs


@Directive({
  selector: '[md-tab]'
})
export class MdTab {
  @Input()
  label: string;
  @Input()
  disabled: boolean = false;
  private _active: boolean = false;

  constructor(public viewContainer: ViewContainerRef,
              public templateRef: TemplateRef) {
  }

  @Input() set active(active: boolean) {
    if (active == this._active) {
      return;
    }
    this._active = active;
    if (active) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.remove(0);
    }
  }

  get active(): boolean {
    return this._active;
  }
}

@Component({
  selector: 'md-tabs',
  template: `
    <md-tabs-wrapper>
      <md-tab-data></md-tab-data>
      <md-tabs-canvas role="tablist">
        <md-pagination-wrapper>
          <template ngFor [ngForOf]="panes" #pane="$implicit" #index="i">
          <md-tab-item tabindex="-1"
                       class="md-tab"
                       (click)="onTabClick(pane,$event)"
                       [class.md-active]="selectedTab == pane"
                       [disabled]="pane.disabled"
                       [style.max-width]="maxTabWidth + 'px'"
                       role="tab">
            {{pane.label}}
          </md-tab-item>
          </template>
          <md-ink-bar></md-ink-bar>
        </md-pagination-wrapper>
      </md-tabs-canvas>
    </md-tabs-wrapper>
    <md-tabs-content-wrapper>
      <md-tab-content role="tabpanel" class="md-active"
                      [class.md-no-scroll]="mdNoScroll">
        <ng-content></ng-content>
      </md-tab-content>
    </md-tabs-content-wrapper>`,
  directives: [NgFor],
  properties: ['selected'],
  encapsulation: ViewEncapsulation.None
})
export class MdTabs {

  @Input()
  mdNoScroll: boolean = false;

  constructor(@Query(MdTab)
              public panes: QueryList<MdTab>,
              private _element: ElementRef) {
    this.panes.changes.subscribe((_) => {
      this.panes.toArray().forEach((p: MdTab, index: number) => {
        p.active = index === this._selected;
      });
    });
  }

  private _selected: number = 0;
  get selected(): number {
    return this._selected;
  }

  @Input()
  set selected(index: number) {
    let panes = this.panes.toArray();
    let pane = null;
    if (index >= 0 && index < panes.length) {
      pane = panes[index];
    }
    this.selectedTab = pane;
    this._selected = index;
  }

  get selectedTab(): MdTab {
    let result = null;
    this.panes.toArray().forEach((p: MdTab) => {
      if (p.active) {
        result = p;
      }
    });
    return result;
  }

  set selectedTab(value: MdTab) {
    this.panes.toArray().forEach((p: MdTab, index: number) => {
      p.active = p == value;
      if (p.active) {
        this._selected = index;
      }
    });
  }

  onTabClick(pane: MdTab, event?) {
    if (event && Ink.canApply(this._element.nativeElement)) {
      Ink.rippleEvent(event.target, event);
    }
    this.selectedTab = pane;
  }
}
