declare var System: any;
declare var Zone: any;

import {
  TEST_BROWSER_STATIC_PLATFORM_PROVIDERS,
  TEST_BROWSER_STATIC_APPLICATION_PROVIDERS
} from "@angular/platform-browser/testing";
import {setBaseTestProviders, MockApplicationRef} from "@angular/core/testing";
import {MATERIAL_BROWSER_PROVIDERS} from "../ng2-material/all";
import {TestUrlResolver} from "./test_url_resolver";
import {UrlResolver} from "@angular/compiler";
import {provide, ApplicationRef} from "@angular/core";

/**
 * The providers for our tests
 */
const TEST_APP_PROVIDERS = TEST_BROWSER_STATIC_APPLICATION_PROVIDERS.concat([
  MATERIAL_BROWSER_PROVIDERS,
  provide(ApplicationRef, {useClass: MockApplicationRef}),
  provide(UrlResolver, {useValue: new TestUrlResolver()})
]);
setBaseTestProviders(TEST_BROWSER_STATIC_PLATFORM_PROVIDERS, TEST_APP_PROVIDERS);


function onlySpecFiles(path) {
  return /_spec\.js$/.test(path);
}

export function load(files: string[]): Promise<any[]> {
  console.log('importing test modules: ');
  let error = (e: any) => {
    console.error(e);
  };
  var myZone = new Zone();
  myZone.fork({
    onError: (e) => {
      console.error("Zone Error:");
      console.error(e);
    }
  });


  let runTests = (path: string) => {
    return new Promise<void>((resolve, reject) => {
      myZone.run(() => {
        console.log(` - ${path}`);
        return System.import(path).then((module: any) => {
          if (module.hasOwnProperty('main')) {
            try {
              module.main();
              resolve();
            }
            catch (e) {
              error(e);
              reject(e);
            }
          } else {
            console.warn(` - skipping ${path} which does not implement main() method.`);
            reject('invalid file');
          }
        });
      });

    });
  };
  let promises = Object
    .keys(files)
    .filter(onlySpecFiles)
    .map(runTests);
  return Promise.all(promises);

}
