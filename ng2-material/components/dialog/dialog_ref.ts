import {ComponentRef} from "@angular/core";
import {Animate} from "../../core/util/animate";
import {MdDialogContainer, MdDialogContent} from "./dialog_container";
import {MdBackdrop} from "../backdrop/backdrop";
import {PromiseCompleter} from '@angular2-material/core/async/promise-completer';

/**
 * Reference to an opened dialog.
 */
export class MdDialogRef {
  // Reference to the MdDialogContainer component.
  containerRef: ComponentRef<MdDialogContainer>;

  // Reference to the MdBackdrop component.
  _backdropRef: ComponentRef<MdBackdrop>;

  // Reference to the Component loaded as the dialog content.
  _contentRef: ComponentRef<any>;

  // Whether the dialog is closed.
  isClosed: boolean;

  // Deferred resolved when the dialog is closed. The promise for this deferred is publicly exposed.
  whenClosedDeferred: any;

  // Deferred resolved when the content ComponentRef is set. Only used internally.
  contentRefDeferred: any;

  constructor() {
    this._contentRef = null;
    this.containerRef = null;
    this.isClosed = false;

    this.contentRefDeferred = new PromiseCompleter();
    this.whenClosedDeferred = new PromiseCompleter();
  }

  /**
   * The backdrop hiding subscription
   * @private
   */
  private _subscription: any = null;

  set backdropRef(value: ComponentRef<MdBackdrop>) {
    this._backdropRef = value;
    if (this._backdropRef) {
      this._subscription = this._backdropRef.instance.onHiding.subscribe(() => {
        this._subscription.unsubscribe();
        this.close();
      });
    }
  }

  set contentRef(value: ComponentRef<MdDialogContent>) {
    this._contentRef = value;
    this.contentRefDeferred.resolve(value);
  }

  /**
   * Gets the component instance for the content of the dialog.
   */
  get instance() {
    return this._contentRef.instance || null;
  }


  /**
   * Gets a promise that is resolved when the dialog is closed.
   */
  get whenClosed(): Promise<any> {
    return this.whenClosedDeferred.promise;
  }

  /**
   * Closes the dialog. This operation is asynchronous.
   */
  close(result: any = null): Promise<void> {
    if (this.isClosed) {
      return this.whenClosedDeferred.promise;
    }
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
    this.isClosed = true;
    return Animate.leave(this.containerRef.location.nativeElement, 'md-active').then(() => {
      let otherAsync = Promise.resolve();
      if (this._backdropRef) {
        otherAsync = this._backdropRef.instance.hide();
      }
      return otherAsync.then(() => {
        this.whenClosedDeferred.resolve(result);
      });
    });
  }
}
