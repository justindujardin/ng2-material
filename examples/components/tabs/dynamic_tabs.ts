import {Component, Input, ViewEncapsulation} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

export interface ITabData {
  title: string;
  content: string;
  disabled?: boolean;
}

@Component({
  selector: 'tabs-dynamic-tabs',
  properties: ['selectedIndex'],
  templateUrl: 'examples/components/tabs/dynamic_tabs.html',
  styleUrls: ['examples/components/tabs/dynamic_tabs.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [MATERIAL_DIRECTIVES]
})
export default class TabsDynamicTabs {
  public tabs: ITabData[] = [
    {title: 'One', content: "You can add tabs dynamically by filling in the form below this."},
    {title: 'Two', content: "You can bind the selected tab via the selected attribute on the md-tabs element."},
    {title: 'Three', content: "If you look at the source, you're using tabs to look at a demo for tabs. Recursion!"}
  ];

  selected = null;
  previous = null;

  private _selectedIndex: number = 1;
  @Input()
  set selectedIndex(value: number) {
    this.previous = this.selected;
    this.selected = this.tabs[value];
    this._selectedIndex = value;
  }

  get selectedIndex(): number {
    return this._selectedIndex;
  }

  addTab(title, view) {
    view = view || title + " Content View";
    this.tabs.push({title: title, content: view, disabled: false});
  }

  removeTab(tab: ITabData) {
    var index = this.tabs.indexOf(tab);
    this.tabs.splice(index, 1);
    this.selectedIndex = Math.min(index, this.tabs.length-1);
  }

}
