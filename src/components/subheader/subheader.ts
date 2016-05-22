import {Component} from "@angular/core";

@Component({
  selector: 'md-subheader',
  host: {
    'class': 'md-subheader'
  },
  template: `
    <div class="md-subheader-inner">
      <span class="md-subheader-content"><ng-content></ng-content></span>
    </div>`
})
export class MdSubheader {
}
