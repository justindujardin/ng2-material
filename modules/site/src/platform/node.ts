import {PlatformHost} from "./index";

export class NodePlatformHost extends PlatformHost {
  private _hljs = null;

  constructor() {
    super();
    this._hljs = require('highlight.js');
  }

  highlight(code: string, language: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const result = this._hljs.highlight(language, code, true);
      resolve(result);
    });
  }
}
