import {
  provide,
  ComponentRef,
  DynamicComponentLoader,
  ElementRef,
  Injectable,
  ResolvedProvider,
  RenderComponentType,
  ViewEncapsulation,
  Injector,
  Renderer,
  RootRenderer,
  APPLICATION_COMMON_PROVIDERS
} from 'angular2/core';

import {Promise} from 'angular2/src/facade/async';
import {isPresent, Type} from 'angular2/src/facade/lang';
import {MdDialogRef} from './dialog_ref';
import {MdDialogConfig} from './dialog_config';
import {MdDialogContainer} from './dialog_container';
import {MdDialogBasic} from './dialog_basic';
import {MdBackdrop} from "../backdrop/backdrop";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {Animate} from '../../core/util/animate';

export * from './dialog_config';
export * from './dialog_container';
export * from './dialog_ref';
export * from './dialog_basic';

// TODO(jelbourn): body scrolling is disabled while dialog is open.
// TODO(jelbourn): Don't manually construct and configure a DOM element. See #1402
// TODO(jelbourn): Wrap focus from end of dialog back to the start. Blocked on #1251
// TODO(jelbourn): Focus the dialog element when it is opened.
// TODO(jelbourn): Pre-built `alert` and `confirm` dialogs.
// TODO(jelbourn): Animate dialog out of / into opening element.

/**
 * Service for opening modal dialogs.
 */
@Injectable()
export class MdDialog {

  /**
   * Unique id counter for RenderComponentType.
   * @private
   */
  static _uniqueId:number = 0;

  /**
   * Renderer for manipulating dialog and backdrop component elements.
   * @private
   */
  private _renderer: Renderer = null;

  constructor(public componentLoader: DynamicComponentLoader,rootRenderer: RootRenderer) {
    let type = new RenderComponentType(`__md-dialog-${MdDialog._uniqueId++}`, ViewEncapsulation.None, []);
    this._renderer = rootRenderer.renderComponent(type);
  }

  private _defaultContainer = DOM.query('body');

  /**
   * Opens a modal dialog.
   * @param type The component to open.
   * @param elementRef The logical location into which the component will be opened.
   * @param options
   * @returns Promise for a reference to the dialog.
   */
  open(type: Type, elementRef: ElementRef, options: MdDialogConfig = null): Promise<MdDialogRef> {
    var config = isPresent(options) ? options : new MdDialogConfig();


    // Create the dialogRef here so that it can be injected into the content component.
    var dialogRef = new MdDialogRef();

    var bindings = Injector.resolve([APPLICATION_COMMON_PROVIDERS, provide(MdDialogRef, {useValue: dialogRef})]);

    var backdropRefPromise = this._openBackdrop(elementRef, bindings, options);

    // First, load the MdDialogContainer, into which the given component will be loaded.
    return this.componentLoader.loadNextToLocation(MdDialogContainer, elementRef)
      .then(containerRef => {
        // TODO(tbosch): clean this up when we have custom renderers
        // (https://github.com/angular/angular/issues/1807)
        // TODO(jelbourn): Don't use direct DOM access. Need abstraction to create an element
        // directly on the document body (also needed for web workers stuff).
        // Create a DOM node to serve as a physical host element for the dialog.
        var dialogElement = containerRef.location.nativeElement;

        this._renderer.setElementClass(dialogElement, 'md-dialog-absolute', !!config.container);

        DOM.appendChild(config.container || this._defaultContainer, dialogElement);

        if (isPresent(config.width)) {
          this._renderer.setElementStyle(dialogElement, 'width', config.width);
        }
        if (isPresent(config.height)) {
          this._renderer.setElementStyle(dialogElement, 'height', config.height);
        }

        dialogRef.containerRef = containerRef;

        // Now load the given component into the MdDialogContainer.
        return this.componentLoader.loadNextToLocation(type, containerRef.instance.contentRef, bindings)
          .then((contentRef: ComponentRef) => {
            Object.keys(config.context).forEach((key) => {
              contentRef.instance[key] = config.context[key];
            });

            // Wrap both component refs for the container and the content so that we can return
            // the `instance` of the content but the dispose method of the container back to the
            // opener.
            dialogRef.contentRef = contentRef;
            containerRef.instance.dialogRef = dialogRef;

            backdropRefPromise.then(backdropRef => {
              dialogRef.backdropRef = backdropRef;
              dialogRef.whenClosed.then((_) => {
                backdropRef.dispose();
              });
            });

            return Animate.enter(dialogElement, 'md-active').then(() => dialogRef);
          });
      });
  }

  /** Loads the dialog backdrop (transparent overlay over the rest of the page). */
  _openBackdrop(elementRef: ElementRef, bindings: ResolvedProvider[], options: MdDialogConfig): Promise<ComponentRef> {
    return this.componentLoader.loadNextToLocation(MdBackdrop, elementRef, bindings)
      .then((componentRef) => {
        let backdrop: MdBackdrop = componentRef.instance;
        backdrop.clickClose = options.clickClose;
        this._renderer.setElementClass(componentRef.location.nativeElement, 'md-backdrop', true);
        this._renderer.setElementClass(componentRef.location.nativeElement, 'md-opaque', true);
        this._renderer.setElementClass(componentRef.location.nativeElement, 'md-backdrop-absolute', !!options.container);
        DOM.appendChild(options.container || this._defaultContainer, componentRef.location.nativeElement);
        return backdrop.show().then(() => componentRef);
      });
  }

  alert(message: string, okMessage: string): Promise<any> {
    throw 'Not implemented';
  }

  confirm(message: string, okMessage: string, cancelMessage: string): Promise<any> {
    throw 'Not implemented';
  }
}
