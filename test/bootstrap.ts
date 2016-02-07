import {TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from "angular2/platform/testing/browser";
import {setBaseTestProviders} from "angular2/testing";
import {MATERIAL_PROVIDERS} from "../ng2-material/all";
import {TestUrlResolver} from "./test_url_resolver";
import {UrlResolver} from "angular2/compiler";
import {provide} from "angular2/core";

/**
 * The providers for our tests
 */
const TEST_APP_PROVIDERS = TEST_BROWSER_APPLICATION_PROVIDERS.concat([
  MATERIAL_PROVIDERS,
  provide(UrlResolver, {useValue: new TestUrlResolver()})
]);
setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_APP_PROVIDERS);
