import {View, Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from '../../base';
import {Input} from "angular2/core";

export interface ITabData {
  title:string;
  content:string;
  disabled?:boolean;
}

@Component({selector: 'tabs-dynamic-tabs'})
@View({
  templateUrl: 'examples/components/tabs/dynamic_tabs.html',
  styleUrls: ['examples/components/tabs/dynamic_tabs.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class TabsDynamicTabs {
  public tabs: ITabData[] = [
    {title: 'One', content: "TODO: Tabs will become paginated if there isn't enough room for them."},
    {title: 'Two', content: "TODO: You can swipe left and right on a mobile device to change tabs."},
    {title: 'Three', content: "You can bind the selected tab via the selected attribute on the md-tabs element."},
    {title: 'Four', content: "If you set the selected tab binding to -1, it will leave no tab selected."},
    {title: 'Five', content: "If you remove a tab, it will try to select a new one."},
    {title: 'Six', content: "TODO: There's an ink bar that follows the selected tab, you can turn it off if you want."},
    {title: 'Seven', content: "If you set the disabled attribute on a tab, it becomes unselectable."},
    {title: 'Eight', content: "If you look at the source, you're using tabs to look at a demo for tabs. Recursion!"},
    {title: 'Nine', content: "TODO: If you set md-theme=\"green\" on the md-tabs element, you'll get green tabs."}
  ];

  selected = null;
  previous = null;

  private _selectedIndex: number = 0;
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
  }

}
