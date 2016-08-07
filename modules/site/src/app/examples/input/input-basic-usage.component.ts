import {FORM_DIRECTIVES} from '@angular/forms';
import {Component} from '@angular/core';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdToolbar} from '@angular2-material/toolbar';
import {MATERIAL_DIRECTIVES} from 'ng2-material';

@Component({
  moduleId: module.id,
  selector: 'input-basic-usage',
  templateUrl: 'input-basic-usage.component.html',
  styleUrls: ['input-basic-usage.component.css'],
  directives: [MATERIAL_DIRECTIVES, MdToolbar, MD_INPUT_DIRECTIVES, FORM_DIRECTIVES]
})
export class InputBasicUsageComponent {
  user = {
    title: 'Developer',
    email: 'ipsum@lorem.com',
    firstName: '',
    lastName: '',
    company: 'Google',
    address: '1600 Amphitheatre Pkwy',
    address2: '',
    city: 'Mountain View',
    state: 'CA',
    biography:
        'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
    postalCode: '94043'
  };

  states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL',
    'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT',
    'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
    'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ].map(function(state) { return {abbrev: state}; })
}
