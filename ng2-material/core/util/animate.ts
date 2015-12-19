import {DOM} from 'angular2/src/platform/dom/dom_adapter';

/**
 * Provide an API for animating elements with CSS transitions
 */
export class Animate {

  /**
   * Look up the transition event name for the browser type and cache it.
   */
  static TRANSITION_EVENT: string = Animate.whichTransitionEvent();

  static enter(el: HTMLElement, cssClass: string): Promise<void> {
    DOM.removeClass(el, cssClass);
    return new Promise<void>((resolve)=> {
      var duration = Animate.getTransitionDuration(el, true);
      var callTimeout = setTimeout(() => done(), duration);
      var done = () => {
        clearTimeout(callTimeout);
        removeListener();
        resolve();
      };
      let removeListener = DOM.onAndCancel(el, Animate.TRANSITION_EVENT, done);
      DOM.addClass(el, cssClass);
    });
  }

  static leave(el: HTMLElement, cssClass: string): Promise<void> {
    return new Promise<void>((resolve)=> {
      var duration = Animate.getTransitionDuration(el, true);
      var callTimeout = setTimeout(() => done(), duration);

      var done = () => {
        clearTimeout(callTimeout);
        removeListener();
        resolve();
      };
      let removeListener = DOM.onAndCancel(el, Animate.TRANSITION_EVENT, done);
      DOM.removeClass(el, cssClass);
    });
  }

  /**
   * Get the duration of any transitions being applied to the given element.
   *
   * Based on: https://gist.github.com/snorpey/5323028
   * @param element The element to query
   * @param includeDelay Include any specified transition-delay value.
   * @returns {number}
   */
  static getTransitionDuration(element: HTMLElement, includeDelay: boolean = false) {
    var prefixes = ['moz', 'webkit', 'ms', 'o', 'khtml'];
    var style: any = window.getComputedStyle(element);
    for (let i = 0; i < prefixes.length; i++) {
      let duration = style['-' + prefixes[i] + '-transition-duration'];
      if (!duration) {
        continue;
      }
      duration = ( duration.indexOf('ms') > -1 ) ? parseFloat(duration) : parseFloat(duration) * 1000;
      if (includeDelay) {
        var delay = style['-' + prefixes[i] + '-transition-delay'];
        if (typeof delay !== 'undefined') {
          duration += ( delay.indexOf('ms') > -1 ) ? parseFloat(delay) : parseFloat(delay) * 1000;
        }
      }
      return duration;
    }
    return -1;
  }

  static setTransitionDuration(element: HTMLElement, delayMs: number) {
    DOM.setStyle(element, 'transition-duration', `${delayMs}ms`);
  }

  /* From Modernizr */
  static whichTransitionEvent(): string {
    var t: string;
    var el: any = document.createElement('fakeelement');
    var transitions: {[prefix:string]:string} = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    };

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  }

  static animateStyles(element: HTMLElement, styles: {[style:string]:string|number}, durationMs: number): Promise<void> {
    let saveDuration = Animate.getTransitionDuration(element);
    Animate.setTransitionDuration(element, durationMs);
    return new Promise<void>((animResolve, animReject) => {
      let callTimeout = setTimeout(() => done(), durationMs);

      let done = () => {
        clearTimeout(callTimeout);
        removeListener();
        if (saveDuration !== -1) {
          Animate.setTransitionDuration(element, saveDuration);
        }
        animResolve();
      };
      let removeListener = DOM.onAndCancel(element, Animate.TRANSITION_EVENT, done);
      Object.keys(styles).forEach((key: string) => {
        DOM.setStyle(element, key, `${styles[key]}`);
      });

    });
  }

  /**
   * Set CSS styles immediately by turning off transition duration and restoring it afterward
   */
  static setStyles(element: HTMLElement, styles: {[style:string]:string|number}): Promise<void> {
    let saveDuration = Animate.getTransitionDuration(element);
    Animate.setTransitionDuration(element, 0);
    return new Promise<void>((resolve, reject) => {
      Object.keys(styles).forEach((key: string) => {
        DOM.setStyle(element, key, `${styles[key]}`);
      });
      if (saveDuration !== -1) {
        Animate.setTransitionDuration(element, saveDuration);
      }
      resolve();
    });
  }

}
