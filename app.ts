import {Component, View} from 'angular2/core';
import {bootstrap} from 'angular2/angular2';
import {MATERIAL_DIRECTIVES} from './ng2-material/all';

import {DEMO_DIRECTIVES} from './examples/all';
import Example from './examples/example';



@Component({
  selector: 'demos-app'
})
@View({
  templateUrl: 'app.html',
  directives: [MATERIAL_DIRECTIVES, Example, DEMO_DIRECTIVES]
})
export class DemosApp {
  constructor() {
    console.log('bam');
  }
}

bootstrap(DemosApp);
