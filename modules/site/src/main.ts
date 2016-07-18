import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {provideForms, disableDeprecatedForms} from "@angular/forms";
import {enableProdMode, QueryList} from "@angular/core";
import {HTTP_PROVIDERS} from "@angular/http";
import {bootstrap} from "@angular/platform-browser-dynamic";
import {MATERIAL_BROWSER_PROVIDERS} from "ng2-material";
import {SiteAppComponent, AppRouterProviders, environment, DEMO_PROVIDERS} from "./app/index";

enableProdMode();
if (environment.production) {
}

bootstrap(SiteAppComponent, [
  ...AppRouterProviders, ...DEMO_PROVIDERS, ...HTTP_PROVIDERS, ...MATERIAL_BROWSER_PROVIDERS,
  {provide: LocationStrategy, useClass: HashLocationStrategy},
  {provide: QueryList, useClass: QueryList},
  disableDeprecatedForms(),
  provideForms()
]);
