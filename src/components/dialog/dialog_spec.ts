import {componentSanityCheck, promiseWait} from '../../platform/testing/util';
import {OVERLAY_PROVIDERS, Overlay} from '@angular2-material/core/overlay/overlay';
import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {async, inject, beforeEach, addProviders, it} from '@angular/core/testing';
import {MdDialog} from './dialog';
import {MATERIAL_BROWSER_PROVIDERS} from '../../index';

export function main() {
  let template = `
  <md-dialog>
    <md-dialog-title>Title</md-dialog-title>
    Content!
  </md-dialog>`;
  componentSanityCheck('Dialog', 'md-dialog', template);

  describe('Dialog', () => {
    let builder: TestComponentBuilder;
    let fixture: ComponentFixture<MdDialogComponentTest>;

    beforeEach(addProviders([
      Overlay,
      OVERLAY_PROVIDERS,
      MATERIAL_BROWSER_PROVIDERS
    ]));

    beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      builder = tcb;
    }));

    beforeEach(async(() => {
      builder.createAsync(MdDialogComponentTest).then(f => {
        fixture = f;
        fixture.detectChanges();
      });
    }));

    describe('show', () => {
      it('(onShow) emits after dialog is shown', async(() => {
        let tc: MdDialogComponentTest = fixture.debugElement.componentInstance;
        let called = false;
        let sub = tc.dialog.onShow.subscribe(() => called = true);
        return tc.dialog.show().then(() => promiseWait()).then(() => {
          sub.unsubscribe();
          expect(called).toBe(true);
          return tc.dialog.close();
        });
      }));
    });
    describe('close', () => {
      it('dialog result is undefined if called with no arguments', async(() => {
        let tc: MdDialogComponentTest = fixture.debugElement.componentInstance;
        let result: any = 1337;
        let sub = tc.dialog.onClose.subscribe((r: any) => result = r);
        return tc.dialog.show()
          .then(() => tc.dialog.close())
          .then(() => promiseWait())
          .then(() => {
            sub.unsubscribe();
            expect(result).toBeUndefined();
          });
      }));
      it('(onClose) emits after dialog is closed and cancel = false', async(() => {
        let tc: MdDialogComponentTest = fixture.debugElement.componentInstance;
        let result: any;
        let sub = tc.dialog.onClose.subscribe((r) => result = r);
        return tc.dialog.show()
          .then(() => tc.dialog.close(1337, false))
          .then(() => promiseWait())
          .then(() => {
            sub.unsubscribe();
            expect(result).toBe(1337);
          });
      }));
      it('(onCancel) emits after dialog is closed and cancel = true', async(() => {
        let tc: MdDialogComponentTest = fixture.debugElement.componentInstance;
        let result: any;
        let sub = tc.dialog.onCancel.subscribe((r) => result = r);
        return tc.dialog.show()
          .then(() => tc.dialog.close('test', true))
          .then(() => promiseWait())
          .then(() => {
            sub.unsubscribe();
            expect(result).toBe('test');
          });
      }));
    });
  });


  @Component({
    template: `
<md-dialog>
  <md-dialog-title>Title</md-dialog-title>
  Content!
</md-dialog>`,
    directives: [MdDialog],
  })
  class MdDialogComponentTest {
    @ViewChild(MdDialog) dialog: MdDialog;
  }

}

