import {isPresent} from "angular2/src/facade/lang";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {Animate} from "./animate";

/**
 * Create ink ripples on elements in the page.
 */
export class Ink {

  /**
   * Determine if ink can be applied to a given element.
   * @param element The element to check
   */
  static canApply(element: HTMLElement): boolean {
    return !DOM.hasAttribute(element, 'md-no-ink');
  }

  /**
   * Ink ripples are equal in height/width, so get the scalar size
   * of the container.
   *
   * @param fit To fit the ripple to the element
   * @param width Width of the ripple container
   * @param height Height of the ripple container
   * @returns {number}
   */
  static getSize(fit: boolean, width: number, height: number) {
    return fit
      ? Math.max(width, height)
      : Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  }

  /**
   * Apply an ink ripple to an element at the given position.
   *
   * @param element The element to apply a ripple to
   * @param x The x position inside the element for the ripple to originate from
   * @param y The y position inside the element for the ripple to originate from
   * @returns {Promise<void>} A promise that resolves when the ripple has faded
   */
  static ripple(element: HTMLElement, x: number, y: number): Promise<void> {
    let fit: boolean = isPresent(DOM.getAttribute(element, 'md-fab'));

    let container = DOM.createElement('div');
    DOM.addClass(container, 'md-ripple-container');

    let ripple = DOM.createElement('div');
    DOM.addClass(ripple, 'md-ripple');
    DOM.appendChild(container, ripple);

    DOM.appendChild(element, container);

    let getHostSize = () => {
      let elX = element.offsetWidth;
      let elY = element.offsetHeight;
      return Ink.getSize(fit, elX, elY);
    };
    let getInitialStyles = (): any => {
      let size = getHostSize();
      let color = DOM.getComputedStyle(element).color || 'rgb(0,0,0)';
      return {
        'background-color': color,
        left: `${x - size / 2}px`,
        top: `${y - size / 2}px`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: 0.2,
        transform: 'scale(0.01)'
      };
    };

    return Animate.setStyles(ripple, getInitialStyles())
      .then(() => Animate.animateStyles(ripple, {
        left: '50%',
        top: '50%',
        opacity: 0.1,
        transform: 'translate(-50%, -50%) scale(1)'
      }, 450))
      .then(() => Animate.animateStyles(ripple, {opacity: 0}, 650))
      .then(() => DOM.removeChild(element, container));
  }

  /**
   * Start an ink ripple from a MouseEvent.
   *
   * @param element The element to ripple on.
   * @param event The mouse event to indicate where the ripple should start at
   * @returns {Promise<void>} A promise that resolves when the ripple has faded.
   */
  static rippleEvent(element: HTMLElement, event: MouseEvent): Promise<void> {
    let rippleX = event.offsetX;
    let rippleY = event.offsetY;
    if (element !== event.srcElement) {
      let rect = DOM.getBoundingClientRect(element);
      rippleX = event.clientX - rect.left;
      rippleY = event.clientY - rect.top;
    }
    return Ink.ripple(element, rippleX, rippleY);
  }

}
