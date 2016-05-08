import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {SiteAppComponent, environment} from './app/index';
import {ROUTER_PROVIDERS} from '@angular/router';
import {MATERIAL_BROWSER_PROVIDERS} from 'ng2-material';


if (environment.production) {
  enableProdMode();
}

bootstrap(SiteAppComponent, [...ROUTER_PROVIDERS, ...MATERIAL_BROWSER_PROVIDERS]);
