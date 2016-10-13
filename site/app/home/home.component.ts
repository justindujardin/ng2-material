import {Component} from '@angular/core';
import {Title} from './title/index';

@Component({
  moduleId: module.id,
  selector: 'home',
  providers: [
    Title
  ],
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class Home {
  constructor(public title: Title) {
  }

  ngOnInit() {
    console.log('hello `Home` component');
  }
}
