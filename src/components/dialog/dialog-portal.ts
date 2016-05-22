import {Directive, ViewContainerRef, TemplateRef} from '@angular/core';
import {TemplatePortalDirective} from '@angular2-material/core';

@Directive({selector: '[mdDialogPortal]'})
export class MdDialogPortal extends TemplatePortalDirective {
  constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    super(templateRef, viewContainerRef);
  }
}
