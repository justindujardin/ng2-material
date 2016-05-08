import {Component, Input, ChangeDetectionStrategy} from "@angular/core";


@Component({
  selector: 'md-dialog-title',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdDialogTitle {
}

@Component({
  selector: 'md-dialog-actions',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdDialogActions {
}


@Component({
  selector: 'md-dialog',
  directives: [MdDialogTitle, MdDialogActions],
  template: `<md-dialog-title><h2 class="md-title">{{ title }}</h2></md-dialog-title>
<md-dialog-actions>
  <button *ngIf="cancel != ''" md-button type="button" (click)="dialog.close(false)">
    <span>{{ cancel }}</span>
  </button>
  <button *ngIf="ok != ''" md-button class="md-primary" type="button" (click)="dialog.close(true)">
    <span>{{ ok }}</span>
  </button>
</md-dialog-actions>
<ng-content select="md-dialog-title"></ng-content>
<ng-content></ng-content>
<ng-content select="md-dialog-actions"></ng-content>
`
})
export class MdDialog {
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() cancel: string = '';
  @Input() ok: string = '';

  show(): Promise<MdDialog> {
    return Promise.resolve(null);
  }
}
