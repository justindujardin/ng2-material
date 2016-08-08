import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'md-dialog-title',
  template: `<h2 *ngIf="title">{{title}}</h2><ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdDialogTitle {
  @Input() title: string;
}
