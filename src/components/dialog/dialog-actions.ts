import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {MdDialog} from './dialog';

@Component({
  selector: 'md-dialog-actions',
  template: `
  <button *ngIf="cancel" md-button type="button" (click)="dialog.close(false)">
    <span>{{ cancel }}</span>
  </button>
  <button *ngIf="ok" md-button class="md-primary" type="button" (click)="dialog.close(true)">
    <span>{{ ok }}</span>
  </button> 
  <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdDialogActions {
  @Input() cancel: string;
  @Input() ok: string;
  @Input() dialog: MdDialog;
}
