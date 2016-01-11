import {CONST_EXPR} from "angular2/src/facade/lang";
import {NG_VALIDATORS} from "angular2/common";
import {Attribute, Input, Provider, Directive,forwardRef} from "angular2/core";
import {Validator} from "angular2/common";
import {Control} from "angular2/common";
import {isNumber} from '../../core/util/util';
import {isPresent, NumberWrapper} from 'angular2/src/facade/lang';

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
   * Returns a validator that checks to see if a string matches a given Regular Expression
   */
  static inline(pattern: string): Function {
    return function validate(control: Control): {[key: string]: any} {
      if (control.value === '' || new RegExp(pattern).test(control.value)) {
        return null;
      }
      return {
        mdPattern: true
      };
    }
  }

  @Input('mdPattern') mdPattern: string;

  constructor(@Attribute('mdPattern') pattern: any) {
    if (isPresent(pattern)) {
      this.mdPattern = pattern;
    }
  }

  validate(control: Control): {[key: string]: any} {
    return MdPatternValidator.inline(this.mdPattern)(control);
  }
}

const MAXLENGTH_VALIDATOR = CONST_EXPR(new Provider(NG_VALIDATORS, {
  useExisting: forwardRef(() => MdMaxLengthValidator),
  multi: true
}));
@Directive({selector: '[mdMaxLength]', providers: [MAXLENGTH_VALIDATOR]})
export class MdMaxLengthValidator implements Validator {
  /**
   * Returns a validator that checks for a maximum length of a string
   */
  static inline(length: number|string): Function {
    return function validate(control: Control): {[key: string]: any} {
      if (!control.value || control.value.length <= length) {
        return null;
      }
      return {
        mdMaxLength: true
      };
    }
  }

  @Input('mdMaxLength') mdMaxLength: string;

  constructor(@Attribute('mdMaxLength') attr: any) {
    if (isPresent(attr)) {
      this.mdMaxLength = attr;
    }
  }

  validate(control: Control): {[key: string]: any} {
    return MdMaxLengthValidator.inline(this.mdMaxLength)(control);
  }
}

const MAXVALUE_VALIDATOR = CONST_EXPR(new Provider(NG_VALIDATORS, {
  useExisting: forwardRef(() => MdMaxValueValidator),
  multi: true
}));
@Directive({selector: '[mdMax]', providers: [MAXVALUE_VALIDATOR]})
export class MdMaxValueValidator implements Validator {
  /**
   * Returns a validator that checks for a maximum number value
   */
  static inline(length: number|string): Function {
    return function validate(control: Control): {[key: string]: any} {
      if (NumberWrapper.isNaN(control.value) || control.value <= length) {
        return null;
      }
      return {
        mdMax: true
      };
    }
  }

  @Input('mdMax') mdMax: string;

  constructor(@Attribute('mdMax') attr: any) {
    if (isPresent(attr)) {
      this.mdMax = attr;
    }
  }

  validate(control: Control): {[key: string]: any} {
    return MdMaxValueValidator.inline(this.mdMax)(control);
  }
}

const MINVALUE_VALIDATOR = CONST_EXPR(new Provider(NG_VALIDATORS, {
  useExisting: forwardRef(() => MdMinValueValidator),
  multi: true
}));
@Directive({selector: '[mdMin]', providers: [MINVALUE_VALIDATOR]})
export class MdMinValueValidator implements Validator {
  /**
   * Returns a validator that checks for a minimum number value
   */
  static inline(length: number|string): Function {
    return function validate(control: Control): {[key: string]: any} {
      if (NumberWrapper.isNaN(control.value) || control.value >= length) {
        return null;
      }
      return {
        mdMin: true
      };
    }
  }

  @Input('mdMin') mdMin: string;

  constructor(@Attribute('mdMin') attr: any) {
    if (isPresent(attr)) {
      this.mdMin = attr;
    }
  }

  validate(control: Control): {[key: string]: any} {
    return MdMaxValueValidator.inline(this.mdMin)(control);
  }
}

const NUMBER_REQUIRED_VALIDATOR = CONST_EXPR(new Provider(NG_VALIDATORS, {
  useExisting: forwardRef(() => MdNumberRequiredValidator),
  multi: true
}));
@Directive({selector: '[mdNumberRequired]', providers: [NUMBER_REQUIRED_VALIDATOR]})
export class MdNumberRequiredValidator implements Validator {
  /**
   * Returns a validator that checks for the existence of a truthy value
   */
  static inline(): Function {
    return function validate(control: Control): {[key: string]: any} {
      let isNum = !NumberWrapper.isNaN(control.value) && isNumber(control.value);
      return isNum ? null : {mdNumberRequired: true};
    }
  }

  validate(control: Control): {[key: string]: any} {
    return MdNumberRequiredValidator.inline()(control);
  }
}

export const INPUT_VALIDATORS = [
  MdMaxLengthValidator,
  MdPatternValidator,
  MdMaxValueValidator,
  MdMinValueValidator,
  MdNumberRequiredValidator
];
