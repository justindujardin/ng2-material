import {Component} from '@angular/core';
import {MATERIAL_DIRECTIVES, Media} from 'ng2-material';


@Component({
  moduleId: module.id,
  selector: 'sidenav-basic-usage',
  templateUrl: 'basic_usage.html',
  directives: [MATERIAL_DIRECTIVES]
})
export default class SidenavBasicUsage {
  constructor(public media: Media) {}

  hasMedia(breakSize: string): boolean { return this.media.hasMedia(breakSize); }
}
