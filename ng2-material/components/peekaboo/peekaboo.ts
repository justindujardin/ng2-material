import {Directive, OnDestroy, Input, ApplicationRef} from "angular2/core";
import {Media, MediaListener} from "../../core/util/media";
import {debounce} from "../../core/util/util";
import {CONST, NumberWrapper, isString, isPresent} from "angular2/src/facade/lang";
import {ViewportHelper} from "../../core/util/viewport";

/** Different peekaboo actions to apply when active */
@CONST()
export class PeekabooAction {
  @CONST()
  static SHOW = 'show';
  @CONST()
  static HIDE = 'hide';
}

/**
 * @name mdPeekaboo
 *
 * @description
 * The `[md-peekaboo]` directive is an attribute that toggles the visibility of elements based
 * on the current viewport size and scrollTop.
 *
 */
@Directive({
  selector: '[md-peekaboo]',
  inputs: ['break', 'breakXs', 'breakSm', 'breakMd', 'breakLg', 'breakXl'],
  providers: [],
  host: {
    '[class.md-peekaboo-active]': 'active',
    '[attr.breakAction]': 'breakAction',
    '(window:scroll)': '_windowScroll($event)'
  }
})
export class MdPeekaboo implements OnDestroy {

  static SIZES: string[] = ['xs', 'sm', 'md', 'lg', 'xl'];

  @Input()
  break: number = 100;

  @Input()
  breakAction: string;

  static MakeNumber(value: any): number {
    return isString(value) ? NumberWrapper.parseInt(value, 10) : value;
  }

  private _active: boolean = false;
  get active(): boolean {
    return this._active;
  }

  private _breakXs: number = -1;
  @Input() set breakXs(value: number) {
    this._breakXs = MdPeekaboo.MakeNumber(value);
  }

  get breakXs(): number {
    return this._breakXs;
  }

  private _breakSm: number = -1;
  @Input() set breakSm(value: number) {
    this._breakSm = MdPeekaboo.MakeNumber(value);
  }

  get breakSm(): number {
    return this._breakSm;
  }

  private _breakMd: number = -1;
  @Input() set breakMd(value: number) {
    this._breakMd = MdPeekaboo.MakeNumber(value);
  }

  get breakMd(): number {
    return this._breakMd;
  }

  private _breakLg: number = -1;
  @Input() set breakLg(value: number) {
    this._breakLg = MdPeekaboo.MakeNumber(value);
  }

  get breakLg(): number {
    return this._breakLg;
  }

  private _breakXl: number = -1;
  @Input() set breakXl(value: number) {
    this._breakXl = MdPeekaboo.MakeNumber(value);
  }

  get breakXl(): number {
    return this._breakXl;
  }

  private _breakpoint: string = null;
  set breakpoint(size: string) {
    this._breakpoint = size;
    this.evaluate();
  }

  get breakpoint(): string {
    return this._breakpoint;
  }

  private _mediaListeners: MediaListener[] = [];


  constructor(public media: Media, public viewport: ViewportHelper, private _app: ApplicationRef) {
    MdPeekaboo.SIZES.forEach((size: string) => {
      this._watchMediaQuery(size);
      if (this.media.hasMedia(size)) {
        this._breakpoint = size;
      }
    });
    this.evaluate();
    this._scrollTick = debounce(() => {
      if (isPresent(this._app.tick)) {
        this._app.tick();
      }
    }, 100, this);
  }

  ngOnDestroy(): any {
    this._mediaListeners.forEach((l: MediaListener) => {
      l.destroy();
    });
    this._mediaListeners = [];
  }

  private _watchMediaQuery(size: string) {
    let l = this.media.listen(Media.getQuery(size));
    l.onMatched.subscribe((mql: MediaQueryList) => {
      this.breakpoint = size;
    });
    this._mediaListeners.push(l);
  }

  private _windowScroll = this.evaluate.bind(this);
  private _scrollTick;

  /**
   * Evaluate the current scroll and media breakpoint to determine what scrollTop
   * value should be used for the peekaboo active state.
   * @returns number The scrollTop breakpoint that was evaluated against.
   */
  evaluate(): number {
    let top = this.viewport.scrollTop();
    let bp: number = this.break;
    switch (this._breakpoint) {
      case 'xl':
        if (this._breakXl !== -1) {
          bp = this._breakXl;
          break;
        }
      case 'lg':
        if (this._breakLg !== -1) {
          bp = this._breakLg;
          break;
        }
      case 'md':
        if (this._breakMd !== -1) {
          bp = this._breakMd;
          break;
        }
      case 'sm':
        if (this._breakSm !== -1) {
          bp = this._breakSm;
          break;
        }
      case 'xs':
        if (this._breakXs !== -1) {
          bp = this._breakXs;
          break;
        }
    }
    if (top >= bp && !this._active) {
      this._active = true;
      this._scrollTick();
    }
    else if (top < bp && this._active) {
      this._active = false;
      this._scrollTick();
    }
    return bp;
  }

}
