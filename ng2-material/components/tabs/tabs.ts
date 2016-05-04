import {
  Component,
  Directive,
  Input,
  QueryList,
  ViewContainerRef,
  TemplateRef,
  ViewEncapsulation,
  Query,
  ViewChild,
  ElementRef
} from "angular2/core";
import {Ink} from "../../core/util/ink";
import {NgClass, NgFor} from "angular2/common";

export enum TabPositionType {
    left = 0,
    active = 1,
    right = 2
};

// TODO: behaviors to test
//  - Tabs will become paginated if there isn't enough room for them
//  - You can swipe left and right on a mobile device to change tabs
//  - You can bind the selected tab via the selected attribute on the md-tabs element
//  - If you set the selected tab binding to -1, it will leave no tab selected
//  - If you remove a tab, it will try to select a new one
//  - There's an ink bar that follows the selected tab, you can turn it off if you want
//  - If you set the disabled attribute on a tab, it becomes unselectable
//  - If you set md-theme=\"green\" on the md-tabs element, you'll get green tabs

@Component({
  selector: 'md-ink-bar',
  template: ``
})
export class MdInkBar {
  constructor(private _el: ElementRef) {
  }

  get elementRef(): ElementRef {
    return this._el;
  }
}

@Component({
  selector: 'md-tab',
  template: `
       <md-tab-content role="tabpanel" 
              [ngClass]="{ 'md-active': active, 'md-left': left, 'md-right': right, 'md-no-scroll': mdNoScroll }">
         <ng-content></ng-content>
       </md-tab-content>
  `,
  directives: [NgClass]
})
export class MdTab {
  @Input()
  label: string;
  @Input()
  disabled: boolean = false;
  @Input()
  mdNoScroll: boolean = false;
  private _position: TabPositionType = TabPositionType.right;

  constructor() {
  }

  get active(): boolean {
    return this._position === TabPositionType.active;
  }

  get position() {
    return this._position;
  }
  
  set position(value: TabPositionType) {
    this._position = value;
  }
  
  get left(): boolean {
    return this._position === TabPositionType.left;
  }

  get right(): boolean {
    return this._position === TabPositionType.right;
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
    <md-tabs-content-wrapper [class.md-no-scroll]="mdNoScroll">
          <ng-content></ng-content>
    </md-tabs-content-wrapper>`,
  directives: [NgFor, MdInkBar, MdTab],
  properties: ['selected'],
  encapsulation: ViewEncapsulation.None
})
export class MdTabs {
  @ViewChild(MdInkBar)
  inkBarComponent: MdInkBar;

  @Input()
  mdNoScroll: boolean = false;

  constructor(@Query(MdTab)
              public panes: QueryList<MdTab>,
              private _element: ElementRef) {
    this.panes.changes.subscribe((_) => {
      let tabs = this.panes.toArray();
      this.markSelected(tabs, tabs[this._selected], this._selected);
    });
  } 

  private _selected: number = 0;
  get selected(): number {
    return this._selected;
  }

  private markSelected(panes: MdTab[], newSelected: MdTab, lastSelectedIndex: number) {
      let position = TabPositionType.left;
      panes.forEach((p: MdTab, index: number) => {
        if (p === newSelected) {
          Ink.updateInkbar(this._element.nativeElement, 
                    this.inkBarComponent.elementRef.nativeElement, 
                    index,
                    lastSelectedIndex);
          p.position = TabPositionType.active;
          position = TabPositionType.right;        
        } else {
          p.position = position;
        }
      });
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
    this.panes.toArray().some((p: MdTab, index: number) => {
      if (p.active) {
        result = p;
        return true;
      }
      return false;
    });
    return result;
  }

  set selectedTab(value: MdTab) {
    this.markSelected(this.panes.toArray(), value, this._selected);
  }

  onTabClick(pane: MdTab, event?) {
    let initialSelect = this._selected;
    
    if (event && Ink.canApply(this._element.nativeElement)) {
      Ink.rippleEvent(event.target, event);
    }
    this.selectedTab = pane;
  }
}
