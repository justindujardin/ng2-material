var path = require('path');
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sourceRoot: 'src',
    // The root path for the example site source
    siteRoot: 'site',
    outPath: 'dist',
    // The path to build a static output site into
    sitePath: '.build/site/',
    clean: [
      "dist/",
      "<%- outPath %>/",
      "<%- sitePath %>/",
      "public/site",
      "public/src",
      "public/vendor",
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
          {expand: true, cwd: 'src/', src: ['**/*.ts'], dest: '<%- outPath %>/src'}
        ]
      },
      siteResources: {
        files: [
          {
            expand: true,
            src: [
              "./site/**/*.css",
              "./site/**/*.html"
            ],
            dest: 'public/'
          }
        ]
      },

      // Copy dist/ folder into public node_modules path
      dist: {
        files: [{
          expand: true,
          cwd: '<%- outPath %>/',
          src: ['**/*'],
          dest: 'public/vendor/node_modules/ng2-material/'
        }]
      },

      // node_modules to public path
      vendor: {
        files: [
          {
            expand: true,
            src: [
              "./node_modules/core-js/client/shim.min.js",
              "./node_modules/zone.js/dist/zone.js",
              "./node_modules/reflect-metadata/Reflect.js",
              "./node_modules/systemjs/dist/system.src.js",
              './node_modules/@angular/**/bundles/*',
              './node_modules/@angular/**/*.umd.js',
              './node_modules/highlightjs/highlight.pack.js',
              './node_modules/highlightjs/styles/*.css',
              './node_modules/rxjs/**/*.js'
            ],
            dest: 'public/vendor/'
          }
        ]
      }
    },
    notify: {
      options: {title: 'ng2-material'},
      bundle: {options: {message: 'Output Bundle Built'}},
      meta: {options: {message: 'Site Index Compiled'}},
      styles: {options: {message: 'Styles Compiled'}},
      site: {options: {message: 'Site Compiled'}},
      source: {options: {message: 'Source Compiled'}}
    },
    ts: {
      options: {
        compiler: './node_modules/.bin/tsc'
      },
      source: {
        tsconfig: true
      },
      site: {
        tsconfig: './tsconfig.site.json'
      }
    },
    sass: {
      options: {
        // This importer does two things:
        //
        // 1. Replace "~" with "node_modules" to support "@import '~ng2-material/all';" style imports
        // 2. Add scss extension to files that have no extension. This works around: https://github.com/sass/node-sass/issues/1222
        importer: function importer(url, prev, done) {
          if (url[0] === '~') {
            url = path.resolve('node_modules', url.substr(1));
          }
          if (path.extname(url) === '') {
            url = url + '.scss';
          }
          return {file: url};
        }
      },
      dist: {
        files: [
          {
            'dist/ng2-material.css': '<%- sourceRoot %>/all.scss'
          }
        ]
      },
      siteGlobal: {
        files: [
          {
            'public/site/styles.css': '<%- siteRoot %>/app/app.global.scss'
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
      },
      siteGlobal: {
        src: ["public/site/app/app.global.css"]
      }
    },
    connect: {
      main: {
        options: {
          port: 9001,
          base: 'public'
        }
      }
    },
    watch: {
      sass: {
        files: [
          '<%- sourceRoot %>/**/*.scss',
          '<%- sourceRoot %>/*.scss'
        ],
        tasks: ['sass:dist', 'postcss:dist', 'notify:styles']
      },
      siteGlobal: {
        files: [
          '<%- siteRoot %>/**/*.global.scss'
        ],
        tasks: ['sass:siteGlobal', 'postcss:siteGlobal', 'notify:styles']
      },
      meta: {
        files: [
          '/site/app/**/*.*',
          'package.json'
        ],
        tasks: ['site-meta', 'build-npm-package', 'notify:meta']
      },
      ts: {
        files: [
          '<%- sourceRoot %>/**/*.ts'
        ],
        tasks: ['ts:source', 'rewrite-source-maps', 'copy:dist', 'notify:source']
      },
      tsSite: {
        files: [
          '<%- siteRoot %>/**/*.ts'
        ],
        tasks: ['ts:site', 'rewrite-source-maps', 'notify:site']
      },
      siteResources: {
        files: [
          '<%- siteRoot %>/**/*.html',
          '<%- siteRoot %>/**/*.css'
        ],
        tasks: ['copy:siteResources', 'notify:site']
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
  grunt.registerTask('default', ['ts', 'sass', 'postcss', 'site-meta', 'rewrite-source-maps', 'copy']);
  grunt.registerTask('develop', ['default', 'watch']);
  grunt.registerTask('serve', ['default', 'connect', 'watch']);
  grunt.registerTask('cover', ['karma:cover', 'remapIstanbul', 'site-meta']);

  grunt.registerTask('tddTasks', ['ts', 'continue:on', 'karma']);
  grunt.registerTask('tdd', ['tddTasks', 'watch']);

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-conventional-changelog');
  grunt.loadNpmTasks('grunt-npm');
  grunt.registerTask('release', 'Build, bump and tag a new release.', function (type) {
    type = type || 'patch';
    grunt.task.run([
      'clean',
      'default',
      'npm-contributors',
      'bump:' + type + ':bump-only',
      'conventionalChangelog',
      'copy:npm',
      'bump-commit',
      'publish'
    ]);
  });

  grunt.registerTask('build-npm', ['build-npm-package', 'rewrite-source-maps']);

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
        fs.writeFileSync(sourceMapFileName, data.replace("../src/", "src/"));
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

    // Replace relative import statements with "ng2-material" based paths
    function patchImports(textContent) {
      // Any relative match to src/[child]/
      const regex = /(\.\.\/)+src\/[a-z\-]+\//g;
      // ../../src/components/data-table -> ng2-material/components/data-table
      // ../../../src/core/util/ink -> ng2-material/core/util/ink
      return textContent.replace(regex, 'ng2-material/');
    }

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
      glob("site/app/examples/**/readme.md", function (err, files) {
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
      writeJson('public/version.json', data);
      next();
    });

    tasks.push(function buildExamples() {
      const pathPrefix = 'site/';
      glob(pathPrefix + "app/examples/**/*.html", function (err, files) {
        files.forEach(function parseDemo(templateFile) {
          var name = path.basename(templateFile, '.html');
          var result = {
            template: fs.readFileSync(templateFile).toString()
          };
          var readmeFile = path.join(path.dirname(templateFile), name + '.md');
          var sourceFile = path.join(path.dirname(templateFile), name + '.ts');
          var stylesFile = path.join(path.dirname(templateFile), name + '.css');
          if (fileExists(stylesFile)) {
            result.styles = patchImports(fs.readFileSync(stylesFile).toString());
          }
          if (fileExists(sourceFile)) {
            result.source = patchImports(fs.readFileSync(sourceFile).toString());
          }
          if (fileExists(readmeFile)) {
            result.readme = marked(fs.readFileSync(readmeFile).toString());
          }

          // Output module will be in the same path, but with a JS extension.
          result.module = sourceFile.replace('.ts', '.js');


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
        grunt.log.error('failed to write (' + to + ') with error: ' + e);

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
