import {Injectable} from "angular2/core";
import {Http, Response} from "angular2/http";

export interface IVersionMeta {
  version: string;
  readme: string;
}

@Injectable()
export class VersionService {
  public meta: IVersionMeta = null;

  private _promise: Promise<void>;

  constructor(http: Http) {
    this._promise = new Promise<void>((resolve) => {
      http.get('public/version.json').subscribe((res: Response) => {
        this.meta = res.json();
        resolve();
      });
    });
  }

  getMeta(): Promise<IVersionMeta> {
    return this._promise.then(() => {
      return this.meta;
    });
  }
}
