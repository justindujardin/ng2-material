import {Component, ViewChild, AfterContentInit} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {FORM_DIRECTIVES} from "angular2/common";
import {MdChips} from "../../../ng2-material/components/chips/chips";
import {TimerWrapper} from "angular2/src/facade/async";
import {BehaviorSubject} from "rxjs/Rx";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'chips-basic-usage',
  templateUrl: 'examples/components/chips/basic_usage.html',
  styleUrls: ['examples/components/chips/basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})
export default class ChipsBasicUsage implements AfterContentInit {
  deletable: boolean = true;
  unique: boolean = true;
  readonly: boolean = false;
  placeholder: string = "Start typing";

  chipLabels$: Observable<string[]> = new BehaviorSubject<string[]>([
    'Roberto', 'Philip J. Fry', 'Bender B. Rodriguez', 'Lord Nibbler', 'Zapp Brannigan'
  ]);

  chipCount$: Observable<number> = new BehaviorSubject<number>(0);

  @ViewChild(MdChips) chips: MdChips;

  ngAfterContentInit(): any {
    TimerWrapper.setTimeout(() => {
      this.chipCount$ = this.chips.collection$.map((cl) => cl.length);
    }, 0);
  }

}
