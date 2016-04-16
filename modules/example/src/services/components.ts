import {Injectable} from "angular2/core";
import {Http, Response} from "angular2/http";

export interface IComponentExample {
  component: string;
  name: string;
  source: string;
  styles: string;
  template: string;
}

export interface IComponentMeta {
  id: string;
  readme?: string;
  name: string;
  sources: string[];
  examples: IComponentExample[];
}

@Injectable()
export class ComponentsService {
  public components: any = null;

  private _promise: Promise<void>;

  constructor(http: Http) {
    this._promise = new Promise<void>((resolve) => {
      http.get('public/meta.json')
        .subscribe((res: Response) => {
          this.components = res.json();
          resolve();
        });

    });
  }

  getComponents(): Promise<IComponentMeta[]> {
    return this._promise.then(() => {
      return this.components;
    });
  }

  getComponent(id: string): Promise<IComponentMeta> {
    return this._promise.then(() => {
      let pick = null;
      this.components.forEach((c: IComponentMeta) => {
        if (c.id === id) {
          pick = c;
        }
      });
      return pick;
    });
  }

  getPrevious(component: IComponentMeta): Promise<IComponentMeta> {
    return this._promise.then(() => {
      let index = -1;
      this.components.forEach((c: IComponentMeta, i: number) => {
        if (c.id === component.id) {
          index = i;
        }
      });
      if (index < 1) {
        index = this.components.length;
      }
      return this.components[index - 1];
    });
  }

  getNext(component: IComponentMeta): Promise<IComponentMeta> {
    return this._promise.then(() => {
      let index = -1;
      this.components.forEach((c: IComponentMeta, i: number) => {
        if (c.id === component.id) {
          index = i;
        }
      });
      if (index >= this.components.length - 1) {
        index = -1;
      }
      return this.components[index + 1];
    });
  }
}
