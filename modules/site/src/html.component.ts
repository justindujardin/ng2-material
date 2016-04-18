import {Component} from "angular2/core";
import {App} from "./app";
import {RouteConfig} from 'angular2/router';
import {BASE_URL} from 'angular2-universal';
import {Inject} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

import {MATERIAL_NODE_PROVIDERS} from "ng2-material/all";
import {ComponentPage} from "./routes/component";
import {IndexPage} from "./routes/index";
import {DEMO_DIRECTIVES, DEMO_NODE_PROVIDERS} from "./all";

@Component({
  selector: 'html',
  directives: [App, MATERIAL_DIRECTIVES, DEMO_DIRECTIVES],
  providers: [MATERIAL_NODE_PROVIDERS, DEMO_NODE_PROVIDERS],
  template: `
  <head>
    <title>{{ seo.title }}</title>
    <meta charset="UTF-8">
    <meta name="description" content="ng2-material">
    <meta name="keywords" content="Angular 2,Material,Components,Examples">
    <meta name="author" content="Justin DuJardin">
    <base [attr.href]="seo.baseUrl">
    <universal-styles></universal-styles>
  </head>
  <body>
    <app>Loading...</app>
    <script async [attr.src]="seo.src"></script>
  </body>
  `
})
@RouteConfig([
  {path: '/', name: 'Index', component: IndexPage, useAsDefault: true},
  {path: '/components/:id', name: 'Component', component: ComponentPage}
])
export class Html {
  seo = {
    baseUrl: './',
    src: 'bundle.js',
    title: 'ng2-material static site'
  };
  constructor(@Inject(BASE_URL) public url:string) {
    this.seo.baseUrl = url;
    this.seo.src = `${url}${this.seo.src}`;
  }
}
