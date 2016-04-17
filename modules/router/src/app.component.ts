import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";

@Component({
  selector: 'home',
  template: `
    Home 2 
  `
})
export class Home {
}

@Component({
  selector: 'about',
  template: `
    About
  `
})
export class About {
} 


@Component({
  selector: 'app',
  providers: [],
  directives: [...ROUTER_DIRECTIVES, Home, About],
  styles: [],
  template: `
    <nav>
      <a [routerLink]=" ['./Home'] ">Home</a>
      <a [routerLink]=" ['./About'] ">About</a>
    </nav>
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
@RouteConfig([
  {path: '/', component: Home, name: 'Home', useAsDefault: true},
  {path: '/about', component: About, name: 'About'}
])
export class App {
}


