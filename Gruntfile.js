module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sourceRoot: 'src',
    outPath: 'dist',
    sitePath: 'site',
    clean: [
      "dist/",
      "<%- outPath %>/",
      "<%- sitePath %>/",
      "<%- sourceRoot %>/**/*.js",
      "<%- sourceRoot %>/**/*.d.ts",
      "<%- sourceRoot %>/**/*.js.map",
      "<%- sourceRoot %>/**/*.css",
      "<%- sourceRoot %>/**/*.css.map"
    ],
    copy: {
      npm: {
        files: [
          {src: 'package.json', dest: '<%- outPath %>/'},
          {src: 'CHANGELOG.md', dest: '<%- outPath %>/'},
          {src: 'README.md', dest: '<%- outPath %>/'},
          {expand: true, cwd: 'src/', src: ['**/*.scss'], dest: '<%- outPath %>/'},
          {expand: true, cwd: 'src/', src: ['**/*.ts'], dest: '<%- outPath %>/src'},
          {expand: true, cwd: 'public/', src: ['font/*.*'], dest: '<%- outPath %>/'}
        ]
      },
      site_deps_update: {
        files: [{
          expand: true,
          cwd: 'dist/',
          src: '**',
          dest: 'modules/site/node_modules/ng2-material/'
        }]
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
          {expand: true, src: 'src/**/*', dest: '<%- sitePath %>/<%- pkg.version %>/'},
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
          {expand: true, src: 'example/**/*', dest: '<%- sitePath %>/<%- pkg.version %>/'}
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
        src: ["dist/*.css"]
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
          '<%- sourceRoot %>/*.scss'
        ],
        tasks: ['sass', 'postcss:dist', 'notify:styles']
      },
      meta: {
        files: [
          'modules/site/src/**/*.*',
          'src/**/*.md',
          'package.json'
        ],
        tasks: ['site-meta', 'build-npm-package', 'notify:meta']
      },
      ts: {
        files: [
          '<%- sourceRoot %>/**/*.ts'
        ],
        tasks: ['ts:source', 'rewrite-source-maps', 'notify:source']
      },
      karma: {
        files: [
          '<%- sourceRoot %>/**/*.ts'
        ],
        tasks: ['karma']
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

    karma: {
      cover: {
        options: {
          singleRun: true
        },
        configFile: './karma.conf.js'
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
    }
  });

  grunt.loadNpmTasks('grunt-continue');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('remap-istanbul');
  grunt.registerTask('default', ['ts', 'sass', 'postcss', 'site-meta', 'rewrite-source-maps']);
  grunt.registerTask('develop', ['default', 'watch']);
  grunt.registerTask('serve', ['default', 'connect', 'watch']);
  grunt.registerTask('cover', ['karma:cover', 'remapIstanbul', 'site-meta']);
  grunt.registerTask('site', ['build', 'cover', 'copy:site']);
  grunt.registerTask('build', ['default', 'copy:npm', 'copy:site_deps_update']);
  grunt.registerTask('tddTasks', ['ts', 'continue:on', 'karma']);
  grunt.registerTask('tdd', ['tddTasks', 'watch']);

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
      'copy:npm',
      'bump-commit',
      'publish'
    ]);
  });

  grunt.registerTask('build-npm', ['build', 'build-npm-package', 'rewrite-source-maps']);
  grunt.registerTask('build-npm-package', function () {
    var fs = require('fs');
    var path = require('path');
    try {
      var file = fs.readFileSync(path.join(__dirname, 'package.json')).toString();
      var rendered = JSON.parse(file);

      // Swap dependencies for peerDependencies in the published package.
      // http://stackoverflow.com/a/34645112
      rendered.peerDependencies = rendered.dependencies;
      delete rendered.dependencies;

      // The installed package shouldn't do any postinstall stuff
      delete rendered.scripts;

      fs.writeFileSync('dist/package.json', JSON.stringify(rendered, null, 2));
    }
    catch (e) {
      console.error('failed: ' + e);
    }
  });
  grunt.registerTask('rewrite-source-maps', function () {
    var done = this.async();
    var glob = require('glob');
    var fs = require('fs');
    var path = require('path');
    // Rewrite source maps to match NPM directory structure
    // replace "../src/" with "src/" in glob("dist/**/*.js.map")
    glob("dist/**/*.js.map", function (err, files) {
      files.forEach(function rewriteSourceMap(sourceMapFileName) {
        const data = fs.readFileSync(sourceMapFileName).toString();
        fs.writeFileSync(sourceMapFileName,data.replace("../src/", "src/"));
      });
      done();
    });

  });

  grunt.registerTask('publish', 'Publish new npm package', function (tag) {
    var exec = require('child_process').exec;
    var done = this.async();

    // Switch to "dist" path and publish the npm package from there.
    process.chdir('dist');
    exec('npm publish' + (tag ? ' --tag=' + tag : ''), function (err) {
      process.chdir('../');
      if (err) {
        return grunt.fatal(err.message.replace(/\n$/, '.'));
      }
      grunt.log.ok('Published to NPM' + (tag ? ' @' + tag : ''));
      done();
    });
  });

  grunt.registerTask('site-meta', 'Build metadata files describing example usages', function (tag) {
    var done = this.async();
    var glob = require('glob');
    var fs = require('fs');
    var path = require('path');
    var util = require('util');
    var marked = require('marked');
    var npm = require("npm");
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

    function ifError(err) {
      if (err) {
        return grunt.fatal(err.message.replace(/\n$/, '.'));
      }
    }

    // npm.load({loaded: false}, function (err) {
    //   ifError(err);
    //   var file = fs.readFileSync(path.join(__dirname, 'package.json')).toString();
    //   var rendered = JSON.parse(file);
    //   var depNames = Object.keys(rendered.dependencies);
    //   console.log('--> Getting version information for (' + depNames.length + ') package dependencies');
    //   depNames.forEach(function (packageName) {
    //     const version = rendered.dependencies[packageName];
    //     tasks.push(function getComponentVersions() {
    //       var save = process.stdout.write;
    //       // NPM will write all of the stuff we query to the console
    //       // so go ahead and suppress the duplicate output.
    //       process.stdout.write = function (msg) {
    //       };
    //       // catch errors
    //       npm.commands.info([packageName], function (err, data) {
    //         ifError(err);
    //         process.stdout.write = save;
    //         console.log('    ' + packageName + ' (' + version + ') OK');
    //         // console.log(data);
    //         next();
    //       });
    //     });
    //   });
    //   // Once we've queried the dependent components, kick off the tasks
    //   next();
    // });

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
        writeJson('modules/site/public/coverage.json', outMeta);
        next();
      });
    });


    // Copy Readme for official components BEFORE rendering readme markdown files.
    tasks.push(function buildComponentDocumentation() {
      glob("src/components/**/readme.md", function (err, files) {
        files.forEach(function parseReadme(readmeFile) {
          var component = readableString(path.basename(path.dirname(readmeFile)));
          var data = fs.readFileSync(readmeFile).toString();
          meta[component] = meta[component] || {};
          meta[component].documentation = marked(data);
        });
        next();
      });
    });

    tasks.push(function buildReadmeFiles() {
      glob("modules/site/src/app/examples/**/readme.md", function (err, files) {
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
      var data = {
        version: pkg.version,
        readme: rendered
      };
      Object.keys(pkg.dependencies).forEach(function (depKey) {
        data[depKey] = pkg.dependencies[depKey];
      });
      writeJson('modules/site/public/version.json', data);
      next();
    });

    tasks.push(function buildExamples() {
      const pathPrefix = 'modules/site/src/';
      glob(pathPrefix + "app/examples/**/*.html", function (err, files) {
        files.forEach(function parseDemo(templateFile) {
          var name = path.basename(templateFile, '.html');
          var result = {
            template: fs.readFileSync(templateFile).toString()
          };
          var readmeFile = path.join(path.dirname(templateFile), name + '.md');
          var sourceFile = path.join(path.dirname(templateFile), name + '.ts');
          var stylesFile = path.join(path.dirname(templateFile), name + '.scss');
          if (fileExists(stylesFile)) {
            result.styles = fs.readFileSync(stylesFile).toString();
          }
          if (fileExists(sourceFile)) {
            result.source = fs.readFileSync(sourceFile).toString();
          }
          if (fileExists(readmeFile)) {
            result.readme = marked(fs.readFileSync(readmeFile).toString());
          }

          var component = readableString(path.basename(path.dirname(templateFile)));
          var readable = readableString(name).replace('.component', '');
          result.component = selectorString(readable);
          meta[component] = meta[component] || {};
          meta[component].files = [];
          meta[component][readable] = result;
          lintDemo(result);
        });


        glob("src/components/**/*.ts", function (err, files) {
          files.forEach(function linkComponentsToExamples(sourceFile) {
            var component = readableString(path.basename(path.dirname(sourceFile)));
            if (!meta[component]) {
              return;
            }
            meta[component].files.push(sourceFile);
          });
          writeJson('modules/site/public/meta.json', prepareMeta());
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
        var componentDocs = demos.documentation;
        delete demos.files;
        delete demos.readme;
        delete demos.documentation;
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
        if (componentDocs) {
          result.documentation = componentDocs;
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

    function readableString(hyphenatedString) {
      return hyphenatedString
        .split('-')
        .map(function (c) {
          return c[0].toUpperCase() + c.slice(1);
        })
        .join(' ');
    }

    function lintDemo(outputMeta) {
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
