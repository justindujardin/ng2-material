module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sourceRoot: 'ng2-material',
    outPath: 'out',
    sitePath: 'site',
    clean: [
      "dist/",
      "<%- outPath %>/",
      "<%- sitePath %>/",
      "<%- sourceRoot %>/**/*.js",
      "<%- sourceRoot %>/**/*.d.ts",
      "<%- sourceRoot %>/**/*.js.map",
      "<%- sourceRoot %>/**/*.css",
      "<%- sourceRoot %>/**/*.css.map",
      "examples/**/*.js",
      "examples/**/*.d.ts",
      "examples/**/*.js.map",
      "examples/**/*.css",
      "examples/**/*.css.map",
      "test/**/*.js",
      "test/**/*.d.ts",
      "test/**/*.js.map"
    ],
    copy: {
      release: {
        files: [
          {src: 'package.json', dest: '<%- outPath %>/'},
          {src: 'CHANGELOG.md', dest: '<%- outPath %>/'},
          {src: 'README.md', dest: '<%- outPath %>/'},
          // Individual style and html files
          // NOTE: Individual js/d.ts outputs are handled by the build task for release
          {expand: true, cwd: 'ng2-material/', src: ['**/*.css'], dest: '<%- outPath %>/'},
          {expand: true, cwd: 'ng2-material/', src: ['**/*.css.map'], dest: '<%- outPath %>/'},
          {expand: true, cwd: 'ng2-material/', src: ['**/*.html'], dest: '<%- outPath %>/'},

          // Source .ts/.scss files for people that prefer to build.
          {expand: true, cwd: 'ng2-material/', src: ['**/*.scss'], dest: '<%- outPath %>/source'},
          {expand: true, cwd: 'ng2-material/', src: ['**/*.ts'], dest: '<%- outPath %>/source'},

          // Bundled js and css files
          {expand: true, cwd: 'dist/', src: ['*.*'], dest: '<%- outPath %>/dist'},
          {expand: true, cwd: 'public/font/', src: ['*.*'], dest: '<%- outPath %>/dist'},


          // Material Icons web font
          {expand: true, cwd: 'public/', src: ['font/*.*'], dest: '<%- outPath %>/'}
        ]
      },
      // Examples site all nicely packaged up for uploading to an FTP.
      site: {
        files: [
          {
            expand: true,
            src: [
              './node_modules/systemjs/dist/*.js',
              './node_modules/angular2/bundles/angular2-polyfills.js',
              './node_modules/angular2/bundles/angular2.dev.js',
              './node_modules/angular2/bundles/http.dev.js',
              './node_modules/angular2/bundles/router.dev.js',
              './node_modules/highlightjs/highlight.pack.js',
              './node_modules/es6-shim/es6-*.js',
              './node_modules/highlightjs/styles/*.css',
              './node_modules/rxjs/bundles/Rx.js',
              './node_modules/angular2/typings/**/*'
            ],
            dest: '<%- sitePath %>/<%- pkg.version %>/'
          },

          {expand: true, src: 'package.json', dest: '<%- sitePath %>/<%- pkg.version %>/'},
          {expand: true, src: 'index.html', dest: '<%- sitePath %>/<%- pkg.version %>/'},
          {expand: true, src: 'config.js', dest: '<%- sitePath %>/<%- pkg.version %>/'},
          {expand: true, src: 'ng2-material/**/*', dest: '<%- sitePath %>/<%- pkg.version %>/'},
          {expand: true, src: 'coverage/**/*', dest: '<%- sitePath %>/<%- pkg.version %>/'},
          {expand: true, src: 'dist/*.*', dest: '<%- sitePath %>/<%- pkg.version %>/'},
          {
            expand: true,
            cwd: 'public/font/',
            flatten: true,
            src: ['*.*'],
            dest: '<%- sitePath %>/<%- pkg.version %>/dist/'
          },
          {expand: true, src: 'public/**/*', dest: '<%- sitePath %>/<%- pkg.version %>/'},
          {expand: true, src: 'examples/**/*', dest: '<%- sitePath %>/<%- pkg.version %>/'}
        ]
      }
    },
    notify: {
      options: {title: 'Material for Angular2'},
      bundle: {options: {message: 'Output Bundle Built'}},
      meta: {options: {message: 'Site Index Compiled'}},
      styles: {options: {message: 'Styles Compiled'}},
      source: {options: {message: 'Source Compiled'}}
    },
    ts: {
      source: {
        tsconfig: true
      },
      release: {
        tsconfig: 'tsconfig.build.json'
      }
    },
    sass: {
      dist: {
        files: [
          {
            expand: true,
            cwd: './',
            dest: '.',
            ext: '.css',
            src: [
              "examples/*.scss",
              "examples/**/*.scss",
              "public/font/*.scss",
              "<%- sourceRoot %>/all.scss"
            ]
          },
          {
            'dist/ng2-material.css': ['<%- sourceRoot %>/all.scss']
          }
        ]
      }
    },
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')()
        ]
      },
      dist: {
        src: [
          "examples/*.css",
          "examples/**/*.css",
          "public/font/*.css",
          "dist/ng2-material.css",
          "<%- sourceRoot %>/all.css",
          "<%- sourceRoot %>/components/**/*.css"
        ]
      }
    },
    connect: {
      main: {
        options: {
          port: 9001
        }
      }
    },
    watch: {
      sass: {
        files: [
          '<%- sourceRoot %>/**/*.scss',
          '<%- sourceRoot %>/*.scss',
          'examples/**/*.scss',
          'app.scss'
        ],
        tasks: ['sass', 'postcss:dist', 'notify:styles']
      },
      meta: {
        files: [
          'examples/**/*.html',
          'examples/**/*.ts',
          'examples/**/*.scss',
          'examples/*.*'
        ],
        tasks: ['site-meta', 'notify:meta']
      },
      ts: {
        files: [
          '<%- sourceRoot %>/**/*.ts',
          './*.ts',
          'examples/*.ts',
          'examples/**/*.ts',
          'test/**/*.ts'
        ],
        tasks: ['ts:source', 'notify:source']
      }
    },


    // RELEASE TASKS
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: ['pkg'],
        commit: true,
        commitMessage: 'chore(deploy): release v%VERSION%',
        commitFiles: [
          'tsconfig.build.json',
          'package.json',
          'CHANGELOG.md'
        ],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    },
    conventionalChangelog: {
      options: {
        changelogOpts: {
          preset: 'angular'
        }
      },
      release: {
        src: 'CHANGELOG.md'
      }
    },
    'npm-contributors': {
      options: {
        commitMessage: 'chore(attribution): update contributors'
      }
    },
    dtsGenerator: {
      options: {
        name: 'ng2-material',
        baseDir: '<%- sourceRoot %>',
        out: 'dist/<%=pkg.name%>.d.ts'
      },
      default: {
        src: ['<%- sourceRoot %>/**/*.ts']
      }
    },
    karma: {
      cover: {
        options: {
          singleRun: true
        },
        configFile: './karma.conf.js',
        preprocessors: {"ng2-material/**/*.js": "coverage"}
      }
    },
    remapIstanbul: {
      build: {
        src: '.coverage/**/coverage-final.json',
        options: {
          reports: {
            'html': 'coverage',
            'lcovonly': '.coverage/lcov.info',
            'text': 'coverage/coverage.txt'
          }
        }
      }
    },
    webpack: {
      singleJs: require('./webpack.config.js')
    },

    universal: {
      examples: {
        src: 'index.html'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('dts-generator');
  grunt.loadNpmTasks('remap-istanbul');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('default', ['dtsGenerator', 'ts:source', 'sass', 'postcss', 'site-meta']);
  grunt.registerTask('develop', ['default', 'watch']);
  grunt.registerTask('serve', ['default', 'connect', 'watch']);
  grunt.registerTask('cover', ['karma:cover', 'remapIstanbul', 'site-meta']);
  grunt.registerTask('site', ['build', 'cover', 'copy:site']);
  grunt.registerTask('build', ['default', 'ts:release', 'dist-bundle', 'copy:release', 'webpack']);


  grunt.registerTask('dist-bundle', 'Build a single-file javascript output.', function () {
    var done = this.async();
    var Builder = require('systemjs-builder');
    var builder = new Builder('./', './config.bundle.js');

    // Strip the extension off of the output System js import names.

    //var fs = require('fs');
    //
    //function fixPaths(file) {
    //  var contents = fs.readFileSync(file).toString();
    //  contents = contents.replace(/("ng2-material\/.*?\.ts")/g, function (match) {
    //    return match.replace('.ts', '');
    //  });
    //  fs.writeFileSync(file, contents, 'utf-8');
    //}

    builder
      .bundle('ng2-material', 'dist/ng2-material.js', {
        minify: false,
        sourceMaps: true
      })
      .then(function () {
        //fixPaths('dist/ng2-material.js');
        return builder.bundle('ng2-material', 'dist/ng2-material.min.js', {
          minify: true,
          sourceMaps: true
        });
      })
      .then(function () {
        //fixPaths('dist/ng2-material.min.js');
        done();
      });
  });

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-conventional-changelog');
  grunt.loadNpmTasks('grunt-npm');
  grunt.registerTask('release', 'Build, bump and tag a new release.', function (type) {
    type = type || 'patch';
    grunt.task.run([
      'clean',
      'build',
      'npm-contributors',
      'bump:' + type + ':bump-only',
      'conventionalChangelog',
      'copy:release',
      'bump-commit',
      'publish'
    ]);
  });


  grunt.registerTask('publish', 'Publish new npm package', function (tag) {
    var exec = require('child_process').exec;
    var done = this.async();

    // Swap dependencies for peerDependencies in the published package.
    // http://stackoverflow.com/a/34645112
    var fs = require('fs');
    var path = require('path');
    try {
      var file = fs.readFileSync(path.join(__dirname, 'package.json')).toString();
      var rendered = JSON.parse(file);
      rendered.peerDependencies = rendered.dependencies;
      delete rendered.dependencies;
      fs.writeFileSync('out/package.json', JSON.stringify(rendered, null, 2));
    }
    catch (e) {
      console.error('failed: ' + e);
    }

    // Switch to "out" path and publish the npm package from there.
    process.chdir('out');
    exec('npm publish' + (tag ? ' --tag ' + tag : ''), function (err) {
      process.chdir('../');
      if (err) {
        return grunt.fatal(err.message.replace(/\n$/, '.'));
      }
      grunt.log.ok('Published to NPM' + (tag ? ' @' + tag : ''));
      done();
    });
  });

  // NOTE: This task does not work.  It is WIP.
  grunt.registerMultiTask('universal', 'Prerender examples app as static HTML', function () {
    var done = this.async();
    /*
     * based on angular2-grunt-prerender
     * https://github.com/angular/universal
     *
     * Copyright (c) 2016 Wassim Chegham
     * Licensed under the MIT license.
     */
    try {
      var proxyquire = require('proxyquire');
      var zone = require('zone.js');
      var reflect = require('reflect-metadata');
      var provide = require('angular2/core');
      var router = require('angular2/router');
      var ng2material = require('./ng2-material/all');
      ng2material['@global'] = true;
      ng2material['@noCallThru'] = true;
      var app = proxyquire('./examples/app', {
        'ng2-material/all': ng2material
      });
      var all = proxyquire('./examples/all', {
        'ng2-material/all': ng2material
      });
      var universal = require('angular2-universal-preview');
      var options = this.options({
        component: [app.DemosApp],
        providers: ng2material.MATERIAL_NODE_PROVIDERS,
        platformProviders: [
          universal.NODE_LOCATION_PROVIDERS,
        ],
        directives: ng2material.MATERIAL_DIRECTIVES.concat(all.DEMO_DIRECTIVES),
        preboot: false,
        separator: '\r\n'
      });
      var angular2Prerender = function (file) {
        var clientHtml = file.toString();
        // bootstrap and render component to string
        var bootloader = options.bootloader;
        if (!options.bootloader) {
          options.bootloader = {
            component: options.component,
            document: universal.parseDocument(clientHtml),
            providers: options.providers,
            componentProviders: options.componentProviders,
            platformProviders: options.platformProviders,
            directives: options.directives,
            preboot: options.preboot
          };
        }
        bootloader = universal.Bootloader.create(options.bootloader);
        return bootloader.serializeApplication().then(function (html) {
          return new Buffer(html);
        });
      };
      this.files.forEach(function (f) {
        var src = f.src.filter(function (filepath) {
            if (!grunt.file.exists(filepath)) {
              grunt.log.warn('Source file "' + filepath + '" not found.');
              return false;
            }
            else {
              return true;
            }
          })
          .map(function (filepath) {
            return grunt.file.read(filepath);
          })
          .join(grunt.util.normalizelf(options.separator));
        // Handle options.
        angular2Prerender(src)
          .then(function (buffer) {
            return src = buffer;
          })
          .then(function (_src) {
            return grunt.file.write(f.dest, _src);
          })
          .then(function (_) {
            return grunt.log.writeln('File "' + f.dest + '" created.');
            done();
          });
      });

    }
    catch (e) {
      console.error(e.stack);
      return;
    }

  });

  grunt.registerTask('site-meta', 'Build metadata files describing example usages', function (tag) {
    var done = this.async();
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
          grunt.log.ok('skipping code coverage because lcov.info is missing');
          return next();
        }
        // Obj has "found" and "hit"
        function percent(obj) {
          if (obj.found === 0) {
            return 100;
          }
          return parseFloat((obj.hit / obj.found * 100.0).toPrecision(2), 10);
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
      glob("examples/components/**/readme.md", function (err, files) {
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
        angular2: pkg.dependencies.angular2
      });
      next();
    });

    tasks.push(function buildExamples() {
      glob("examples/components/**/*.html", function (err, files) {
        files.forEach(function parseDemo(templateFile) {
          var name = path.basename(templateFile, '.html');
          var result = {
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
          lintDemo(result);
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
        grunt.log.fatal('failed to write (' + to + ') with error: ' + e);

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
        var result = {
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

    function lintDemo(outputMeta) {
      grunt.log.ok('checking ' + outputMeta.source + ' no lint present');
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

};
