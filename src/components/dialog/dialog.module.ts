import {MdDialog} from './dialog';
import {MdDialogPortal} from './dialog-portal';
import {MdDialogActions} from './dialog-actions';
import {MdDialogTitle} from './dialog-title';
import {MdCoreModule} from '@angular/material';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

const DIALOG_DIRECTIVES = [
  MdDialog, MdDialogTitle, MdDialogActions, MdDialogPortal
];
@NgModule({
  declarations: DIALOG_DIRECTIVES,
  exports: DIALOG_DIRECTIVES,
  imports: [
    CommonModule,
    MdCoreModule
  ]
})
export class MdDialogModule {
}
