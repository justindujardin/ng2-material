import "angular2-universal/polyfills";
import {prebootComplete, bootstrap} from "angular2-universal";
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {HTTP_PROVIDERS} from "@angular/http";
import {enableProdMode} from "@angular/core";
import {App} from "./app";
import {MATERIAL_BROWSER_PROVIDERS} from "ng2-material/all";
import {DEMO_BROWSER_PROVIDERS} from "./all";

enableProdMode();

bootstrap(App, [
  ...ROUTER_PROVIDERS,
  ...HTTP_PROVIDERS,
  ...DEMO_BROWSER_PROVIDERS,
  ...MATERIAL_BROWSER_PROVIDERS
])
  .then(prebootComplete);
