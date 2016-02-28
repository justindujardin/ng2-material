import {Directive, AfterContentInit, Input, OnChanges, OnDestroy, ElementRef} from "angular2/core";
import {debounce, throttle} from "../../core/util/util";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {isPresent, isString, NumberWrapper} from "angular2/src/facade/lang";
import {ViewportHelper} from "../../core/util/viewport";


/**
 * @ngdoc directive
 * @name mdToolbar
 * @description
 * `md-toolbar` is used to place a toolbar in your app.
 *
 * Toolbars are usually used above a content area to display the title of the
 * current page, and show relevant action buttons for that page.
 *
 * You can change the height of the toolbar by adding either the
 * `md-medium-tall` or `md-tall` class to the toolbar.
 *
 * @usage
 * <hljs lang="html">
 * <div layout="column" layout-fill>
 *   <md-toolbar>
 *
 *     <div class="md-toolbar-tools">
 *       <span>My App's Title</span>
 *
 *       <!-- fill up the space between left and right area -->
 *       <span flex></span>
 *
 *       <md-button>
 *         Right Bar Button
 *       </md-button>
 *     </div>
 *
 *   </md-toolbar>
 *   <md-content>
 *     Hello!
 *   </md-content>
 * </div>
 * </hljs>
 *
 * @param {boolean=} md-scroll-shrink Whether the header should shrink away as
 * the user scrolls down, and reveal itself as the user scrolls up.
 *
 * _**Note (1):** for scrollShrink to work, the toolbar must be a sibling of a
 * `md-content` element, placed before it. See the scroll shrink demo._
 *
 * _**Note (2):** The `md-scroll-shrink` attribute is only parsed on component
 * initialization, it does not watch for scope changes._
 *
 *
 * @param {number=} mdShrinkSpeed How much to change the speed of the toolbar's
 * shrinking by. For example, if 0.25 is given then the toolbar will shrink
 * at one fourth the rate at which the user scrolls down. Default 0.5.
 */

@Directive({
  selector: 'md-toolbar',
  inputs: ['mdShrinkSpeed', 'mdScrollShrink']
})
export class MdToolbar implements AfterContentInit, OnChanges, OnDestroy {

  @Input() set mdShrinkSpeed(value: number) {
    this._mdShrinkSpeed = isString(value) ? NumberWrapper.parseFloat(<any>value) : value;
  }

  get mdShrinkSpeed(): number {
    return this._mdShrinkSpeed;
  }

  @Input() set mdScrollShrink(value: boolean) {
    this._mdScrollShrink = !!isPresent(value);
  }

  get mdScrollShrink(): boolean {
    return this._mdScrollShrink;
  }

  private _mdShrinkSpeed: number = 0.5;

  private _debouncedContentScroll = null;
  private _debouncedUpdateHeight = null;
  private _content = null;
  private _toolbarHeight: number = 0;
  private _cancelScrollShrink = null;
  private _previousScrollTop: number = 0;
  private _currentY: number = 0;

  private _mdScrollShrink: boolean = false;

  constructor(public el: ElementRef, public viewport: ViewportHelper) {
    this._debouncedContentScroll = throttle(this.onContentScroll, 10, this);
    this._debouncedUpdateHeight = debounce(this.updateToolbarHeight, 5 * 1000, this);
  }

  ngAfterContentInit(): any {
    this.disableScrollShrink();
    if (!this.mdScrollShrink) {
      return;
    }
    // TODO(jd): better way to find siblings?
    this._content = DOM.querySelector(DOM.parentElement(this.el.nativeElement), 'md-content');
    if (!this._content) {
      return;
    }
    this._cancelScrollShrink = DOM.onAndCancel(this._content, 'scroll', this._debouncedContentScroll);
    DOM.setAttribute(this._content, 'scroll-shrink', 'true');
    this.viewport.requestFrame(this.updateToolbarHeight.bind(this));
  }

  ngOnChanges(changes: {}): any {
    this.updateToolbarHeight();
  }

  ngOnDestroy(): any {
    this.disableScrollShrink();
  }

  disableScrollShrink() {
    if (this._cancelScrollShrink) {
      this._cancelScrollShrink();
      this._cancelScrollShrink = null;
    }
  }

  updateToolbarHeight() {
    this._toolbarHeight = DOM.getProperty(this.el.nativeElement, 'offsetHeight');
    if (this._content) {
      // Add a negative margin-top the size of the toolbar to the content el.
      // The content will start transformed down the toolbarHeight amount,
      // so everything looks normal.
      //
      // As the user scrolls down, the content will be transformed up slowly
      // to put the content underneath where the toolbar was.
      var margin = (-this._toolbarHeight * this.mdShrinkSpeed) + 'px';

      DOM.setStyle(this._content, "margin-top", margin);
      DOM.setStyle(this._content, "margin-bottom", margin);

      this.onContentScroll();
    }
  }

  onContentScroll(e?) {
    var scrollTop = e ? e.target.scrollTop : this._previousScrollTop;

    this._debouncedUpdateHeight();

    this._currentY = Math.min(
      this._toolbarHeight / this.mdShrinkSpeed,
      Math.max(0, this._currentY + scrollTop - this._previousScrollTop)
    );

    let toolbarXform = `translate3d(0,${-this._currentY * this.mdShrinkSpeed}px,0)`;
    let contentXform = `translate3d(0,${(this._toolbarHeight - this._currentY) * this.mdShrinkSpeed}px,0)`;
    DOM.setStyle(this._content, '-webkit-transform', contentXform);
    DOM.setStyle(this._content, 'transform', contentXform);
    DOM.setStyle(this.el.nativeElement, '-webkit-transform', toolbarXform);
    DOM.setStyle(this.el.nativeElement, 'transform', toolbarXform);

    this._previousScrollTop = scrollTop;

    this.viewport.requestFrame(() => {
      var hasWhiteFrame = DOM.hasClass(this.el.nativeElement, 'md-whiteframe-z1');

      if (hasWhiteFrame && !this._currentY) {
        DOM.removeClass(this.el.nativeElement, 'md-whiteframe-z1');
      } else if (!hasWhiteFrame && this._currentY) {
        DOM.addClass(this.el.nativeElement, 'md-whiteframe-z1');
      }
    });

  }


}
