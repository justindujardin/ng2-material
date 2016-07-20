import {Component, QueryList} from '@angular/core';

import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdToolbar} from '@angular2-material/toolbar';
import {MATERIAL_DIRECTIVES} from 'ng2-material';
import {REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'input-basic-usage',
  templateUrl: 'input-basic-usage.component.html',
  styleUrls: ['input-basic-usage.component.css'],
  directives: [MATERIAL_DIRECTIVES, MdToolbar, MD_INPUT_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
  providers: [QueryList]
})
export class InputBasicUsageComponent {

  form:FormGroup;
  postalCode:FormControl;

  constructor(fb:FormBuilder) {
    this.form = fb.group({
      postalCode: fb.control("94043", Validators.required)
    });
  }

}
