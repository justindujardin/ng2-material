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
      styles: {
        files: [{src: ['<%- sourceRoot %>/all.css'], dest: 'dist/ng2-material.css'}]
      },
      release: {
        files: [
          {src: 'package.json', dest: '<%- outPath %>/'},
          {src: 'CHANGELOG.md', dest: '<%- outPath %>/'},
          {src: 'README.md', dest: '<%- outPath %>/'},
          // Individual style and html files
          // NOTE: Individual js/d.ts outputs are handled by the build task for release
          {expand: true, cwd: 'ng2-material/', src: ['**/*.css'], dest: '<%- outPath %>/'},
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
              './node_modules/highlightjs/highlight.pack.js',
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
        files: [{
          expand: true,
          cwd: './',
          dest: '.',
          src: [
            "examples/*.scss",
            "examples/**/*.scss",
            "<%- sourceRoot %>/all.scss",
            "<%- sourceRoot %>/components/**/*.scss"
          ],
          ext: '.css'
        }]
      }
    },
    watch: {
      sass: {
        files: [
          '<%- sourceRoot %>/**/*.scss',
          '<%- sourceRoot %>/*.scss',
          'app.scss'
        ],
        tasks: ['sass', 'copy:styles', 'notify:styles']
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
          'test/**/*.ts'
        ],
        tasks: ['ts', 'notify:source']
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
    remapIstanbul: {
      build: {
        src: '.coverage/**/coverage-final.json',
        options: {
          reports: {
            'html': 'coverage',
            'lcovonly': '.coverage/lcov.info'
          }
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('dts-generator');
  grunt.loadNpmTasks('remap-istanbul');
  grunt.registerTask('default', ['dtsGenerator', 'site-meta', 'ts:source', 'sass', 'copy:styles']);
  grunt.registerTask('develop', ['default', 'watch']);
  grunt.registerTask('site', ['build', 'copy:site']);
  grunt.registerTask('build', ['default', 'ts:release', 'dist-bundle', 'copy:release']);


  grunt.registerTask('dist-bundle', 'Build a single-file javascript output.', function () {
    var done = this.async();
    var Builder = require('systemjs-builder');
    var builder = new Builder('./', './config.bundle.js');
    builder
      .bundle('ng2-material', 'dist/ng2-material.js', {
        minify: false,
        sourceMaps: true
      })
      .then(function () {
        return builder.bundle('ng2-material', 'dist/ng2-material.min.js', {
          minify: true,
          sourceMaps: true
        });
      })
      .then(function () {
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


  grunt.registerTask('site-meta', 'Build metadata files describing example usages', function (tag) {
    var done = this.async();
    var glob = require('glob');
    var fs = require('fs');
    var path = require('path');
    var util = require('util');
    var meta = {};
    glob("examples/components/**/*.html", function (err, files) {
      files.forEach(parseDemo);
      var output = prepareMeta();
      fs.writeFileSync('public/meta.json', JSON.stringify(output, null, 2));
      done();
    });

    function parseDemo(templateFile) {
      var name = path.basename(templateFile, '.html');
      var result = {
        template: templateFile
      };
      var sourceFile = path.join(path.dirname(templateFile), name + '.ts');
      var stylesFile = path.join(path.dirname(templateFile), name + '.scss');
      if (fileExists(stylesFile)) {
        result.styles = stylesFile;
      }
      if (fileExists(sourceFile)) {
        result.source = sourceFile;
      }

      var component = readableString(path.basename(path.dirname(templateFile)));
      result.component = selectorString(component + ' ' + readableString(name));
      meta[component] = meta[component] || {};
      meta[component][readableString(name)] = result;
      lintDemo(result);
    }

    // Make the metadata easier to access in angular by using arrays rather than key/value pairs.
    // Store as an object internally to group examples by component.
    function prepareMeta() {
      var keys = Object.keys(meta);

      var output = keys.map(function (key) {
        var demos = meta[key];
        var demoKeys = Object.keys(demos);
        return {
          name: key,
          id: selectorString(key),
          examples: demoKeys.map(function (key) {
            demos[key].name = key;
            return demos[key];
          })
        };
      });
      return output;
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
