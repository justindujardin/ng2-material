import {Component, View} from "angular2/core";

@Component({
  selector: 'md-subheader',
  host: {
    'class': 'md-subheader'
  }
})
@View({
  template:`
    <div class="md-subheader-inner">
      <span class="md-subheader-content"><ng-content></ng-content></span>
    </div>`
})
export class MdSubheader {
}
