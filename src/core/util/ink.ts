import {Animate} from "./animate";

/**
 * Create ink ripples on elements in the page.
 */
export abstract class Ink {

  /**
   * Determine if ink can be applied to a given element.
   * @param element The element to check
   */
  static canApply(element: HTMLElement): boolean {
    return !element.hasAttribute('md-no-ink');
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
   * @param left The x position inside the element for the ripple to originate from
   * @param top The y position inside the element for the ripple to originate from
   * @returns {Promise<any>} A promise that resolves when the ripple has faded
   */
  static ripple(element: HTMLElement, left: number, top: number): Promise<any> {
    let fit: boolean = !!element.getAttribute('md-fab');

    let container = element.querySelector('.md-ripple-container');
    if (!container) {
      container = document.createElement('div');
      container.classList.add('md-ripple-container');
      element.appendChild(container);
    }

    let ripple = document.createElement('div');
    ripple.classList.add('md-ripple');

    let getInitialStyles = (): any => {
      let color = window.getComputedStyle(element).color || 'rgb(0,0,0)';
      let size = Ink.getSize(fit, element.clientWidth, element.clientHeight);
      return {
        'background-color': color,
        left: `${left}px`,
        top: `${top}px`,
        width: `${size}px`,
        height: `${size}px`
      };
    };

    return Animate.setStyles(ripple, getInitialStyles())
      .then(() => container.appendChild(ripple))
      .then(() => ripple.classList.add('md-ripple-placed'))
      .then(() => Animate.wait())
      .then(() => ripple.classList.add('md-ripple-scaled'))
      .then(() => ripple.classList.add('md-ripple-active'))
      .then(() => Animate.wait(450))
      .then(() => ripple.classList.remove('md-ripple-active'))
      .then(() => Animate.wait(650))
      .then(() => container.removeChild(ripple));
  }

  /**
   * Start an ink ripple from a MouseEvent.
   *
   * @param element The element to ripple on.
   * @param event The mouse event to indicate where the ripple should start at
   * @returns {Promise<any>} A promise that resolves when the ripple has faded.
   */
  static rippleEvent(element: HTMLElement, event: MouseEvent): Promise<any> {
    let rippleX = event.offsetX;
    let rippleY = event.offsetY;
    if (element !== event.srcElement) {
      const rect = element.getBoundingClientRect();
      rippleX = event.clientX - rect.left;
      rippleY = event.clientY - rect.top;
    }
    return Ink.ripple(element, rippleX, rippleY);
  }

}
