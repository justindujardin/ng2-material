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
      { pattern: 'node_modules/es6-shim/es6-shim.js', included: true, watched: false },
      { pattern: 'node_modules/zone.js/dist/zone.js', included: true, watched: false },
      { pattern: 'node_modules/reflect-metadata/Reflect.js', included: true, watched: false },
      { pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: true, watched: false },
      { pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: false },
      { pattern: 'node_modules/zone.js/dist/async-test.js', included: true, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/@angular/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/@angular2-material/**/*.js', included: false, watched: false },
      'karma.ie.shims.js',
      "config.karma.js",
      { pattern: 'dist/**/*', included: false, watched: true },
      "karma.main.js"
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
    singleRun: false,
    reportSlowerThan: 500,
    plugins: [
      'karma-*'
    ],

    preprocessors: (process.env.TRAVIS || coverageDebug) ? {"ng2-material/**/*.js": "coverage"} : {},
    coverageReporter: {
      dir: '.coverage',

      reporters: coverageReporters
    }
  });
};
