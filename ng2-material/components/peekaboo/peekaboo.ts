import {Directive} from "angular2/core";
import {Media, MediaListener} from '../../core/util/media';
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
  inputs: ['breaks'],
  host: {
    '[class.md-peekaboo-active]': 'active',
    '[attr.action]': 'action'
  }
})
export class MdPeekaboo implements OnDestroy {
  //TODO(jdd): This is just testing hacks, use mapping size->scrollTop
  @Input() breaks: number = 100;

  @Input() action: string;

  private _active: boolean;
  get active(): boolean {
    return this._active;
  }

  get scrollTop(): number {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  constructor(@Attribute('action') action: string) {
    this.action = isPresent(action) ? action : PeekabooAction.SHOW;
    this._active = this._evaluate(this.scrollTop);
    window.addEventListener('scroll', this._windowScroll);
  }

  ngOnDestroy(): any {
    window.removeEventListener('scroll', this._windowScroll);
  }

  private _evaluate(scrollTop: number): boolean {
    return scrollTop >= this.breaks;
  }

  private _windowScroll = (ev: Event) => {
    this._active = this._evaluate(this.scrollTop);
  };
}
