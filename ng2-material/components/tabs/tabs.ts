import {Component, Directive, Input, QueryList,
  ViewContainerRef, TemplateRef, ContentChildren} from 'angular2/core';
import {AfterContentInit} from "angular2/core";
import {Attribute} from "angular2/core";
import {isPresent} from "angular2/src/facade/lang";
import {OnChanges} from "angular2/core";
import {Ink} from "../../core/util/ink";
import {ElementRef} from "angular2/core";
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
  templateUrl: 'ng2-material/components/tabs/tabs.html'
})
export class MdTabs implements AfterContentInit, OnChanges {
  @ContentChildren(MdTab) panes: QueryList<MdTab>;

  @Input() mdNoScroll: boolean = false;

  constructor(private _element: ElementRef,
              @Attribute('mdNoScroll') noScroll: string) {
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

  clickTabButton(pane: MdTab, event?) {
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

  ngOnChanges(changes: {}): any {

  }

}
