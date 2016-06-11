import {Component, ViewEncapsulation} from '@angular/core';
import {MD_TABS_DIRECTIVES} from '@angular2-material/tabs';
import {MATERIAL_DIRECTIVES} from 'ng2-material';

@Component({
  moduleId: module.id,
  selector: 'tabs-dynamic-height',
  templateUrl: 'tabs-dynamic-height.component.html',
  styleUrls: ['tabs-dynamic-height.component.css'],
  directives: [MATERIAL_DIRECTIVES, MD_TABS_DIRECTIVES],
  encapsulation: ViewEncapsulation.None
})
export class TabsDynamicHeightComponent {
}
