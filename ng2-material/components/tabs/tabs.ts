import {
  Component, Directive, Input, QueryList, Attribute, AfterContentInit,
  ViewContainerRef, TemplateRef, ContentChildren
} from 'angular2/core';
import {isPresent} from "angular2/src/facade/lang";
import {Ink} from "../../core/util/ink";
import {ViewEncapsulation} from "angular2/core";


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
  @Input() label: string;
  @Input() disabled: boolean = false;
  private _active: boolean = false;

  constructor(public viewContainer: ViewContainerRef,
              @Attribute('disabled') disabled: string,
              public templateRef: TemplateRef) {
    this.disabled = isPresent(disabled);
  }

  @Input() set active(active: boolean) {
    if (active == this._active) return;
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
  templateUrl: 'ng2-material/components/tabs/tabs.html',
  encapsulation: ViewEncapsulation.None
})
export class MdTabs implements AfterContentInit {
  @ContentChildren(MdTab) panes: QueryList<MdTab>;

  @Input() mdNoScroll: boolean = false;

  constructor(@Attribute('mdNoScroll') noScroll: string) {
    this.mdNoScroll = isPresent(noScroll);
  }

  private _selectedIndex: number = -1;
  get selectedIndex(): number {
    return this._selectedIndex;
  }

  set selectedIndex(value: number) {
    let panes = this.panes.toArray();
    if (value > 0 && value < panes.length) {
      this.select(panes[value]);
      this._selectedIndex = value;
    }
  }

  get selected(): MdTab {
    let result = null;
    this.panes.toArray().forEach((p: MdTab) => {
      if (p.active) {
        result = p;
      }
    });
    return result;
  }

  select(pane: MdTab) {
    this.panes.toArray().forEach((p: MdTab) => p.active = p == pane);
  }

  onTabClick(pane: MdTab, event?) {
    if (event && Ink.canApply(event.target)) {
      Ink.rippleEvent(event.target, event);
    }
    this.select(pane);
  }

  ngAfterContentInit(): any {
    setTimeout(()=> {
      if (this._selectedIndex === -1) {
        this.select(this.panes.toArray()[0]);
      }
    }, 0);
  }
}
