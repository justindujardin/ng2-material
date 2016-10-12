/*globals module,process,require */
module.exports = function (config) {
  "use strict";

  var coverageDebug = false;

  var coverageReporters = [
    {type: 'json'},
    {type: 'lcov'}
  ];
  if (coverageDebug || process.env.TRAVIS) {
    coverageReporters.push({type: 'text'});
  }

  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    files: [
      // System.js for module loading
      'node_modules/systemjs/dist/system.src.js',

      // Polyfills
      'node_modules/core-js/client/shim.js',
      'node_modules/reflect-metadata/Reflect.js',

      // zone.js
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/proxy.js',
      'node_modules/zone.js/dist/sync-test.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',

      // RxJs
      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

      // Paths loaded via module imports:
      // Angular itself
      {pattern: 'node_modules/@angular/**/*.js', included: false, watched: false},
      {pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false},

      {pattern: 'systemjs.config.js', included: false, watched: false},
      {pattern: 'systemjs.config.extras.js', included: false, watched: false},
      'karma.ie.shims.js',

      { pattern: 'dist/*.*', included: false, watched: true },
      { pattern: 'dist/components/**/*.js', included: false, watched: true },
      { pattern: 'dist/core/**/*.js', included: false, watched: true },
      { pattern: 'dist/platform/**/*.js', included: false, watched: true },
      "karma-test-shim.js"
    ],
    exclude: [
      // Vendor packages might include spec files. We don't want to use those.
      'node_modules/**/*.spec.js'
    ],
    reporters: ['mocha', 'coverage'],
    port: 9876,
    autoWatch: true,
    background: true,
    // - Chrome, ChromeCanary, Firefox, Opera, Safari (only Mac), PhantomJS, IE (only Windows)
    browsers: process.env.TRAVIS ? ['Firefox'] : ['Chrome'],
    browserNoActivityTimeout: 15000,
    singleRun: true,
    reportSlowerThan: 500,
    plugins: [
      'karma-*'
    ],

    preprocessors: (process.env.TRAVIS || coverageDebug) ? {
      "dist/!(*spec).js": "coverage",
      "dist/components/**/!(*spec).js": "coverage",
      "dist/core/**/!(*spec).js": "coverage"
    } : {},
    coverageReporter: {
      dir: '.coverage',
      reporters: coverageReporters
    }
  });
};
