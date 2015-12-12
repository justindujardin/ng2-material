/*globals module,process,require */
module.exports = function (config) {
  "use strict";

  var coverageDebug = false;

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/zone.js/dist/zone-microtask.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/es6-module-loader/dist/es6-module-loader.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/reflect-metadata/Reflect.js',
      "config.karma.js",
      {pattern: 'ng2-material/**/*.*', watched: true, included: false},

      {pattern: 'node_modules/angular2/**/*.js', included: false, watched: false},
      {pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false},
      {pattern: 'test/**/*.js', included: false, watched: true},

      "karma.main.js"
    ],
    reporters: ['dots', 'coverage'],
    port: 9876,
    autoWatch: true,
    background: true,
    // - Chrome, ChromeCanary, Firefox, Opera, Safari (only Mac), PhantomJS, IE (only Windows)
    browsers: ['Chrome'],
    browserNoActivityTimeout: 15000,
    singleRun: false,
    reportSlowerThan: 500,
    plugins: [
      'karma-*'
    ],
    exclude: [
      'node_modules/angular2/**/*_spec.js'
    ],
    customLaunchers: {
      TravisChrome: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    preprocessors: (process.env.TRAVIS || coverageDebug) ? {"ng2-material/**/*.js": "coverage"} : {},
    coverageReporter: {
      dir: '.coverage',

      reporters: [
        // reporters not supporting the `file` property
        {type: 'json'},
        {type: 'lcov'}
      ]
    }
  });
};
