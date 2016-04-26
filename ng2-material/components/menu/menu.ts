import {Component, ViewEncapsulation, ElementRef, Renderer, HostListener} from "angular2/core";
import {DOM} from "angular2/src/platform/dom/dom_adapter";


@Component({
  selector: 'md-menu',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})
export class MdMenu {
  private _menuElement: HTMLElement;
  private _triggerElement: Element;
  private _menuContent: Element;
  private _menuContainers: any;
  private _body: any;
  private _isOpen: boolean = false;


@HostListener('body:click', ['$event.target'])
@HostListener('window:resize', ['$event.target'])
closeMenu() {
    if (!this._isOpen) return ;
    this._renderer.setElementStyle(this._menuContainers, 'display', 'none');
    this._isOpen = false;
}


  constructor(private _element: ElementRef, private _renderer: Renderer) {
    this._menuElement = this._element.nativeElement;
  }

  ngAfterContentInit() {
    if (this._menuElement.children.length !== 2) {
      throw Error('Expected two children elements.');
    }

    this.initMenu();
  }

  initMenu() {
    this._body = DOM.query('body');

    this._renderer.setElementClass(this._menuElement, 'md-menu', true);
    this._renderer.setElementClass(this._menuElement, '_md', true);

    this._triggerElement = this._menuElement.firstElementChild;

    if (this._triggerElement && (
      this._triggerElement.nodeName === 'MD-BUTTON' ||
      this._triggerElement.nodeName === 'BUTTON'
    ) && !this._triggerElement.hasAttribute('type')) {
      this._triggerElement.setAttribute('type', 'button');
    }

    if (this._triggerElement)
      this._triggerElement.setAttribute('aria-haspopup', 'true');

    this._menuContent = this._menuElement.querySelector('md-menu-content');

    for (let i = 0; i < (<HTMLElement>this._menuContent).children.length; i++) {
      let menuItem = (<HTMLElement>this._menuContent).children[i];
      if (menuItem.nodeName !== 'MD-MENU-ITEM') continue;
      if ((<HTMLElement>menuItem).children.length !== 1) continue;
      let button = (<HTMLElement>menuItem).children[0];
      this._renderer.setElementStyle(button, 'text-align', 'left');

      this._renderer.listen(button, 'click', (event) => {
        this.closeMenu();
      });

    }

    this._menuContainers = this._renderer.createElement(this._body, 'div');
    this._renderer.setElementClass(this._menuContainers, '_md', true);

    this._renderer.setElementClass(this._menuContainers, '_md-active', true);
    this._renderer.setElementClass(this._menuContainers, '_md-clickable', true);

    this._renderer.setElementClass(this._menuContainers, '_md-open-menu-container', true);
    this._renderer.setElementClass(this._menuContainers, 'md-whiteframe-z2', true);
    this._renderer.setElementStyle(this._menuContainers, 'display', 'none');

    if (this._menuContent.hasAttribute('role')) {
      this._renderer.setElementAttribute(this._menuContent, 'role', 'menu');
    }

    DOM.appendChild(this._menuContainers, this._menuContent);
    DOM.appendChild(this._body, this._menuContainers);

    // this._renderer.listenGlobal('window', 'resize', (event) => {
    //   if (this._isOpen) {
    //     this.closeMenu();
    //   }
    // });

    this._renderer.listen(this._triggerElement, 'click', (event) => {
      if (this._isOpen) return;
      this.openMenu(event.clientX, event.clientY);
      event.preventDefault();
      event.stopPropagation();

    });
  }

  openMenu(x, y) {
    this._renderer.setElementStyle(this._menuContainers, 'top', y + 'px');
    this._renderer.setElementStyle(this._menuContainers, 'left', x + 'px');
    this._renderer.setElementStyle(this._menuContainers, 'display', '');

    this._triggerElement.setAttribute('aria-expanded', 'false');
    this._menuContainers.setAttribute('aria-hidden', 'false');
    this._menuContainers.setAttribute('transform-origin', 'left top 0px'); 

    this._isOpen = true;
  }



  isInElement(element, x, y): boolean {
    let rect = element.getBoundingClientRect();
    return rect.top <= y &&
      y <= rect.top + rect.height &&
      rect.left <= x &&
      x <= rect.left + rect.width;
  }

}
