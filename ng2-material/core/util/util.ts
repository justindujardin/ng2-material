import {isPresent} from "angular2/src/facade/lang";
import {NumberWrapper} from "angular2/src/facade/lang";
import {TimerWrapper} from "angular2/src/facade/async";
/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds.
 * @param wait Integer value of msecs to delay (since last debounce reset); default value 10 msecs
 */
export function debounce(func, wait, scope) {
  var timer = null;

  return function debounced() {
    var context = scope,
        args    = Array.prototype.slice.call(arguments);

    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {

      timer = undefined;
      func.apply(context, args);

    }, wait || 10);
  };
}


/**
 * Returns a function that can only be triggered every `delay` milliseconds.
 * In other words, the function will not be called unless it has been more
 * than `delay` milliseconds since the last call.
 */
export function throttle(func, delay, scope) {
  var recent;
  return function throttled() {
    var context = scope;
    var args = arguments;
    var now = new Date().getTime();

    if (!recent || (now - recent > delay)) {
      func.apply(context, args);
      recent = now;
    }
  };
}


export function parseTabIndexAttribute(attr: any): number {
  return isPresent(attr) ? NumberWrapper.parseInt(attr, 10) : 0;
}


export function isNumber(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object Number]';
}
