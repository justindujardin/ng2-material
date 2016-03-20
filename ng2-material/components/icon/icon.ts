import {Directive} from "angular2/core";

@Directive({
  selector: '[md-icon], .md-icon',
  host: {
    '[class.material-icons]': 'true'
  }
})
export class MdIcon {
}
