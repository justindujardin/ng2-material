import {Component, View} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from '../ng2-material/all';

import {DEMO_DIRECTIVES} from './all';
import Example from './example';
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http';

//
// PLUNKR for ng2: http://plnkr.co/edit/UPJESEgyKFsm4hyW4fWR
//

/**
 * Describe an example that can be dynamically loaded.
 */
export interface IExampleData {
  template:string;
  source:string;
  styles:string;
  component:string;
  name:string;
}

@Component({
  selector: 'demos-app'
})
@View({
  templateUrl: 'examples/app.html',
  directives: [MATERIAL_DIRECTIVES, Example, DEMO_DIRECTIVES]
})
export class DemosApp {
  meta: any;

  version: string;

  constructor(http: Http) {
    http.get('public/meta.json')
      .subscribe((res: Response) => {
        this.meta = res.json();
        // HACKS: use to filter down to a single example for testing
        //let data = res.json();
        //let results = [];
        //data.forEach((d) => {
        //  if(d.name === 'Button'){
        //    results.push(d);
        //  }
        //});
        //this.meta = results;
      });
    http.get('public/version.json')
      .subscribe((res: Response) => {
        this.version = res.json().version;
      });
  }
}

bootstrap(DemosApp, [HTTP_PROVIDERS, MATERIAL_PROVIDERS]);
