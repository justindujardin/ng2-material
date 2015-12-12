module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sourceRoot: 'ng2-material',
    clean: [
      "lib/",
      "<%- sourceRoot %>/**/*.js",
      "<%- sourceRoot %>/**/*.js.map",
      "<%- sourceRoot %>/**/*.css",
      "<%- sourceRoot %>/**/*.css.map"
    ],
    copy: {
      vendor: {
        files: [
          {
            expand: true,
            src: [
              './node_modules/systemjs/dist/*.js',
              './node_modules/angular2/bundles/angular2.dev.js',
              './node_modules/angular2/typings/**/*'
            ],
            dest: 'vendor/'
          }
        ]
      },
      font: {
        files: [{expand: true, flatten: true, src: ['./public/font/*.*'], dest: 'lib/ng2-material/'}]
      },
      styles: {
        files: [{src: ['<%- sourceRoot %>/all.css'], dest: 'lib/ng2-material/ng2-material.css'}]
      }
    },
    notify: {
      options: {title: 'Material for Angular2'},
      bundle: {options: {message: 'Output Bundle Built'}},
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
        files: [{
          expand: true,
          cwd: '<%- sourceRoot %>',
          dest: '<%- sourceRoot %>',
          src: ["<%- sourceRoot %>/all.scss", "<%- sourceRoot %>/**/*.scss"],
          ext: '.css'
        }]
      }
    },
    watch: {
      sass: {
        files: [
          '<%- sourceRoot %>/**/*.css',
          '<%- sourceRoot %>/*.css',
          'app.css'],
        tasks: ['sass', 'copy:styles', 'notify:styles']
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
    dtsGenerator: {
      options: {
        name: 'ng2-material',
        baseDir: '<%- sourceRoot %>',
        out: 'lib/ng2-material/<%=pkg.name%>.d.ts'
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
  grunt.registerTask('default', ['copy', 'dtsGenerator', 'ts', 'sass']);
  grunt.registerTask('develop', ['default', 'watch']);
  grunt.registerTask('build', ['default', 'dist-bundle']);


  grunt.registerTask('dist-bundle', 'Build a single-file javascript output.', function () {
    var done = this.async();
    var Builder = require('systemjs-builder');
    var builder = new Builder('./', './config.bundle.js');
    builder
      .bundle('ng2-material', 'lib/ng2-material/ng2-material.js', {
        minify: false,
        sourceMaps: true
      })
      .then(function () {
        return builder.bundle('ng2-material', 'lib/ng2-material/ng2-material.min.js', {
          minify: true,
          sourceMaps: true
        });
      })
      .then(function () {
        done();
      });
  });

  grunt.registerTask('docs-meta', 'Build metadata files describing example usages', function () {

  });

};
