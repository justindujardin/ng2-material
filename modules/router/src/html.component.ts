import {Component} from "angular2/core";
import {App, Home, About} from "./app.component";
import {RouteConfig} from 'angular2/router';
import {BASE_URL} from 'angular2-universal';
import {Inject} from "angular2/core";

@Component({
  selector: 'html',
  directives: [App],
  providers: [],
  template: `
  <head>
    <title>{{ seo.title }}</title>
    <meta charset="UTF-8">
    <meta name="description" content="ng2-material">
    <meta name="keywords" content="Angular 2,Material,Components,Examples">
    <meta name="author" content="Justin DuJardin">
    <base [attr.href]="seo.baseUrl">
  </head>
  <body>
    <app>Loading...</app>
    <script async [attr.src]="seo.src"></script>
  </body>
  `
})
@RouteConfig([
  { path: '/', component: Home, name: 'Home', useAsDefault: true },
  { path: '/about', component: About, name: 'About' },
  { path: '/**', redirectTo: ['Home'] }
])
export class Html {
  seo = {
    baseUrl: './',
    src: 'client/bundle.js',
    title: 'ng2-material static site'
  };
  constructor(@Inject(BASE_URL) public url:string) {
    this.seo.baseUrl = url;
    this.seo.src = `${url}${this.seo.src}`;
  }
}
