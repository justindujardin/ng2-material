/**
 * Media Query Listener implementation
 */
export interface ViewportMediaMatch {
  matches: boolean;
  media: string;
  addListener(listener: MediaQueryListListener): void;
  removeListener(listener: MediaQueryListListener): void;
}

/**
 * Interact with the window and document in a cross-platform friendly way.
 *
 * Rather than interacting with the window, inject this service and use it.
 */
export abstract class ViewportHelper {

  abstract matchMedia(query: string): ViewportMediaMatch;

  abstract scrollTop(): number;
  abstract getDocumentNativeElement(): any;

  abstract requestFrame(fn: (elapsed?: number)=>any);
}

export class BrowserViewportHelper extends ViewportHelper {
  getDocumentNativeElement(): any {
    return window.document;
  }
  requestFrame(fn: (elapsed?: number)=>any) {
    return window.requestAnimationFrame(fn);
  }

  matchMedia(query: string): ViewportMediaMatch {
    return window.matchMedia(query);
  }

  scrollTop(): number {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

}

export class NodeViewportMediaMatch implements ViewportMediaMatch {
  constructor(public matches: boolean = false, public media: string = '') {

  }

  addListener(listener: MediaQueryListListener): void {
  }

  removeListener(listener: MediaQueryListListener): void {
  }

}

export class NodeViewportHelper extends ViewportHelper {
  getDocumentNativeElement(): any {
    return {};
  }
  requestFrame(fn: (elapsed?: number)=>any) {
    return process.nextTick(fn);
  }

  matchMedia(query: string): ViewportMediaMatch {
    return new NodeViewportMediaMatch(false, query);
  }

  scrollTop(): number {
    return 0;
  }

}
