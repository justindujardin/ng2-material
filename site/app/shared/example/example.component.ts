import {
  Component,
  Input,
  ComponentRef,
  ViewContainerRef,
  AfterViewInit,
  ViewChild,
  Compiler,
  ReflectiveInjector,
  ModuleWithComponentFactories
} from '@angular/core';
import {Http} from '@angular/http';
import {IExampleData} from '../../index';
import {ComponentPortal} from '@angular/material';

export interface ISourceFile {
  data: string;
  type: string;
}

@Component({
  moduleId: module.id,
  selector: 'docs-example',
  templateUrl: 'example.component.html'
})
export class ExampleComponent implements AfterViewInit {
  private _model: IExampleData = null;
  private _reference: ComponentRef<any> = null;


  portalSlot: ComponentPortal<any> = null;

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
              private _viewContainerRef: ViewContainerRef,
              private _compiler: Compiler) {
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

  private _componentType: any;
  private _moduleType: any;

  ngOnDestroy() {
    if (this._reference) {
      this._reference.destroy();
    }

    if (this._compiler) {
      if (this._componentType) {
        this._compiler.clearCacheFor(this._componentType);
      }
      if (this._moduleType) {
        this._compiler.clearCacheFor(this._moduleType);
      }
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
      this.addFile(model.styles, 'css');
    }
    if (model.source) {
      this.addFile(model.source, 'typescript');
    }

    // this.portalSlot = new ComponentPortal(this._componentType);

    const componentType = null;
    const moduleType = null;
    if (!componentType || !moduleType) {
      return;
    }
    const injector = ReflectiveInjector.fromResolvedProviders([], this._viewContainerRef.parentInjector);
    this._compiler
      .compileModuleAndAllComponentsAsync<any>(moduleType)
      .then((factory: ModuleWithComponentFactories<any>) => {
        let cmpFactory: any;
        for (let i = factory.componentFactories.length - 1; i >= 0; i--) {
          if (factory.componentFactories[i].componentType === componentType) {
            cmpFactory = factory.componentFactories[i];
            break;
          }
        }
        return cmpFactory;
      })
      .then(cmpFactory => {
        if (cmpFactory) {
          this._viewContainerRef.clear();
          this._reference = this._viewContainerRef.createComponent(cmpFactory, 0, injector);
          this._reference.changeDetectorRef.detectChanges();
          this._loaded = true;
        }
      });

  }

  addFile(data: string, type: string) {
    let desc: ISourceFile = {type: type, data: data};
    // this.http.get(url).subscribe((res: Response) => { desc.data = res.text(); });
    this.orderedFiles.push(desc);
  }
}
