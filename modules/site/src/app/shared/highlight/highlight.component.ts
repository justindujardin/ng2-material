import {Component, Input, AfterContentInit, ElementRef} from '@angular/core';

declare var hljs: any;

@Component({
  moduleId: module.id,
  selector: 'docs-highlight',
  styleUrls: ['highlight.component.css'],
  template: `<pre><code class="highlight" [innerHtml]="rendered || text"><ng-content></ng-content></code></pre>`
})
export class HighlightComponent implements AfterContentInit {
  get type(): string { return this._type; }

  @Input('type')
  set type(value: string) {
    this._type = value;
    this.render();
  }

  get text(): string { return this._text; }

  @Input()
  set text(value: string) {
    this._text = value;
    this.render();
  }

  private _text: string = '';
  private _type: string = 'typescript';

  rendered: string = null;

  constructor(private element: ElementRef) {}

  ngAfterContentInit() {
    // If there is no text binding, use the body of the element.
    if (this._text === '' && this.element) {
      this.text = this.element.nativeElement.innerText;
    }
  }

  render() {
    var lines = this._text.split('\n');
    if (this._text.trim().length === 0 || lines.length === 0) {
      return;
    }
    // Remove empty lines
    lines = lines.filter((line) => line.trim().length > 0);

    // Make it so each line starts at 0 whitespace
    var firstLineWhitespace = lines[0].match(/^\s*/)[0];
    var startingWhitespaceRegex = new RegExp('^' + firstLineWhitespace);
    lines = lines.map(function(line) {
      return line.replace(startingWhitespaceRegex, '').replace(/\s+$/, '');
    });

    this.rendered = HighlightComponent.highlight(this._type, lines.join('\n'));
  }

  static highlight(language: string, code: string): string {
    return hljs.highlight(language, code, true)
        .value.replace(/=<span class="hljs-value">""<\/span>/gi, '')
        .replace('<head>', '')
        .replace('<head/>', '');
  }
}
