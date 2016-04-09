import 'angular2-universal-preview/polyfills';
import {prebootComplete} from 'angular2-universal-preview';

import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {enableProdMode} from 'angular2/core';

import {App} from './app';
import {DEMO_PROVIDERS} from "./all";
import {MATERIAL_BROWSER_PROVIDERS} from "ng2-material/all";

enableProdMode();

bootstrap(App, [
  ...ROUTER_PROVIDERS,
  ...HTTP_PROVIDERS,
  ...MATERIAL_BROWSER_PROVIDERS,
  ...DEMO_PROVIDERS,
])
.then(prebootComplete);
