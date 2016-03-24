import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

// TODO (jdd):

@Component({
  selector: 'radio-basic-usage',
  templateUrl: 'examples/components/radio/basic_usage.html',
  styleUrls: ['examples/components/radio/basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class RadioBasicUsage {

  data: any = {
    group1: 'Banana',
    group2: '2',
    group3: 'avatar-1'
  };

  avatarData: any[] = [{
    id: 'public/images/avatars/avatar1.svg',
    title: 'avatar 1',
    value: 'avatar-1'
  }, {
    id: 'public/images/avatars/avatar2.svg',
    title: 'avatar 2',
    value: 'avatar-2'
  }, {
    id: 'public/images/avatars/avatar3.svg',
    title: 'avatar 3',
    value: 'avatar-3'
  }];

  radioData: any[] = [
    {label: '1', value: 1},
    {label: '2', value: 2},
    {label: '3', value: '3', isDisabled: true},
    {label: '4', value: '4'}
  ];

  addItem() {
    var r = Math.ceil(Math.random() * 1000);
    this.radioData.push({label: r, value: r});
  }

  removeItem() {
    this.radioData.pop();
  }
}
