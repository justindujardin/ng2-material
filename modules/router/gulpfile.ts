import "angular2-universal/polyfills";
import {provide, enableProdMode} from "angular2/core";
import {APP_BASE_HREF} from "angular2/router";
import {UrlResolver} from "angular2/compiler";
import {prerender} from "angular2-gulp-prerender";
import {App} from "./src/app";
import {NODE_HTTP_PROVIDERS, NODE_ROUTER_PROVIDERS, BASE_URL, REQUEST_URL} from "angular2-universal";
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
  console.log(distBase + ' <-- distBase');

  outPath = path.join(distBase, outPath);
  console.log(outPath + ' <-- outPath');

  let bundlePath = path.resolve(path.join(distBase, 'client/bundle.js'));
  console.log(bundlePath + ' <-- bundle');

  let relativePath = path.relative(outPath,distBase);
  console.log(relativePath + ' <-- relative');

  let baseUrl = '/';
  return gulp.src('./index.html')
    .pipe(prerender({
      directives: [App],
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

gulp.task('prerender', () => {
  renderAsPath();
  renderAsPath('about', 'about');
});

gulp.task('watch:prerender', () => {
  gulp.watch(['./index.html', './src/**'], ['prerender']);
});

gulp.task('default', ['prerender'], () => {
  console.log('welcome');
});
