import {FormGroupDirective, FormControlName, FormGroup, AbstractControl} from "@angular/forms";
import {Input, Directive, Optional, SkipSelf, Host, OnDestroy, OnInit, QueryList, ContentChildren} from "@angular/core";


// TODO(jd): Behaviors to test
// - md-messages with no md-message children act as message for all errors in a field
// - md-message="propName" binds to FormBuilder group by given name
// - [md-message]="viewLocal" binds to given FormControlName referenced from the view
// - [md-messages] adds md-valid and md-invalid class based on field validation state
// - throws informative errors when it fails to bind to a given form field because it cannot be found.

@Directive({
  selector: '[md-message]',
  host: {
    '[style.display]': 'okay ? "none" : "inherit"'
  }
})
export class MdMessage {
  @Input('md-message')
  errorKey: string;
  okay: boolean = true;
}


@Directive({
  selector: '[md-messages]',
  host: {
    'md-messages': '',
    '[style.display]': '(valid || !isTouched) ? "none" : "inherit"',
    '[class.md-valid]': 'valid && isTouched',
    '[class.md-invalid]': '!valid && isTouched'
  }
})
export class MdMessages implements OnInit, OnDestroy {

  @Input('md-messages')
  property: string|FormControlName;

  get valid(): boolean {
    if (this.property instanceof FormControlName) {
      let ctrl = <FormControlName>this.property;
      return !!ctrl.valid;
    }
    let prop = <string>this.property;
    let group = this.form.control;
    let ctrl = group.controls[prop];
    return ctrl && ctrl.valid;
  }

  get isTouched(): boolean {
    if (this.property instanceof FormControlName) {
      return (<FormControlName>this.property).touched;
    }
    let prop = <string>this.property;
    let group = this.form.control;
    let ctrl = group.controls[prop];
    return ctrl && ctrl.touched;
  }


  constructor(@ContentChildren(MdMessage)
              public messages: QueryList<MdMessage>,
              @Optional() @SkipSelf() @Host()
              public form: FormGroupDirective) {
  }

  /**
   * Subscription to value changes that is to be dropped when the component is destroyed.
   * @type {null}
   * @private
   */
  private _unsubscribe: any = null;

  ngOnInit() {
    if (this.property instanceof FormControlName) {
      let ctrl: FormControlName = <FormControlName>this.property;
      this.form = ctrl.formDirective;
      this._unsubscribe = (<any>ctrl).update.subscribe(this._valueChanged.bind(this));
    }
    else {
      if (!this.form) {
        throw new Error('md-messages cannot bind to text property without a parent FormGroupDirective');
      }
      let prop = <string>this.property;
      let group: FormGroup = this.form.control;
      if (!group) {
        throw new Error('md-messages cannot bind to text property without a FormGroup');
      }
      let ctrl: AbstractControl = group.controls[prop];
      if (!ctrl) {
        throw new Error(`md-messages cannot find property(${prop}) in FormGroup!`);
      }
      this._unsubscribe = ctrl.statusChanges.subscribe(this._valueChanged.bind(this));
    }
  }

  ngOnDestroy(): any {
    this._unsubscribe.unsubscribe();
  }

  private _valueChanged() {
    let errors: {[errorKey: string]: string} = null;
    if (this.property instanceof FormControlName) {
      let ctrl: FormControlName = <FormControlName>this.property;
      errors = ctrl.errors;
    }
    else {
      let prop = <string>this.property;
      let group = this.form.control;
      let ctrl: AbstractControl = group.controls[prop];
      errors = ctrl.errors;
    }
    if (errors) {
      this.messages.toArray().forEach((m: MdMessage) => {
        m.okay = !m.errorKey ? !errors : !errors.hasOwnProperty(m.errorKey);
      });
    } else {
      this.messages.toArray().forEach(function (m) {
          m.okay = true;
      });
    }

  }
}
