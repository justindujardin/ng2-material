import {FormGroup, FormControl, ControlContainer} from "@angular/forms";
import {Input, Directive, Optional, SkipSelf, Host, QueryList, ContentChildren, OnDestroy, OnInit} from "@angular/core";
import {controlPath} from "@angular/forms/src/directives/shared";


// TODO(jd): Behaviors to test
// - md-messages with no md-message children act as message for all errors in a field
// - md-message="propName" binds to FormBuilder group by given name
// - [md-message]="viewLocal" binds to given FormControl referenced from the view
// - [md-messages] adds md-valid and md-invalid class based on field validation state
// - throws informative errors when it fails to bind to a given form field because it cannot be found.

@Directive({
  selector: '[mdMessage]',
  host: {
    '[style.display]': 'okay ? "none" : "inherit"'
  }
})
export class MdMessage {
  @Input('mdMessage') errorKey:string;
  okay:boolean = true;
}


@Directive({
  selector: '[mdMessages]',
  host: {
    'md-messages': '',
    '[style.display]': '(valid || !isTouched) ? "none" : "inherit"',
    '[class.md-valid]': 'valid && isTouched',
    '[class.md-invalid]': '!valid && isTouched'
  }
})
export class MdMessages implements OnInit, OnDestroy {

  @Input('mdMessages') property:string;

  @ContentChildren(MdMessage) public messages:QueryList<MdMessage>;

  get path():string[] {
    return controlPath(this.property, this._parent);
  }

  get formDirective():any {
    return this._parent.formDirective;
  }

  get control():FormControl {
    return this.formDirective.getControl(this);
  }

  get valid():boolean {
    return !!this.control.valid;
  }

  get isTouched():boolean {
    return this.control.touched;
  }

  constructor(@Host() @SkipSelf() private _parent:ControlContainer) {
  }

  /**
   * Subscription to value changes that is to be dropped when the component is destroyed.
   * @type {null}
   * @private
   */
  private _controlSubscription:any = null;

  ngOnInit() {
    this._controlSubscription = this.control.statusChanges.subscribe(this._valueChanged.bind(this));
  }

  ngOnDestroy() {
    this._controlSubscription.unsubscribe();
  }

  private _valueChanged() {
    let errors:{[errorKey:string]:string} = null;
    errors = this.control.errors;
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
