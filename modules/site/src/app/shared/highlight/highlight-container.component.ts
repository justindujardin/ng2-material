import {ElementRef, Component, Input} from '@angular/core';
import {HighlightComponent} from './highlight.component';

@Component({
  moduleId: module.id,
  selector: 'docs-highlight-container',
  template: `<ng-content></ng-content>`,
  styleUrls: ['highlight-container.component.css']
})
export class HighlightContainerComponent {
  @Input() selector: string = '';

  @Input()
  set content(value: string) {
    this._content = value;
    this.update();
  }

  get content(): string {
    return this._content;
  }

  private _content: string = '';

  constructor(private elementRef: ElementRef) {}

  update() {
    // Find children and highlight them in place
    this.elementRef.nativeElement.innerHTML = this._content;
    if (this.selector !== '' && this.elementRef) {
      const blocks = this.elementRef.nativeElement.querySelectorAll(this.selector);
      for (var i = 0; i < blocks.length; i++) {
        const codeBlock = blocks[i] as HTMLElement;
        const inputCode = codeBlock.innerText;
        const hasType = codeBlock.className.indexOf('lang-') === 0;
        const language = hasType ? codeBlock.className.replace('lang-', '') : 'html';

        const code = HighlightComponent.highlight(language, inputCode);
        codeBlock.classList.add('highlight');
        codeBlock.innerHTML = code;
      }
    }
  }
}
