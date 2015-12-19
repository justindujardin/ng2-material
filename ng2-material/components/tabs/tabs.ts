import {Component, Directive, Input, QueryList,
  ViewContainerRef, TemplateRef, ContentChildren} from 'angular2/core';
import {AfterContentInit} from "angular2/core";
import {Attribute} from "angular2/core";
@Directive({
  selector: '[md-tab]'
})
export class MdTab {
  @Input() label: string;
  private _active: boolean = false;

  constructor(public viewContainer: ViewContainerRef,
              public templateRef: TemplateRef) {
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
  templateUrl: 'ng2-material/components/tabs/tabs.html'
})
export class MdTabs implements AfterContentInit {
  @ContentChildren(MdTab) panes: QueryList<MdTab>;

  constructor(@Attribute('mdNoScroll') private _mdNoScroll: string) {
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

  ngAfterContentInit(): any {
    setTimeout(()=> {
      if (this._selectedIndex === -1) {
        this.select(this.panes.toArray()[0]);
      }
    }, 0);
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
}
