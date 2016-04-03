import "angular2-universal-preview/polyfills";
import gulp = require('gulp');
import {provide, enableProdMode} from "angular2/core";
import {APP_BASE_HREF} from "angular2/router";
import {prerender} from "angular2-gulp-prerender";
import {App} from "./src/app/app.component";
import {REQUEST_URL,NODE_HTTP_PROVIDERS, NODE_ROUTER_PROVIDERS} from "angular2-universal-preview";

enableProdMode();

gulp.task('prerender', () => {

  return gulp.src('./src/index.html')
    .pipe(prerender({
      directives: [App],
      providers: [
        provide(APP_BASE_HREF, {useValue: '/'}),
        provide(REQUEST_URL, {useValue: '/'}),
        NODE_HTTP_PROVIDERS,
        NODE_ROUTER_PROVIDERS
      ],
      preboot: false,
      async: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch:prerender', () => {
  gulp.watch(['./src/index.html', './src/app/**'], ['prerender']);
});

gulp.task('default', ['prerender'], () => {
  console.log('welcome');
});
