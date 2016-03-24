import {Directive, ElementRef, AfterViewInit, Component} from "angular2/core";
import {DOM} from "angular2/src/platform/dom/dom_adapter";


/**
 * @description
 * The `<md-list>` directive is a list container for 1..n `<md-list-item>` tags.
 *
 * @usage
 * <hljs lang="html">
 * <md-list>
 *   <md-list-item class="md-2-line" ng-repeat="item in todos">
 *     <md-checkbox ng-model="item.done"></md-checkbox>
 *     <div class="md-list-item-text">
 *       <h3>{{item.title}}</h3>
 *       <p>{{item.description}}</p>
 *     </div>
 *   </md-list-item>
 * </md-list>
 * </hljs>
 */
@Directive({
  selector: 'md-list',
  host: {
    'role': 'list'
  }
})
export class MdList {
}

/**
 * @description
 * The `<md-list-item>` directive is a container intended for row items in a `<md-list>` container.
 * The `md-2-line` and `md-3-line` classes can be added to a `<md-list-item>`
 * to increase the height with 22px and 40px respectively.
 *
 * ## CSS
 * `.md-avatar` - class for image avatars
 *
 * `.md-avatar-icon` - class for icon avatars
 *
 * `.md-offset` - on content without an avatar
 *
 * @usage
 * <hljs lang="html">
 *  <md-list>
 *    <md-list-item>
 *      <img class="md-avatar" ng-src="path/to/img"/>
 *      <span>Item content in list</span>
 *    </md-list-item>
 *    <md-list-item>
 *      <md-icon class="md-avatar-icon" md-svg-icon="communication:phone"></md-icon>
 *      <span>Item content in list</span>
 *    </md-list-item>
 *  </md-list>
 * </hljs>
 *
 */
@Component({
  selector: 'md-list-item',
  host: {
    'role': 'listitem'
  },
  properties: ['wrap'],
  template: `
    <div class="md-no-style md-list-item-inner">
      <ng-content></ng-content>
    </div>`
})
export class MdListItem implements AfterViewInit {
  constructor(private _element: ElementRef) {
  }

  ngAfterViewInit(): any {
    this.setupToggleAria();
  }

  setupToggleAria() {
    let toggleTypes = ['md-switch', 'md-checkbox'];
    let toggle;
    let el = this._element.nativeElement;

    for (var i = 0, toggleType; toggleType = toggleTypes[i]; ++i) {
      if (toggle = DOM.querySelector(el, toggleType)) {
        if (!toggle.hasAttribute('aria-label')) {
          var p = DOM.querySelector(el, 'p');
          if (!p) return;
          toggle.setAttribute('aria-label', 'Toggle ' + p.textContent);
        }
      }
    }
  }
}
