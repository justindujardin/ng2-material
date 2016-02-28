import {View, Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES, Media, SidenavService} from 'ng2-material/all';


@Component({
  selector: 'sidenav-basic-usage',
  providers: [SidenavService]
})
@View({
  templateUrl: 'examples/components/sidenav/basic_usage.html',
  directives: [MATERIAL_DIRECTIVES]
})
export default class SidenavBasicUsage {

  constructor(public sidenav: SidenavService) {

  }

  hasMedia(breakSize: string): boolean {
    return Media.hasMedia(breakSize);
  }

  open(name: string) {
    this.sidenav.show(name);
  }

  close(name: string) {
    this.sidenav.hide(name);
  }
}
