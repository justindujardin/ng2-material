import {Component} from '@angular/core';
import {MdPatternValidator, MdMinValueValidator, MdNumberRequiredValidator, MdMaxValueValidator, MATERIAL_DIRECTIVES} from 'ng2-material';
import {FORM_DIRECTIVES, Validators, FormBuilder, ControlGroup} from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'input-form-builder',
  templateUrl: 'form_builder.html',
  styleUrls: ['form_builder.css'],
  directives: [MATERIAL_DIRECTIVES, FORM_DIRECTIVES]
})
export default class InputFormBuilder {
  projectForm: ControlGroup;

  constructor(fb: FormBuilder) {
    this.projectForm = fb.group({
      'clientName': ['', Validators.required],
      'description': [
        'Nuclear Missile Defense System',
        Validators.compose([Validators.required, Validators.maxLength(30)])
      ],
      'clientEmail': [
        '', Validators.compose([
          MdPatternValidator.inline('^.+@.+\..+$'), Validators.required, Validators.minLength(10),
          Validators.maxLength(100)
        ])
      ],
      'rate': [
        500, Validators.compose([
          MdNumberRequiredValidator.inline(), MdPatternValidator.inline('^1234$'),
          MdMinValueValidator.inline(800), MdMaxValueValidator.inline(4999)
        ])
      ]
    });
  }
}
