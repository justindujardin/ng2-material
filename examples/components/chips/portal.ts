import {Component, AfterViewInit, QueryList, ViewChildren} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {TemplatePortalDirective, PortalHostDirective, Portal, ComponentPortal} from "@angular2-material/core";

@Component({
  selector: 'chips-portal',
  templateUrl: 'examples/components/chips/portal.html',
  styleUrls: ['examples/components/chips/portal.css'],
  directives: [MATERIAL_DIRECTIVES, TemplatePortalDirective, PortalHostDirective]
})
export default class ChipsPortal {
  @ViewChildren(TemplatePortalDirective) templatePortals: QueryList<Portal<any>>; 

  selectedPortal: Portal<any>;

  get programmingJoke() {
    return this.templatePortals.first;
  }

  get mathJoke() {
    return this.templatePortals.last;
  }

  get scienceJoke() {
    return new ComponentPortal(ScienceJoke);
  }
}

@Component({
  selector: 'science-joke',
  template: `<p> 100 kilopascals go into a bar. </p>`
})
class ScienceJoke { }
