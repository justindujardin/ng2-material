import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {TimerWrapper} from "angular2/src/facade/async";

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
      DOM.addClass(el, cssClass + '-add');
      TimerWrapper.setTimeout(() => {
        var duration = Animate.getTransitionDuration(el, true);
        var callTimeout = TimerWrapper.setTimeout(() => done(true), duration);
        var done = (timeout) => {
          if (!removeListener) {
            return;
          }
          DOM.removeClass(el, cssClass + '-add-active');
          DOM.removeClass(el, cssClass + '-add');
          if (!timeout) {
            TimerWrapper.clearTimeout(callTimeout);
          }
          removeListener();
          removeListener = null;
          resolve();
        };
        let removeListener = DOM.onAndCancel(el, Animate.TRANSITION_EVENT, () => done(false));
        DOM.addClass(el, cssClass + '-add-active');
        DOM.addClass(el, cssClass);
      }, 1);
    });
  }

  static leave(el: HTMLElement, cssClass: string): Promise<void> {
    return new Promise<void>((resolve)=> {
      DOM.addClass(el, cssClass + '-remove');
      TimerWrapper.setTimeout(() => {
        var duration = Animate.getTransitionDuration(el, true);
        var callTimeout = TimerWrapper.setTimeout(() => done(true), duration);

        var done = (timeout) => {
          if (!removeListener) {
            return;
          }
          DOM.removeClass(el, cssClass + '-remove-active');
          DOM.removeClass(el, cssClass + '-remove');
          if (!timeout) {
            TimerWrapper.clearTimeout(callTimeout);
          }
          removeListener();
          removeListener = null;
          resolve();
        };
        let removeListener = DOM.onAndCancel(el, Animate.TRANSITION_EVENT, done);
        DOM.addClass(el, cssClass + '-remove-active');
        DOM.removeClass(el, cssClass);
      }, 1);
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
    var prefixes = ['', 'moz', 'webkit', 'ms', 'o', 'khtml'];
    var style: any = DOM.getComputedStyle(element);
    for (let i = 0; i < prefixes.length; i++) {
      let durationProperty = (i === 0 ? '' : `-${prefixes[i]}-`) + `transition-duration`;
      let duration = style[durationProperty];
      if (!duration) {
        continue;
      }
      duration = ( duration.indexOf('ms') > -1 ) ? parseFloat(duration) : parseFloat(duration) * 1000;
      if (duration === 0) {
        continue;
      }
      if (includeDelay) {
        let delayProperty = (i === 0 ? '' : `-${prefixes[i]}-`) + `transition-delay`;
        var delay = style[delayProperty];
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
    if(typeof document === 'undefined') {
      return 'transitionend';
    }
    var t: string;
    var el: any = document.createElement('fakeelement');
    var transitions: {[prefix: string]: string} = {
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

  static animateStyles(element: HTMLElement, styles: {[style: string]: string|number}, durationMs: number): Promise<void> {
    let saveDuration = Animate.getTransitionDuration(element);
    Animate.setTransitionDuration(element, durationMs);
    return new Promise<void>((animResolve, animReject) => {
      let callTimeout = TimerWrapper.setTimeout(() => done(true), durationMs);

      let done = (timeout) => {
        if (!removeListener) {
          return;
        }
        if (timeout) {
          TimerWrapper.clearTimeout(callTimeout);
        }
        removeListener();
        removeListener = null;
        if (saveDuration !== -1) {
          Animate.setTransitionDuration(element, saveDuration);
        }
        else {
          DOM.removeStyle(element, 'transition-duration');
        }
        animResolve();
      };
      let removeListener = DOM.onAndCancel(element, Animate.TRANSITION_EVENT, () => done(false));
      Object.keys(styles).forEach((key: string) => {
        DOM.setStyle(element, key, `${styles[key]}`);
      });

    });
  }

  /**
   * Set CSS styles immediately by turning off transition duration and restoring it afterward
   */
  static setStyles(element: HTMLElement, styles: {[style: string]: string|number}): Promise<void> {
    let saveDuration = Animate.getTransitionDuration(element);
    Animate.setTransitionDuration(element, 0);
    return new Promise<void>((resolve, reject) => {
      Object.keys(styles).forEach((key: string) => {
        DOM.setStyle(element, key, `${styles[key]}`);
      });
      if (saveDuration !== -1) {
        Animate.setTransitionDuration(element, saveDuration);
      }
      else {
        DOM.removeStyle(element, 'transition-duration');
      }
      resolve();
    });
  }


  /**
   * Wait a period of time, then resolve a promise.
   * @param milliseconds The period to wait before resolving.
   * @returns {Promise<void>|Promise} A promise that resolves after a period of time.
   */
  static wait(milliseconds: number = 10): Promise<void> {
    return new Promise<void>((resolve)=> {
      TimerWrapper.setTimeout(() => resolve(), milliseconds);
    });
  }


}
