import {CONST_EXPR} from "angular2/src/facade/lang";
import {NG_VALIDATORS} from "angular2/common";
import {Attribute, Input, Provider, Directive,forwardRef} from "angular2/core";
import {Validator} from "angular2/common";
import {Control} from "angular2/common";
import {isPresent} from "angular2/src/facade/lang";

const PATTERN_VALIDATOR = CONST_EXPR(new Provider(NG_VALIDATORS, {
  useExisting: forwardRef(() => MdPatternValidator),
  multi: true
}));

@Directive({
  selector: '[mdPattern]',
  providers: [PATTERN_VALIDATOR]
})
export class MdPatternValidator implements Validator {

  /**
   * Static method that returns a validator function for use
   * with {@see FormBuilder}.
   * @param pattern The regular expression to match.
   * @returns A Validator function that may be used with
   */
  static match(pattern:string):Function {
    return new MdPatternValidator(pattern).validate;
  }

  @Input('mdPattern') mdPattern: string;

  constructor(@Attribute('mdPattern') pattern: any) {
    if (isPresent(pattern)) {
      this.mdPattern = pattern;
    }
  }

  validate(control: Control): {[key: string]: any} {
    if (control.value === '' || new RegExp(this.mdPattern).test(control.value)) {
      return null;
    }
    return {
      mdPattern: true
    };
  }
}

const MAXLENGTH_VALIDATOR = CONST_EXPR(new Provider(NG_VALIDATORS, {
  useExisting: forwardRef(() => MdMaxLengthValidator),
  multi: true
}));

@Directive({
  selector: '[mdMaxLength]',
  providers: [MAXLENGTH_VALIDATOR]
})
export class MdMaxLengthValidator implements Validator {

  @Input('mdMaxLength') mdMaxLength: string;

  constructor(@Attribute('mdMaxLength') attr: any) {
    if (isPresent(attr)) {
      this.mdMaxLength = attr;
    }
  }

  validate(control: Control): {[key: string]: any} {
    if (!control.value || control.value.length <= parseInt(this.mdMaxLength, 10)) {
      return null;
    }
    return {
      mdMaxLength: true
    };
  }
}

export const INPUT_VALIDATORS = [MdMaxLengthValidator, MdPatternValidator];
