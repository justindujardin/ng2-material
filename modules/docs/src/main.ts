import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {provide, enableProdMode} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router';
import {MATERIAL_BROWSER_PROVIDERS} from 'ng2-material';

import {SiteAppComponent, environment, DEMO_PROVIDERS} from './app/index';


enableProdMode();
if (environment.production) {
}

bootstrap(SiteAppComponent, [
  ...ROUTER_PROVIDERS, ...DEMO_PROVIDERS, ...HTTP_PROVIDERS, ...MATERIAL_BROWSER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
