import {
  Component,
  Input,
  ComponentRef,
  ViewContainerRef,
  AfterViewInit,
  ViewChild,
  ComponentResolver
} from '@angular/core';
import {Http} from '@angular/http';
import {MdToolbar} from '@angular2-material/toolbar';
import {MD_TABS_DIRECTIVES} from '@angular2-material/tabs';
import {MATERIAL_DIRECTIVES} from 'ng2-material';
import {IExampleData, DEMO_DIRECTIVES} from '../../index';
import {HighlightComponent} from '../highlight/highlight.component';

export interface ISourceFile {
  data: string;
  type: string;
}

@Component({
  moduleId: module.id,
  selector: 'docs-example',
  templateUrl: 'example.component.html',
  styleUrls: ['example.component.css'],
  directives: [MATERIAL_DIRECTIVES, MD_TABS_DIRECTIVES, HighlightComponent, MdToolbar]
})
export class ExampleComponent implements AfterViewInit {
  private _model: IExampleData = null;
  private _reference: ComponentRef<any> = null;

  @Input()
  set model(value: IExampleData) {
    this._model = value;
    this.applyModel(value);
  }

  get model(): IExampleData {
    return this._model;
  }

  private _loaded: boolean = false;
  get loaded(): boolean {
    return this._loaded;
  }

  constructor(public http: Http,
              private _componentResolver: ComponentResolver) {
  }

  private _init: boolean = false;

  /**
   * The set of source files associated with the example
   */
  @Input() public orderedFiles: ISourceFile[] = [];

  /**
   * True to show the source code for the example
   */
  @Input() public showSource: boolean = false;

  /**
   * The selected type of source to view.
   */
  @Input() public selected: string = 'html';

  @ViewChild('example', {read: ViewContainerRef}) private exampleRef: ViewContainerRef;

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
      directives: [MATERIAL_DIRECTIVES, DEMO_DIRECTIVES, HighlightComponent]
    })
    class CompiledComponent {
    }
    return this._componentResolver.resolveComponent(CompiledComponent).then(componentFactory => {
      let ref = this.exampleRef.createComponent(componentFactory, this.exampleRef.length, this.exampleRef.parentInjector);
      if (this._reference) {
        this._reference.destroy();
      }
      this._loaded = true;
      this._reference = ref;
    });
  }

  addFile(data: string, type: string) {
    let desc: ISourceFile = {type: type, data: data};
    // this.http.get(url).subscribe((res: Response) => { desc.data = res.text(); });
    this.orderedFiles.push(desc);
  }
}
