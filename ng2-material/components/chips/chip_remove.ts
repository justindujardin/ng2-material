import {Directive, TemplateRef} from "angular2/core";
import {TemplatePortalDirective} from "@angular2-material/core";

@Directive({
  selector: '[md-chip-remove]'
})
export class MdChipRemove extends TemplatePortalDirective {
  constructor(templateRef: TemplateRef) {
    super(templateRef);
  }
}
