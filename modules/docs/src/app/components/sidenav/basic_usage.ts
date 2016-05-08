import {Component} from '@angular/core';
import {MATERIAL_DIRECTIVES, Media, SidenavService} from 'ng2-material';


@Component({
  selector: 'sidenav-basic-usage',
  templateUrl: 'src/components/sidenav/basic_usage.html',
  directives: [MATERIAL_DIRECTIVES],
  providers: [SidenavService]
})
export default class SidenavBasicUsage {
  constructor(public sidenav: SidenavService, public media: Media) {}

  hasMedia(breakSize: string): boolean { return this.media.hasMedia(breakSize); }

  open(name: string) { this.sidenav.show(name); }

  close(name: string) {
    if (this.sidenav.find(name)) {
      this.sidenav.hide(name);
    }
  }
}
