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

  set backdropRef(value: ComponentRef) {
    this._backdropRef = value;
    let subscription = this._backdropRef.instance.onHiding.subscribe(() => {
      this.close();
      subscription.unsubscribe();
    });
  }

  set contentRef(value: ComponentRef) {
    this._contentRef = value;
    this.contentRefDeferred.resolve(value);
  }

  /** Gets the component instance for the content of the dialog. */
  get instance() {
    if (isPresent(this._contentRef)) {
      return this._contentRef.instance;
    }

    // The only time one could attempt to access this property before the value is set is if an
    // access occurs during
    // the constructor of the very instance they are trying to get (which is much more easily
    // accessed as `this`).
    throw "Cannot access dialog component instance *from* that component's constructor.";
  }


  /** Gets a promise that is resolved when the dialog is closed. */
  get whenClosed(): Promise<any> {
    return this.whenClosedDeferred.promise;
  }

  /** Closes the dialog. This operation is asynchronous. */
  close(result: any = null): Promise<void> {
    return Animate.leave(this.containerRef.location.nativeElement, 'md-active').then(() => {
      if (this._backdropRef) {
        this._backdropRef.instance.hide();
      }
      return this.contentRefDeferred.promise.then((_) => {
        if (!this.isClosed) {
          this.isClosed = true;
          this.containerRef.dispose();
          this.whenClosedDeferred.resolve(result);
        }
      });
    });
  }
}
