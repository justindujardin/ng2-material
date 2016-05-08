import {Component, ViewEncapsulation} from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material';

@Component({
  moduleId: module.id,
  selector: 'tabs-dynamic-height',
  templateUrl: 'dynamic_height.html',
  styleUrls: ['dynamic_height.css'],
  directives: [MATERIAL_DIRECTIVES],
  encapsulation: ViewEncapsulation.None
})
export default class TabsDynamicHeight {
}
