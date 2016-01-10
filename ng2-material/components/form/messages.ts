import {CONST_EXPR} from "angular2/src/facade/lang";
import {NG_VALIDATORS} from "angular2/common";
import {
  Attribute, Input, Provider, Directive, Optional, SkipSelf, Host, OnDestroy, OnInit,
  ContentChildren, QueryList, Query, AfterContentInit
} from "angular2/core";
import {Validator, NgFormModel, NgControlName} from "angular2/common";
import {Control} from "angular2/common";
import {isPresent} from "angular2/src/facade/lang";


@Directive({
  selector: '[md-message]',
  host: {
    '[hidden]': 'okay'
  }
})
export class MdMessage {
  @Input('md-message') errorKey: string;

  okay: boolean = true;

  constructor(@Attribute('md-message') pattern: any) {
    if (isPresent(pattern)) {
      this.errorKey = pattern;
    }
  }
}


@Directive({
  selector: '[md-messages]',
  host: {
    'md-messages': '',
    '[hidden]': 'valid || !property?.touched',
    '[class.md-valid]': 'valid && property?.touched',
    '[class.md-invalid]': '!valid && property?.touched'
  }
})
export class MdMessages implements OnInit, OnDestroy {

  @Input('md-messages') property: string|NgControlName;

  valid: boolean;

  constructor(@Query(MdMessage) public messages: QueryList<MdMessage>,
              @Optional() @SkipSelf() @Host() public form: NgFormModel,
              @Attribute('md-messages') pattern: any) {
    if (isPresent(pattern)) {
      this.property = pattern;
    }
  }

  private _unsubscribe: any = null;

  ngOnInit() {
    if (this.property instanceof NgControlName) {
      let ctrl: NgControlName = <NgControlName>this.property;
      this.form = ctrl.formDirective;
      this._unsubscribe = (<any>ctrl).update.subscribe(this._valueChanged.bind(this));
    }
    else {
      if (!this.form) {
        throw new Error('md-messages cannot bind to text property without a parent NgFormModel');
      }
      console.log('init formbuilder property: ' + this.property);
    }
  }

  ngOnDestroy(): any {
    this._unsubscribe();
  }

  private _valueChanged(newValue: string) {
    let ctrl: NgControlName = <NgControlName>this.property;
    this.valid = !ctrl.errors;
    if (ctrl.errors) {
      this.messages.toArray().forEach((m: MdMessage) => {
        m.okay = !isPresent(ctrl.errors[m.errorKey]);
      });
    }
  }
}
