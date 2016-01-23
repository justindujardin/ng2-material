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
      'karma.ie.shims.js',
      'node_modules/es6-shim/es6-shim.js',
      'node_modules/zone.js/dist/zone-microtask.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/es6-module-loader/dist/es6-module-loader.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/reflect-metadata/Reflect.js',
      "config.karma.js",
      {pattern: 'ng2-material/**/*.*', watched: true, included: false},
      {pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: false, watched: false},
      {pattern: 'node_modules/angular2/**/*.js', included: false, watched: false},
      {pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false},
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
