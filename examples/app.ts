import {Component, View} from 'angular2/core';
import {bootstrap} from 'angular2/angular2';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material/all';

import {DEMO_DIRECTIVES} from './all';
import Example from './example';



@Component({
  selector: 'demos-app'
})
@View({
  templateUrl: 'examples/app.html',
  directives: [MATERIAL_DIRECTIVES, Example, DEMO_DIRECTIVES]
})
export class DemosApp {
  constructor() {
    console.log('bam');
  }
}

bootstrap(DemosApp, [MATERIAL_PROVIDERS]);
