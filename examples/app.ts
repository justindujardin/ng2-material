import {Component, View, bootstrap} from 'angular2/angular2';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from '../ng2-material/all';

import {DEMO_DIRECTIVES} from './all';
import Example from './example';
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http';

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

  constructor(http: Http) {
    http.get('public/meta.json')
      .subscribe((res: Response) => {
        // HACKS: use to filter down to a single example for testing
        //let data = res.json();
        //let results = [];
        //data.forEach((d) => {
        //  if(d.name === 'Toolbar'){
        //    results.push(d);
        //  }
        //});
        //this.meta = results;

        this.meta = res.json();
        console.log(this.meta);
      });
  }
}

bootstrap(DemosApp, [HTTP_PROVIDERS, MATERIAL_PROVIDERS]);
