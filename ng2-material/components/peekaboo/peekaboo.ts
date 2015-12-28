import {Directive} from "angular2/core";
import {Media, MediaListener, MEDIA_PRIORITY} from '../../core/util/media';
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {OnDestroy} from "angular2/core";
import {debounce} from "../../core/util/util";
import {Input} from "angular2/core";
import {CONST} from "angular2/src/facade/lang";
import {isPresent} from "angular2/src/facade/lang";
import {Attribute} from "angular2/core";

/** Different peekaboo actions to apply when active */
@CONST()
export class PeekabooAction {
  @CONST() static SHOW = 'show';
  @CONST() static HIDE = 'hide';
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
  host: {
    '[class.md-peekaboo-active]': 'active',
    '[attr.breakAction]': 'breakAction'
  }
})
export class MdPeekaboo implements OnDestroy {

  static SIZES: string[] = ['xs', 'sm', 'md', 'lg', 'xl'];

  @Input() break: number = 100;

  @Input() breakAction: string;

  private _active: boolean;
  get active(): boolean {
    return this._active;
  }

  get scrollTop(): number {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  private _breakXs: number = -1;
  @Input() set breakXs(value: number) {
    this._breakXs = value;
  }

  get breakXs(): number {
    return this._breakXs;
  }

  private _breakSm: number = -1;
  @Input() set breakSm(value: number) {
    this._breakSm = value;
  }

  get breakSm(): number {
    return this._breakSm;
  }

  private _breakMd: number = -1;
  @Input() set breakMd(value: number) {
    this._breakMd = value;
  }

  get breakMd(): number {
    return this._breakMd;
  }

  private _breakLg: number = -1;
  @Input() set breakLg(value: number) {
    this._breakLg = value;
  }

  get breakLg(): number {
    return this._breakLg;
  }

  private _breakXl: number = -1;
  @Input() set breakXl(value: number) {
    this._breakXl = value;
  }

  get breakXl(): number {
    return this._breakXl;
  }

  private _mediaListeners: MediaListener[] = [];
  private _breakpoint: string = null;

  constructor(@Attribute('breakAction') action: string, public media: Media) {
    this.breakAction = isPresent(action) ? action : PeekabooAction.SHOW;
    this._evaluate();
    window.addEventListener('scroll', this._windowScroll);
    MdPeekaboo.SIZES.forEach((size: string) => {
      this._watchMediaQuery(size);
      if (Media.hasMedia(size)) {
        this._breakpoint = size;
      }
    });
  }

  ngOnDestroy(): any {
    this._mediaListeners.forEach((l: MediaListener) => {
      l.destroy();
    });
    this._mediaListeners = [];
    window.removeEventListener('scroll', this._windowScroll);
  }

  private _watchMediaQuery(size: string) {
    let l = this.media.listen(Media.getQuery(size));
    l.onMatched.subscribe((q: string) => {
      this._breakpoint = size;
      this._evaluate();
    });
    this._mediaListeners.push(l);
  }

  private _windowScroll = (ev: Event) => {
    this._evaluate();
  };

  private _evaluate(): void {
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
    this._active = this.scrollTop >= bp;
  }

}
