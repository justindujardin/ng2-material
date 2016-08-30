import {Component, NgModule} from "@angular/core";

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
class MdSubheader {
}

@NgModule({
  declarations: [MdSubheader],
  exports:[MdSubheader]
})
export class MdSubheaderModule {}
