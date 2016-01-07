import {NgIf} from "angular2/common";
import {MdButton} from "../button/button";
import {View} from "angular2/core";
import {Component} from "angular2/core";
import {MdDialogRef} from "./dialog_ref";
import {Input} from "angular2/core";

@Component({selector: 'md-dialog-basic'})
@View({
  template: `
  <h2 class="md-title">{{ title }}</h2>
  <p>{{ textContent }}</p>
  <md-dialog-actions>
    <button md-button *ngIf="cancel != ''" type="button" (click)="dialog.close(false)">
      <span>{{ cancel }}</span>
    </button>
    <button md-button *ngIf="ok != ''" class="md-primary" type="button" (click)="dialog.close(true)">
      <span>{{ ok }}</span>
    </button>
  </md-dialog-actions>`,
  directives: [MdButton, NgIf]
})
export class MdDialogBasic {
  @Input() title: string = '';
  @Input() textContent: string = '';
  @Input() cancel: string = '';
  @Input() ok: string = '';
  @Input() type: string = 'alert';

  constructor(public dialog: MdDialogRef) {
  }
}
