import {Injectable} from "angular2/core";
import {Subject} from "rxjs/Subject";
import {ViewportHelper} from "./viewport";


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
  onMatched: Subject<MediaQueryList> = new Subject<MediaQueryList>();

  /**
   * Determine if this query is currently matched by the viewport.
   * @returns {boolean} True if the query is matched.
   */
  get matches(): boolean {
    return !this._destroyed && this._mql.matches;
  }

  private _destroyed: boolean = false;

  private _listener: MediaQueryListListener;

  constructor(public query: string,
              private _mql: MediaQueryList,
              private _media: Media) {
    this._listener = (mql: MediaQueryList) => this.onMatched.next(mql);
    this._mql.addListener(this._listener);
  }

  /**
   * Destroy and unhook this listener.
   */
  destroy() {
    if (!this._destroyed) {
      this._mql.removeListener(this._listener);
      this._media.unregisterListener(this);
      this._destroyed = true;
      this._listener = null;
      this._mql = null;
    }
  }

}

interface IMediaQueryCache {
  references: number;
  mql: MediaQueryList;
}

/**
 * Injectable class for being notified of changes to viewport media queries.
 */
@Injectable()
export class Media {
  private _cache: {[query: string]: IMediaQueryCache} = {};

  constructor(public viewport:ViewportHelper) {
    
  }

  listen(query: string): MediaListener {
    let listener = this._cache[query];
    if (!listener) {
      listener = this._cache[query] = {
        mql: this.viewport.matchMedia(query),
        references: 0
      };
    }
    listener.references++;
    return new MediaListener(query, listener.mql, this);
  }

  unregisterListener(listener: MediaListener): void {
    let cached = this._cache[listener.query];
    if (cached) {
      cached.references--;
      delete this._cache[listener.query];
    }
  }

  hasMedia(size:string): boolean {
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
