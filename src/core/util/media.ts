import {Injectable, NgZone} from "@angular/core";
import {ViewportHelper} from "./viewport";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";


/**
 * As defined in core/style/variables.scss
 *
 * $layout-breakpoint-xs:     600px !default;
 * $layout-breakpoint-sm:     960px !default;
 * $layout-breakpoint-md:     1280px !default;
 * $layout-breakpoint-lg:     1920px !default;
 *
 */
export const MEDIA: any = {
  'xs': '(max-width: 599px)',
  'gt-xs': '(min-width: 600px)',
  'sm': '(min-width: 600px) and (max-width: 959px)',
  'gt-sm': '(min-width: 960px)',
  'md': '(min-width: 960px) and (max-width: 1279px)',
  'gt-md': '(min-width: 1280px)',
  'lg': '(min-width: 1280px) and (max-width: 1919px)',
  'gt-lg': '(min-width: 1920px)',
  'xl': '(min-width: 1920px)'
};

export const MEDIA_PRIORITY: any = [
  'xl',
  'gt-lg',
  'lg',
  'gt-md',
  'md',
  'gt-sm',
  'sm',
  'gt-xs',
  'xs'
];

/**
 * Reference to a Media query listener. When you are done with it, call the `destroy` method
 * to release its reference.
 */
export class MediaListener {

  /**
   * Emits when the query that this is listening for changes.
   */
  onMatched: Observable<MediaQueryList> = new BehaviorSubject<MediaQueryList>(this.mql);

  /**
   * Determine if this query is currently matched by the viewport.
   * @returns {boolean} True if the query is matched.
   */
  get matches(): boolean {
    return !this._destroyed && this.mql.matches;
  }

  private _destroyed: boolean = false;

  private _listener: MediaQueryListListener;

  constructor(public query: string,
              private zone: NgZone,
              private mql: MediaQueryList,
              private media: Media) {
    const subject = this.onMatched as BehaviorSubject<MediaQueryList>;
    this._listener = (mql: MediaQueryList) => {
      zone.run(() => subject.next(mql));
    };
    this.mql.addListener(this._listener);
  }

  /**
   * Destroy and unhook this listener.
   */
  destroy() {
    if (!this._destroyed) {
      this.mql.removeListener(this._listener);
      this.media.unregisterListener(this);
      this._destroyed = true;
      this._listener = null;
      this.mql = null;
    }
  }

}

export interface IMediaQueryCache {
  references: number;
  mql: MediaQueryList;
}

/**
 * Injectable class for being notified of changes to viewport media queries.
 */
@Injectable()
export class Media {

  cache: {[query: string]: IMediaQueryCache} = {};

  constructor(public viewport: ViewportHelper, private zone: NgZone) {

  }

  listen(query: string): MediaListener {
    let listener = this.cache[query];
    if (!listener) {
      listener = this.cache[query] = {
        mql: this.viewport.matchMedia(query),
        references: 0
      };
    }
    listener.references++;
    return new MediaListener(query, this.zone, listener.mql, this);
  }

  unregisterListener(listener: MediaListener): void {
    let cached = this.cache[listener.query];
    if (cached) {
      cached.references--;
      if (cached.references === 0) {
        delete this.cache[listener.query];
      }
    }
  }

  hasMedia(size: string): boolean {
    let query = Media.getQuery(size);
    if (!query) {
      return false;
    }
    return this.viewport.matchMedia(query).matches;
  }

  static getQuery(size: string): string {
    let query = MEDIA[size];
    if (!query) {
      console.warn(`unknown media query size ${size}. Expected one of [${MEDIA_PRIORITY.join(',')}]`);
      return null;
    }
    return query;
  }

}
