declare var System: any;
declare var Zone: any;


import {resetBaseTestProviders, setBaseTestProviders} from "@angular/core/testing";
import {BROWSER_APP_COMPILER_PROVIDERS} from "@angular/platform-browser-dynamic";
import {TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS} from "@angular/platform-browser-dynamic/testing";
import {MATERIAL_BROWSER_PROVIDERS} from "../../index";
import {TestUrlResolver} from "./test_url_resolver";
import {UrlResolver} from "@angular/compiler";

resetBaseTestProviders();
setBaseTestProviders(
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  [
    ...BROWSER_APP_COMPILER_PROVIDERS,
    ...TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS,
    ...MATERIAL_BROWSER_PROVIDERS,
    {provide: UrlResolver, useValue: new TestUrlResolver()}
  ]
);

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
