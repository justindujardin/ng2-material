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
} from "angular2/core";
import {isPresent, Type} from "angular2/src/facade/lang";
import {MdDialogRef} from "./dialog_ref";
import {MdDialogConfig} from "./dialog_config";
import {MdDialogContainer} from "./dialog_container";
import {MdBackdrop} from "../backdrop/backdrop";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {Animate} from "../../core/util/animate";

export * from './dialog_config';
export * from './dialog_container';
export * from './dialog_ref';
export * from './dialog_basic';

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
  static _uniqueId: number = 0;

  /**
   * Renderer for manipulating dialog and backdrop component elements.
   * @private
   */
  private _renderer: Renderer = null;

  constructor(public componentLoader: DynamicComponentLoader, rootRenderer: RootRenderer) {
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
  open(type: Type, elementRef: ElementRef, options: MdDialogConfig = new MdDialogConfig()): Promise<MdDialogRef> {
    // Create the dialogRef here so that it can be injected into the content component.
    let dialogRef = new MdDialogRef();

    let bindings = Injector.resolve([APPLICATION_COMMON_PROVIDERS, provide(MdDialogRef, {useValue: dialogRef})]);

    let backdropRefPromise = this._openBackdrop(elementRef, bindings, options);

    // First, load the MdDialogContainer, into which the given component will be loaded.
    return this.componentLoader.loadNextToLocation(MdDialogContainer, elementRef, bindings)
      .then((containerRef: ComponentRef) => {
        var dialogElement = containerRef.location.nativeElement;

        this._renderer.setElementClass(dialogElement, 'md-dialog-absolute', !!options.container);

        DOM.appendChild(options.container || this._defaultContainer, dialogElement);

        if (isPresent(options.width)) {
          this._renderer.setElementStyle(dialogElement, 'width', options.width);
        }
        if (isPresent(options.height)) {
          this._renderer.setElementStyle(dialogElement, 'height', options.height);
        }

        dialogRef.containerRef = containerRef;

        // Now load the given component into the MdDialogContainer.
        return this.componentLoader.loadNextToLocation(type, containerRef.instance.contentRef, bindings)
          .then((contentRef: ComponentRef) => {
            Object.keys(options.context).forEach((key) => {
              contentRef.instance[key] = options.context[key];
            });

            // Wrap both component refs for the container and the content so that we can return
            // the `instance` of the content but the dispose method of the container back to the
            // opener.
            dialogRef.contentRef = contentRef;
            containerRef.instance.dialogRef = dialogRef;

            backdropRefPromise.then((backdropRef: ComponentRef) => {
              dialogRef.backdropRef = backdropRef;
              dialogRef.whenClosed.then((_) => {
                backdropRef.instance.hide().then(() => {
                  containerRef.dispose();
                  contentRef.dispose();
                  backdropRef.dispose();
                });
              });
            });

            return Animate.enter(dialogElement, 'md-active').then(() => dialogRef);
          });
      });
  }

  /** Loads the dialog backdrop (transparent overlay over the rest of the page). */
  _openBackdrop(elementRef: ElementRef, bindings: ResolvedProvider[], options: MdDialogConfig): Promise<ComponentRef> {
    return this.componentLoader.loadNextToLocation(MdBackdrop, elementRef, bindings)
      .then((componentRef: ComponentRef) => {
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
