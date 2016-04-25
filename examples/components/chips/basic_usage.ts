import {Component, ViewChild, AfterViewInit, ChangeDetectorRef} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {FORM_DIRECTIVES} from "angular2/common";
import {MdChips} from "../../../ng2-material/components/chips/chips";
import {Observable} from "rxjs/Observable";
import {IMdChipData} from "../../../ng2-material/components/chips/chips.service";
import {TimerWrapper} from "angular2/src/facade/async";
import {BehaviorSubject} from "rxjs/Rx";

@Component({
  selector: 'chips-basic-usage',
  templateUrl: 'examples/components/chips/basic_usage.html',
  styleUrls: ['examples/components/chips/basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})
export default class ChipsBasicUsage implements AfterViewInit {
  deletable: boolean = true;
  unique: boolean = true;
  readonly: boolean = false;
  placeholder: string = "Start typing";

  @ViewChild(MdChips) chips: MdChips;

  chips$: Observable<string[]> = new BehaviorSubject([]);

  ngAfterViewInit(): any {
    let chipStream = <BehaviorSubject<string[]>>this.chips$;
    // Create stream of labels from chips value stream of IMdChipData
    this.chips.value
      .map((chips: IMdChipData[]) => chips.map((c) => c.label))
      .subscribe((c: string[]) => chipStream.next(c));

    // If we insert the mock data right after creating the chips$ stream, a change
    // after check will be fired.
    TimerWrapper.setTimeout(() => this.setupData(), 0);
  }

  private setupData() {
    this.chips.state.setLabels([
      'Roberto', 'Philip J. Fry', 'Bender B. Rodriguez','Lord Nibbler', 'Zapp Brannigan'
    ]);
  }

}
