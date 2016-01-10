import {View, Component} from 'angular2/core';
import {MdPatternValidator, MdMinValueValidator, MdNumberRequiredValidator, MdMaxValueValidator, MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {FORM_DIRECTIVES, Validators, FormBuilder, ControlGroup} from 'angular2/common';

@Component({selector: 'input-form-builder'})
@View({
  templateUrl: 'examples/components/input/form_builder.html',
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})
export class InputFormBuilder {
  projectForm: ControlGroup;
  clientName: string = '';
  clientEmail: string = '';
  description: string = 'Nuclear Missile Defense System';
  rate: number = 500;

  constructor(fb: FormBuilder) {
    this.projectForm = fb.group({
      'clientName': ['', Validators.required],
      'description': ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      'clientEmail': ['', Validators.compose([
        MdPatternValidator.inline('^.+@.+\..+$'),
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ])],
      'rate': ['', Validators.compose([
        MdNumberRequiredValidator.inline(),
        MdPatternValidator.inline('^1234$'),
        MdMinValueValidator.inline(800),
        MdMaxValueValidator.inline(4999)
      ])]
    });
  }
}
