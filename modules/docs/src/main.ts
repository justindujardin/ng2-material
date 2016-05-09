import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {SiteAppComponent, environment, DEMO_PROVIDERS} from './app/index';
import {ROUTER_PROVIDERS} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {MATERIAL_BROWSER_PROVIDERS} from 'ng2-material';


enableProdMode();
if (environment.production) {
}

bootstrap(
    SiteAppComponent,
    [...ROUTER_PROVIDERS, ...DEMO_PROVIDERS, ...HTTP_PROVIDERS, ...MATERIAL_BROWSER_PROVIDERS]);
