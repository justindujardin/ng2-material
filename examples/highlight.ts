import {Component, Input, ViewEncapsulation, AfterContentInit, ElementRef} from "angular2/core";
import {DOM} from "angular2/src/platform/dom/dom_adapter";

declare var hljs: any;

@Component({
  selector: 'highlight',
  properties: ['type', 'text'],
  template: `<pre><code class="highlight" [innerHtml]="rendered || text"><ng-content></ng-content></code></pre>`,
  styleUrls: ['examples/highlight.css'],
  encapsulation: ViewEncapsulation.None
})
export class Highlight implements AfterContentInit {
  get type(): string {
    return this._type;
  }

  @Input('type')
  set type(value: string) {
    this._type = value;
    this.render();
  }

  get text(): string {
    return this._text;
  }

  @Input('text')
  set text(value: string) {
    this._text = value;
    this.render();
  }

  private _text: string = '';
  private _type: string = 'typescript';

  rendered: string = null;

  constructor(private element: ElementRef) {
  }

  ngAfterContentInit() {
    // If there is no text binding, use the body of the element.
    if (this._text === '' && this.element) {
      this.text = DOM.getText(this.element.nativeElement);
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
    lines = lines.map(function (line) {
      return line
        .replace(startingWhitespaceRegex, '')
        .replace(/\s+$/, '');
    });

    var highlightedCode = hljs.highlight(this._type, lines.join('\n'), true);
    highlightedCode.value = highlightedCode.value
      .replace(/=<span class="hljs-value">""<\/span>/gi, '')
      .replace('<head>', '')
      .replace('<head/>', '');
    this.rendered = highlightedCode.value;
  }


}
