import {DebugElement} from "angular2/core";
import {DOM} from "angular2/src/platform/dom/dom_adapter";

/** Gets a child DebugElement by tag name. */
export function findChildByTag(parent: DebugElement, tagName: string): DebugElement {
  return parent.query((debugEl) => {
    return debugEl.nativeElement && debugEl.nativeElement.tagName && debugEl.nativeElement.tagName.toLowerCase() === tagName.toLowerCase();
  });
}
/** Gets a child DebugElement by attribute name. */
export function findChildByAttribute(parent: DebugElement, attr: string): DebugElement {
  return parent.query((debugEl) => {
    return DOM.isElementNode(debugEl.nativeElement) && DOM.hasAttribute(debugEl.nativeElement, attr);
  });
}
/** Gets all children by tag name. */
export function findChildrenByTag(parent: DebugElement, tagName: string): DebugElement[] {
  return parent.queryAll((debugEl) => {
    return debugEl.nativeElement && debugEl.nativeElement.tagName && debugEl.nativeElement.tagName.toLowerCase() === tagName.toLowerCase();
  });
}
/** Gets all children by tag name. */
export function findChildrenByAttribute(parent: DebugElement, attr: string): DebugElement[] {
  return parent.queryAll((debugEl) => {
    return DOM.isElementNode(debugEl.nativeElement) && DOM.hasAttribute(debugEl.nativeElement, attr);
  });

}
/**
 * Get a child DebugElement by id
 */
export function findChildById(parent: DebugElement, id: string): DebugElement {
  return parent.query((debugEl) => {
    return debugEl.nativeElement.id.toLowerCase() === id.toLowerCase();
  });
}
