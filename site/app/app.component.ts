/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <nav>
      <span>
        <a [routerLink]=" ['./'] ">Index</a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./home'] ">Home</a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./detail'] ">Detail</a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./about'] ">About</a>
      </span>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {
  name = 'ng2-material';
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
