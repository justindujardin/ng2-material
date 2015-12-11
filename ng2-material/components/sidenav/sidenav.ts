import {Directive} from 'angular2/core';
import {Input} from 'angular2/core';

@Directive({selector: 'md-sidenav'})
export class MdSidenav {
  @Input() public opened: boolean = true;
}
