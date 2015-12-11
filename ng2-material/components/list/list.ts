import {Directive} from "angular2/core";
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {ElementRef} from "angular2/core";
import {AfterViewInit} from "angular2/core";
import {QueryList} from "angular2/core";
import {Query} from "angular2/core";
import {Component} from "angular2/core";
import {ViewEncapsulation} from "angular2/core";
import {Renderer} from "angular2/core";
import {View} from "angular2/core";
import {Attribute} from "angular2/core";
import {DynamicComponentLoader, ComponentRef} from "angular2/core";
import {Input} from "angular2/core";


/**
 * @name mdList
 *
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
 * @ngdoc directive
 * @name mdListItem
 * @module material.components.list
 *
 * @restrict E
 *
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
 * _**Note:** We automatically apply special styling when the inner contents are wrapped inside
 * of a `<md-button>` tag. This styling is automatically ignored for `class="md-secondary"` buttons
 * and you can include a class of `class="md-exclude"` if you need to use a non-secondary button
 * that is inside the list, but does not wrap the contents._
 */
@Component({
  selector: 'md-list-item',
  host: {
    'role': 'listitem'
  },
  properties: ['wrap']
})
@View({
  templateUrl: 'ng2-material/components/list/list_item.html'
})

export class MdListItem implements AfterViewInit {

  static PROXIED_TYPES: string[] = ['md-checkbox', 'md-switch'];

  public wrap: string = 'none';

  /**
   * True when the list item contents have been processed and optionally
   * wrapped in a container.
   */
  private _wrapped: boolean = false;

  constructor(private _element: ElementRef,
              public dcl: DynamicComponentLoader,
              @Attribute('href') private _href: string) {
  }

  ngAfterViewInit(): any {
    let el = this._element.nativeElement;
    // Check for proxy controls (no ng-click on parent, and a control inside)
    let secondaryItem = DOM.querySelector(el, '.md-secondary');
    let hasProxiedElement;
    let proxyElement;
    // WAS: tAttrs.ngIf || tAttrs.ngClick || tAttrs.ngHref || tAttrs.href || tAttrs.uiSref || tAttrs.ngAttrUiSref
    let shouldButtonWrap = this._href;
    if (shouldButtonWrap) {
      this.wrapIn('button');
    }
    else {
      for (var i = 0, type; type = MdListItem.PROXIED_TYPES[i]; ++i) {
        if (proxyElement = DOM.querySelector(el, type)) {
          hasProxiedElement = true;
          break;
        }
      }
      if (hasProxiedElement) {
        this.wrapIn('div');
      }
      else if (!DOM.querySelector(el, '[md-button]:not(.md-secondary):not(.md-exclude)')) {
        DOM.addClass(el, 'md-no-proxy');
      }
    }
    this.wrapSecondary();
    this.setupToggleAria();
    //var proxies    = [],
    //    firstChild = DOM.firstChild()[0].firstElementChild,
    //    hasClick   = firstChild && hasClickEvent(firstChild);
    //
    //computeProxies();
    //computeClickable();
    //
    //if ($element.hasClass('md-proxy-focus') && proxies.length) {
    //  angular.forEach(proxies, (proxy) => {
    //    proxy = angular.element(proxy);
    //
    //    $scope.mouseActive = false;
    //    proxy.on('mousedown', () => {
    //        $scope.mouseActive = true;
    //        $timeout(() => {
    //          $scope.mouseActive = false;
    //        }, 100);
    //      })
    //      .on('focus', () => {
    //        if ($scope.mouseActive === false) {
    //          $element.addClass('md-focused');
    //        }
    //        proxy.on('blur', () => {
    //          $element.removeClass('md-focused');
    //          proxy.off('blur', proxyOnBlur);
    //        });
    //      });
    //  });
    //}
    //
    //function hasClickEvent(element) {
    //  var attr = element.attributes;
    //  for (var i = 0; i < attr.length; i++) {
    //    if ($attr.$normalize(attr[i].name) === 'ngClick') return true;
    //  }
    //  return false;
    //}
    //
    //function computeProxies() {
    //  var children = $element.children();
    //  if (children.length && !children[0].hasAttribute('ng-click')) {
    //    angular.forEach(proxiedTypes, function (type) {
    //      angular.forEach(firstChild.querySelectorAll(type), function (child) {
    //        proxies.push(child);
    //      });
    //    });
    //  }
    //}
    //
    //function computeClickable() {
    //  if (proxies.length == 1 || hasClick) {
    //    $element.addClass('md-clickable');
    //
    //    if (!hasClick) {
    //      ctrl.attachRipple($scope, angular.element($element[0].querySelector('.md-no-style')));
    //    }
    //  }
    //}
    //
    //if (!hasClick && !proxies.length) {
    //  firstChild && firstChild.addEventListener('keypress', function (e) {
    //    if (e.target.nodeName != 'INPUT' && e.target.nodeName != 'TEXTAREA') {
    //      var keyCode = e.which || e.keyCode;
    //      if (keyCode == $mdConstant.KEY_CODE.SPACE) {
    //        if (firstChild) {
    //          firstChild.click();
    //          e.preventDefault();
    //          e.stopPropagation();
    //        }
    //      }
    //    }
    //  });
    //}
    //
    //$element.off('click');
    //$element.off('keypress');
    //
    //if (proxies.length == 1 && firstChild) {
    //  $element.children().eq(0).on('click', function (e) {
    //    var parentButton = $mdUtil.getClosest(e.target, 'BUTTON');
    //    if (!parentButton && firstChild.contains(e.target)) {
    //      angular.forEach(proxies, function (proxy) {
    //        if (e.target !== proxy && !proxy.contains(e.target)) {
    //          angular.element(proxy).triggerHandler('click');
    //        }
    //      });
    //    }
    //  });
    //}
  }


