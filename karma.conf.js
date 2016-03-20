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
      {pattern: 'node_modules/es6-shim/es6-shim.min.js', included: true, watched: true},
      {pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: true, watched: true},
      'karma.ie.shims.js',

      // Angular 2 polyfills *must* be loaded after es6-shim and system-polyfills in order to
      // setup the monkey-patches for zones.
      {pattern: 'node_modules/angular2/bundles/angular2-polyfills.js', included: true, watched: true},
      {pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: true},
      {pattern: 'node_modules/rxjs/bundles/Rx.js', included: true, watched: true},
      'node_modules/reflect-metadata/Reflect.js',
      {pattern: 'node_modules/angular2/**/*.js', included: false, watched: false},
      {pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false},
      "config.karma.js",
      {pattern: 'ng2-material/**/*.*', watched: true, included: false},
      {pattern: 'test/**/*.js', included: false, watched: true},

      "karma.main.js"
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
    exclude: [
      'node_modules/angular2/**/*_spec.js'
    ],

    preprocessors: (process.env.TRAVIS || coverageDebug) ? {"ng2-material/**/*.js": "coverage"} : {},
    coverageReporter: {
      dir: '.coverage',

      reporters: coverageReporters
    }
  });
};
