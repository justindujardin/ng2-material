import {Component, Input, DynamicComponentLoader, ElementRef, ComponentRef, Query, QueryList, ViewContainerRef, AfterViewInit, ViewChild} from '@angular/core';
import {DEMO_DIRECTIVES, IExampleData} from '../index';
import {MATERIAL_DIRECTIVES, MdTabs} from 'ng2-material';
import {Http, Response} from '@angular/http';
import {Highlight} from './highlight';

export interface ISourceFile {
  data: string;
  type: string;
}

@Component({
  selector: 'example',
  properties: ['templateData', 'stylesData', 'sourceData', 'showSource', 'orderedFiles'],
  templateUrl: 'src/components/example.html',
  directives: [MATERIAL_DIRECTIVES, DEMO_DIRECTIVES, Highlight]
})
export default class Example implements AfterViewInit {
  private _model: IExampleData = null;
  private _reference: ComponentRef<any> = null;

  @Input()
  set model(value: IExampleData) {
    this._model = value;
    this.applyModel(value);
  }

  get model(): IExampleData { return this._model; }

  private _loaded: boolean = false;
  get loaded(): boolean { return this._loaded; }

  constructor(
      private _element: ElementRef, public http: Http,
      @Query(MdTabs) public panes: QueryList<MdTabs>, public dcl: DynamicComponentLoader) {}

  private _init: boolean = false;

  /**
   * The set of source files associated with the example
   */
  public orderedFiles: ISourceFile[] = [];

  /**
   * True to show the source code for the example
   */
  public showSource: boolean = false;

  private showTabs: boolean = false;

  /**
   * The selected type of source to view.
   */
  @Input() public selected: string = 'html';

  @ViewChild('example', {read: ViewContainerRef}) private exampleRef;

  ngAfterViewInit(): any {
    this._init = true;
    if (this._model) {
      this.applyModel(this._model);
    }
  }


  applyModel(model: IExampleData) {
    if (!this._init) {
      return;
    }
    this.orderedFiles = [];
    this._loaded = false;
    // Fetch template, styles, and source strings for display.
    if (model.template) {
      this.addFile(model.template, 'html');
    }
    if (model.styles) {
      this.addFile(model.styles, 'scss');
    }
    if (model.source) {
      this.addFile(model.source, 'typescript');
    }

    // Render the example component into the view.
    let template = `<${model.component}></${model.component}>`;
    @Component({
      selector: `md-example-${model.component}`,
      template: template,
      directives: [MATERIAL_DIRECTIVES, DEMO_DIRECTIVES]
    })
    class CompiledComponent {
    }
    this.dcl.loadNextToLocation(CompiledComponent, this.exampleRef)
        .then((ref: ComponentRef<CompiledComponent>) => {
          if (this._reference) {
            this._reference.destroy();
          }
          this._loaded = true;
          this._reference = ref;
        });
  }

  addFile(url: string, type: string) {
    let desc: ISourceFile = {type: type, data: ''};
    this.http.get(url).subscribe((res: Response) => { desc.data = res.text(); });
    this.orderedFiles.push(desc);
  }

  toggleSource() {
    if (this.showSource) {
      this.showTabs = false;
      setTimeout(() => { this.showSource = false; }, 500);
    } else {
      this.showSource = true;
      setTimeout(() => { this.showTabs = true; }, 25);
    }
  }
}
