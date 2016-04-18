import {PlatformHost} from "./index";

export class BrowserPlatformHost extends PlatformHost {
  private _hljs = (<any>window).hljs;

  highlight(code: string, language: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const result = this._hljs.highlight(code, language, true);
      resolve(result);
    });
  }
}
