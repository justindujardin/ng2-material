import {MdDialogRef} from "./dialog_ref";

/** Configuration for a dialog to be opened. */
export class MdDialogConfig {
  width: string = null;
  height: string = null;
  container: HTMLElement = null;
  sourceEvent: Event = null;
  clickClose: boolean = true;
  context: any = {};

  parent(element: HTMLElement): MdDialogConfig {
    this.container = element;
    return this;
  }

  clickOutsideToClose(enabled: boolean): MdDialogConfig {
    this.clickClose = enabled;
    return this;
  }

  title(text: string): MdDialogConfig {
    this.context.title = text;
    return this;
  }

  textContent(text: string): MdDialogConfig {
    this.context.textContent = text;
    return this;
  }

  ariaLabel(text: string): MdDialogConfig {
    this.context.ariaLabel = text;
    return this;
  }

  ok(text: string): MdDialogConfig {
    this.context.ok = text;
    return this;
  }

  cancel(text: string): MdDialogConfig {
    this.context.cancel = text;
    return this;
  }

  targetEvent(ev: Event): MdDialogConfig {
    this.sourceEvent = ev;
    return this;
  }

}
