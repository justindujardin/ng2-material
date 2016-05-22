import {Directive} from "@angular/core";

@Directive({
  selector: '[md-icon], .md-icon',
  host: {
    '[class.material-icons]': 'true'
  }
})
export class MdIcon {
}
