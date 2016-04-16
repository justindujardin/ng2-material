import {enableProdMode, provide} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import {HashLocationStrategy, LocationStrategy} from "angular2/platform/common";
import {ROUTER_PROVIDERS} from "angular2/router";
import {MATERIAL_BROWSER_PROVIDERS} from "ng2-material/all";
import {HTTP_PROVIDERS} from "angular2/http";
import {ComponentsService} from "../../services/components";
import {NavigationService} from "../../services/navigation";
import {VersionService} from "../../services/version";
import {App} from "../../app";

if (window.location.href.indexOf('github.com') !== -1) {
  enableProdMode();
}
bootstrap(App, [
  HTTP_PROVIDERS, ROUTER_PROVIDERS, MATERIAL_BROWSER_PROVIDERS,
  ComponentsService, NavigationService, VersionService,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
