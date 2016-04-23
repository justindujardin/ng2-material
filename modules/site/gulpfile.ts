import "angular2-universal/polyfills";
import {provide, enableProdMode} from "angular2/core";
import {APP_BASE_HREF} from "angular2/router";
import {UrlResolver} from "angular2/compiler";
import {prerender} from "angular2-gulp-prerender";
import {NODE_HTTP_PROVIDERS, NODE_ROUTER_PROVIDERS, BASE_URL, REQUEST_URL, ORIGIN_URL} from "angular2-universal";
import {Html} from "./src/html.component";
import gulp = require('gulp');
var sass = require('gulp-sass');
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
  let baseUrl = '/';
  return gulp.src('./index.html')
    .pipe(prerender({
      directives: [Html],
      // TODO: This is a hack to wait for components to render because Universal
      // does not patch fs and wait for my fs calls to complete.
      ngOnStable: () => new Promise((resolve) => setTimeout(resolve, 500)),
      platformProviders: [
        provide(APP_BASE_HREF, {useValue: baseUrl}),
        provide(BASE_URL, {useValue: relativePath + '/'}),
        provide(ORIGIN_URL, {useValue: '/'}),
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


gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src'));
});

gulp.task('site-meta', (done) => {
  var glob = require('glob');
  var fs = require('fs');
  var path = require('path');
  var util = require('util');
  var marked = require('marked');
  var meta = {};
  var tasks = [];

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  });

  tasks.push(function buildCoverage() {
    // Parse Lcov report and generate `coverage.json` file for site.
    var parse = require('lcov-parse');
    parse('.coverage/lcov.info', function (err, data) {
      if (err) {
        console.log('skipping code coverage because lcov.info is missing');
        return next();
      }
      // Obj has "found" and "hit"
      function percent(obj) {
        if (obj.found === 0) {
          return 100;
        }
        return parseFloat((obj.hit / obj.found * 100.0).toPrecision(2));
      }

      var outMeta = data.map(function (d) {
        delete d.lines.details;
        delete d.functions.details;
        delete d.branches.details;
        delete d.title;
        d.lines.percent = percent(d.lines);
        d.functions.percent = percent(d.functions);
        d.branches.percent = percent(d.branches);
        return d;
      });
      writeJson('public/coverage.json', outMeta);
      next();
    });
  });

  tasks.push(function buildReadmeFiles() {
    glob("example/src/app/components/**/readme.md", function (err, files) {
      files.forEach(function parseDemo(readmeFile) {
        var component = readableString(path.basename(path.dirname(readmeFile)));
        meta[component] = meta[component] || {};
        meta[component].readme = marked(fs.readFileSync(readmeFile).toString());
      });
      next();
    });
  });

  tasks.push(function buildProjectReadme() {
    var rendered = marked(fs.readFileSync(path.join(__dirname, 'README.md')).toString());
    var pkg = require('./package.json');
    writeJson('public/version.json', {
      version: pkg.version,
      readme: rendered,
      dependencies: pkg.dependencies
    });
    next();
  });

  tasks.push(function buildExamples() {
    glob("example/src/app/components/**/*.html", function (err, files) {
      files.forEach(function parseDemo(templateFile) {
        var name = path.basename(templateFile, '.html');
        var result: any = {
          template: templateFile
        };
        var readmeFile = path.join(path.dirname(templateFile), name + '.md');
        var sourceFile = path.join(path.dirname(templateFile), name + '.ts');
        var stylesFile = path.join(path.dirname(templateFile), name + '.scss');
        if (fileExists(stylesFile)) {
          result.styles = stylesFile;
        }
        if (fileExists(sourceFile)) {
          result.source = sourceFile;
        }
        if (fileExists(readmeFile)) {
          result.readme = marked(fs.readFileSync(readmeFile).toString());
        }

        var component = readableString(path.basename(path.dirname(templateFile)));
        result.component = selectorString(component + ' ' + readableString(name));
        meta[component] = meta[component] || {};
        meta[component].files = [];
        meta[component][readableString(name)] = result;
      });


      glob("ng2-material/components/**/*.ts", function (err, files) {
        files.forEach(function linkComponentsToExamples(sourceFile) {
          var component = readableString(path.basename(path.dirname(sourceFile)));
          if (!meta[component]) {
            return;
          }
          meta[component].files.push(sourceFile);
        });
        writeJson('public/meta.json', prepareMeta());
        next();
      });
    });
  });

  function next() {
    if (tasks.length === 0) {
      return done();
    }
    var current = tasks.shift();
    current();
  }

  return next();

  // ------------------------------------------------------------------------
  // Helpers and such
  // ------------------------------------------------------------------------

  function writeJson(to, data) {
    try {
      fs.writeFileSync(to, JSON.stringify(data, null, 2));
    }
    catch (e) {
      console.error('failed to write (' + to + ') with error: ' + e);

    }
  }


  // Make the metadata easier to access in angular by using arrays rather than key/value pairs.
  // Store as an object internally to group examples by component.
  function prepareMeta() {
    var keys = Object.keys(meta);

    return keys.map(function (key) {
      var demos = meta[key];
      var sources = demos.files.slice();
      var readme = demos.readme;
      delete demos.files;
      delete demos.readme;
      var demoKeys = Object.keys(demos);
      var result: any = {
        name: key,
        sources: sources,
        id: selectorString(key),
        examples: demoKeys.map(function (key) {
          demos[key].name = key;
          return demos[key];
        })
      };
      if (readme) {
        result.readme = readme;
      }
      return result;
    });
  }

  // Convert readable string of component + demo to a valid element name that
  // can be inserted into the dom to produce the demo.
  // e.g. "Card Basic Usage" -> "card-basic-usage"
  function selectorString(readableString) {
    return readableString
      .split(' ')
      .map(function (c) {
        return c.toLowerCase();
      })
      .join('-');
  }

  function readableString(snakeCaseString) {
    return snakeCaseString
      .split('_')
      .map(function (c) {
        return c[0].toUpperCase() + c.slice(1);
      })
      .join(' ');
  }

  function fileExists(filePath) {
    try {
      return fs.statSync(filePath).isFile();
    }
    catch (err) {
      return false;
    }
  }
});
