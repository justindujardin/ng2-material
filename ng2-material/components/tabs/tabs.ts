import {Component, Directive, Input, QueryList,
  ViewContainerRef, TemplateRef, ContentChildren} from 'angular2/core';
@Directive({
  selector: '[md-tab]'
})
export class MdTab {
  @Input() title: string;
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
export class MdTabs {
  @ContentChildren(MdTab) panes: QueryList<MdTab>;

  select(pane: MdTab) {
    this.panes.toArray().forEach((p: MdTab) => p.active = p == pane);
  }
}
