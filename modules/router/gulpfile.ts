import "angular2-universal/polyfills";
import {provide, enableProdMode} from "angular2/core";
import {APP_BASE_HREF} from "angular2/router";
import {UrlResolver} from "angular2/compiler";
import {prerender} from "angular2-gulp-prerender";
import {NODE_HTTP_PROVIDERS, NODE_ROUTER_PROVIDERS, BASE_URL, REQUEST_URL} from "angular2-universal";
import {Html} from "./src/html.component";
import gulp = require('gulp');
import path = require('path');
var rename = require('gulp-rename');

enableProdMode();

export class NodeUrlResolver extends UrlResolver {
  resolve(baseUrl: string, url: string): string {
    return `file://${path.resolve(path.join(baseUrl, url))}`;
  }
}

function renderAsPath(routePath: string = '', outPath: string = '') {

  // Resolve
  let distBase = path.resolve(path.join(__dirname, 'dist'));
  outPath = path.join(distBase, outPath);
  let relativePath = path.relative(outPath, distBase);
  // add a . to no relative path result because we prepend
  // to a / for BASE_URL below. 
  if (relativePath === '') {
    relativePath = '.';
  }

  let stableTime: number = -1;
  let baseUrl = '/';
  return gulp.src('./index.html')
    .pipe(prerender({
      directives: [Html],
      // NOTE: It is assumed that this is not called until the zone is stable.
      ngOnStable: () => {
        return new Promise((resolve) => {
          setTimeout(resolve, 500);
        });
      },
      providers: [
        provide(APP_BASE_HREF, {useValue: baseUrl}),
        provide(BASE_URL, {useValue: relativePath + '/'}),
        provide(REQUEST_URL, {useValue: `${baseUrl}${routePath}`}),
        provide(UrlResolver, {useValue: new NodeUrlResolver}),
        NODE_ROUTER_PROVIDERS,
        NODE_HTTP_PROVIDERS,
      ],
      preboot: false,
      async: true
    }))
    .pipe(gulp.dest(outPath));

}

gulp.task('render', () => {
  renderAsPath();
  renderAsPath('about', 'about');
});

gulp.task('default', ['render'], () => {
  console.log('welcome');
});