  //
  //
  //
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

  wrapIn(type) {
    this.wrap = type;
    let html = DOM.getInnerHTML(this._element.nativeElement);
    @Component({})
    @View({template: html})
    class CompiledComponent {
    }
    this.dcl.loadIntoLocation(CompiledComponent, this._element, this.wrap)
      .then((ref: ComponentRef) => {
        console.log(`rendered component ${ref}`)
      });


    //console.log("WRAP " + type);
    //let el = this._element.nativeElement;
    //var container;
    //if (type == 'div') {
    //  container = DOM.createElement('div');
    //  DOM.addClass(container, "md-no-style");
    //  DOM.addClass(container, "md-list-item-inner");
    //  DOM.setInnerHTML(container, DOM.getInnerHTML(el));
    //  DOM.addClass(el, 'md-proxy-focus');
    //}
    //else {
    //  container = DOM.createElement('button');
    //  DOM.setAttribute(container, 'md-button', '');
    //  DOM.addClass(container, "md-no-style");
    //  DOM.setInnerHTML(container, '<div class="md-list-item-inner"></div>');
    //  this.copyAttributes(el, container);
    //  DOM.setInnerHTML(DOM.querySelector(container, '.md-list-item-inner'), DOM.getInnerHTML(el));
    //}
    //DOM.setAttribute(el, 'tabindex', '-1');
    //DOM.setInnerHTML(el, DOM.getOuterHTML(container));
  }

  wrapSecondary() {
    //if (secondaryItem && !isButton(secondaryItem) && secondaryItem.hasAttribute('ng-click')) {
    //  $mdAria.expect(secondaryItem, 'aria-label');
    //  var buttonWrapper = angular.element('<md-button class="md-secondary-container md-icon-button">');
    //  copyAttributes(secondaryItem, buttonWrapper[0]);
    //  secondaryItem.setAttribute('tabindex', '-1');
    //  secondaryItem.classList.remove('md-secondary');
    //  buttonWrapper.append(secondaryItem);
    //  secondaryItem = buttonWrapper[0];
    //}
    //
    //// Check for a secondary item and move it outside
    //if (secondaryItem && (
    //    secondaryItem.hasAttribute('ng-click') ||
    //    ( tAttrs.ngClick &&
    //    isProxiedElement(secondaryItem) )
    //  )) {
    //  tEl.addClass('md-with-secondary');
    //  tEl.append(secondaryItem);
    //}
  }

  copyAttributes(item, wrapper) {
    //var copiedAttrs = ['ng-if', 'ng-click', 'aria-label', 'ng-disabled',
    //  'ui-sref', 'href', 'ng-href', 'ng-attr-ui-sref'];
    //angular.forEach(copiedAttrs, function (attr) {
    //  if (item.hasAttribute(attr)) {
    //    wrapper.setAttribute(attr, item.getAttribute(attr));
    //    item.removeAttribute(attr);
    //  }
    //});
  }

  isProxiedElement(el) {
    //return proxiedTypes.indexOf(el.nodeName.toLowerCase()) != -1;
  }

  isButton(el) {
    var nodeName = el.nodeName.toUpperCase();

    return nodeName == "MD-BUTTON" || nodeName == "BUTTON";
  }


}

@Component({
  selector: 'md-list-item[md-list-item-type=button]',
  host: {
    'role': 'listitem'
  }
})
@View({
  template: `<ng-content>BOOOO</ng-content>`
})
class MdListItemButton {
  constructor() {
    console.log("OWWWOOOOOO");
  }
}


/*
 * @private
 * @ngdoc controller
 * @name MdListController
 * @module source.components.list
 *
 */
function MdListController($scope, $element, $mdListInkRipple) {
  //var ctrl = this;
  //ctrl.attachRipple = attachRipple;
  //
  //function attachRipple (scope, element) {
  //  var options = {};
  //  $mdListInkRipple.attach(scope, element, options);
  //}
}

