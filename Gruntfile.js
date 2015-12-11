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
    notify: {
      options: {title: 'Material for Angular2'},
      styles: {options: {message: 'Styles Compiled.'}},
      source: {options: {message: 'Source Compiled.'}}
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
    'http-server': {
      dev: {
        root: 'public',
        port: 8282,
        host: 'localhost',
        ext: 'html',
        runInBackground: true,
        https: true,
        openBrowser: true
      }
    },
    watch: {
      sass: {
        files: ['<%- sourceRoot %>/**/*.scss'],
        tasks: ['sass', 'notify:styles']
      },
      ts: {
        files: ['<%- sourceRoot %>/**/*.ts'],
        tasks: ['ts', 'notify:source']
      }
    }
  });

  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-ts');
  grunt.registerTask('default', ['ts', 'sass']);
  grunt.registerTask('develop-ide', ['default', 'http-server']);
  grunt.registerTask('develop', ['develop-ide', 'watch']);


  grunt.registerTask('dist-bundle', 'Build a single-file javascript output.', function () {
    var done = this.async();
    var Builder = require('systemjs-builder');
    var builder = new Builder('./', './config.js');
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


};
