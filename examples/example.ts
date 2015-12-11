import {View, Component} from 'angular2/core';
import {Input} from 'angular2/core';

@Component({selector: 'example'})
@View({templateUrl: 'examples/example.html'})
export default class Example {

  @Input() public name: string = 'Unnamed Example';
}
