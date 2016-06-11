import {Component, ViewEncapsulation, Input} from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material';
import {MD_TABS_DIRECTIVES} from '@angular2-material/tabs';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';

export interface ITabData {
  title: string;
  content: string;
  disabled?: boolean;
}

@Component({
  moduleId: module.id,
  selector: 'tabs-dynamic-tabs',
  templateUrl: 'tabs-dynamic-tabs.component.html',
  styleUrls: ['tabs-dynamic-tabs.component.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [MATERIAL_DIRECTIVES, MD_TABS_DIRECTIVES, MD_INPUT_DIRECTIVES]
})
export class TabsDynamicTabsComponent {
  public tabs: ITabData[] = [
    {title: 'One', content: 'You can add tabs dynamically by filling in the form below this.'}, {
      title: 'Two',
      content: 'You can bind the selected tab via the selected attribute on the md-tabs element.'
    },
    {
      title: 'Three',
      content: 'If you look at the source, you\'re using tabs to look at a demo for tabs. Recursion!'
    }
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
    view = view || title + ' Content View';
    this.tabs.push({title: title, content: view, disabled: false});
  }

  removeTab(tab: ITabData) {
    var index = this.tabs.indexOf(tab);
    this.tabs.splice(index, 1);
    this.selectedIndex = Math.min(index, this.tabs.length - 1);
  }
}
