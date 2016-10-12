import {componentSanityCheck, promiseWait} from '../../platform/testing/util';
import {async, TestBed} from '@angular/core/testing';
import {MATERIAL_BROWSER_PROVIDERS} from '../../index';
import {MdServicesModule} from '../../core/util/util.module';
import {Component, ViewChild} from '@angular/core';
import {MdDialog} from './dialog';
import {ComponentFixture} from '@angular/core/testing/component_fixture';
import {MdDialogModule} from './dialog.module';

const template = `
  <md-dialog>
    <md-dialog-title>Title</md-dialog-title>
    Content!
  </md-dialog>`;
componentSanityCheck('Dialog', 'md-dialog', template);

describe('Dialog', () => {
  @Component({
    template: `
<md-dialog>
  <md-dialog-title>Title</md-dialog-title>
  Content!
</md-dialog>`,
  })
  class MdDialogComponentTest {
    @ViewChild(MdDialog) dialog: MdDialog;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MdDialogComponentTest],
      imports: [MdServicesModule, MdDialogModule],
      providers: [MATERIAL_BROWSER_PROVIDERS]
    });
  });

  function setup(): Promise<ComponentFixture<MdDialogComponentTest>> {
    return TestBed.compileComponents()
      .then(() => {
        const fixture = TestBed.createComponent(MdDialogComponentTest);
        fixture.detectChanges();
        return fixture.whenStable().then(() => fixture);
      })
      .catch(error => {
        console.error(error);
      });
  }

  describe('show', () => {
    it('(onShow) emits after dialog is shown', async(() => {
      setup().then((fixture: ComponentFixture<MdDialogComponentTest>) => {
        let tc: MdDialogComponentTest = fixture.componentInstance;
        let called = false;
        let sub = tc.dialog.onShow.subscribe(() => called = true);
        return tc.dialog.show().then(() => promiseWait()).then(() => {
          sub.unsubscribe();
          expect(called).toBe(true);
          return tc.dialog.close();
        });
      });
    }));
  });
  describe('close', () => {
    it('dialog result is true if called with no arguments', async(() => {
      setup().then((fixture: ComponentFixture<MdDialogComponentTest>) => {
        let tc: MdDialogComponentTest = fixture.componentInstance;
        let result: any = 1337;
        let sub = tc.dialog.onClose.subscribe((r: any) => result = r);
        return tc.dialog.show()
          .then(() => tc.dialog.close())
          .then(() => promiseWait())
          .then(() => {
            sub.unsubscribe();
            expect(result).toBe(true);
          });

      });

    }));
    it('(onClose) emits after dialog is closed and cancel = false', async(() => {
      setup().then((fixture: ComponentFixture<MdDialogComponentTest>) => {
        let tc: MdDialogComponentTest = fixture.componentInstance;
        let result: any;
        let sub = tc.dialog.onClose.subscribe((r) => result = r);
        return tc.dialog.show()
          .then(() => tc.dialog.close(1337, false))
          .then(() => promiseWait())
          .then(() => {
            sub.unsubscribe();
            expect(result).toBe(1337);
          });

      });

    }));
    it('(onCancel) emits after dialog is closed and cancel = true', async(() => {
      setup().then((fixture: ComponentFixture<MdDialogComponentTest>) => {
        let tc: MdDialogComponentTest = fixture.componentInstance;
        let result: any;
        let sub = tc.dialog.onCancel.subscribe((r) => result = r);
        return tc.dialog.show()
          .then(() => tc.dialog.close('test', true))
          .then(() => promiseWait())
          .then(() => {
            sub.unsubscribe();
            expect(result).toBe('test');
          });

      });

    }));
  });
});



