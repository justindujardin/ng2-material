import {UrlResolver} from "angular2/src/compiler/url_resolver";

export class TestUrlResolver extends UrlResolver {
  constructor() {
    super();
  }

  resolve(baseUrl: string, url: string): string {
    // The standard UrlResolver looks for "package:" templateUrls in
    // node_modules, however in our repo we host material widgets at the root.
    return `/base/${super.resolve(baseUrl, url)}`;
  }
}
