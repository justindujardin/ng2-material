import {ComponentRef} from "angular2/core";
import {PromiseWrapper} from "angular2/src/facade/promise";
import {Animate} from "../../core/util/animate";
import {isPresent} from "angular2/src/facade/lang";

/**
 * Reference to an opened dialog.
 */
export class MdDialogRef {
  // Reference to the MdDialogContainer component.
  containerRef: ComponentRef;

  // Reference to the MdBackdrop component.
  _backdropRef: ComponentRef;

  // Reference to the Component loaded as the dialog content.
  _contentRef: ComponentRef;

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

    this.contentRefDeferred = PromiseWrapper.completer();
    this.whenClosedDeferred = PromiseWrapper.completer();
  }

  /**
   * The backdrop hiding subscription
   * @private
   */
  private _subscription: any = null;

  set backdropRef(value: ComponentRef) {
    this._backdropRef = value;
    if (this._backdropRef) {
      this._subscription = this._backdropRef.instance.onHiding.subscribe(() => {
        this._subscription.unsubscribe();
        this.close();
      });
    }
  }

  set contentRef(value: ComponentRef) {
    this._contentRef = value;
    this.contentRefDeferred.resolve(value);
  }

  /**
   * Gets the component instance for the content of the dialog.
   */
  get instance() {
    if (isPresent(this._contentRef)) {
      return this._contentRef.instance;
    }
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
