import {ElementRef, Component, AfterViewInit, Input} from '@angular/core';
import {HighlightComponent} from './highlight.component';

@Component({
  moduleId: module.id,
  selector: 'docs-highlight-container',
  template: `<ng-content></ng-content>`,
  styleUrls: ['highlight-container.component.css']
})
export class HighlightContainerComponent implements AfterViewInit {
  @Input() selector: string = '';

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    // Find children and highlight them in place
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
