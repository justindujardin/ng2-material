// Karma configuration
module.exports = function (config) {
  require('./karma.conf')(config);

  // Configuration based on: https://github.com/jashkenas/backbone/blob/master/karma.conf-sauce.js
  var _ = require('underscore');

// Browsers to run on Sauce Labs platforms
  var sauceBrowsers = _.reduce([
    ['firefox', '41'],
    ['firefox', '40'],
    ['firefox', '35'],

    ['chrome', 'beta', 'Windows 8'],
    ['chrome', 'dev', 'Windows 8'],
    ['chrome', '39'],
    ['chrome', '26'],

    ['microsoftedge', '13.10586', 'Windows 10'],
    ['internet explorer', '11', 'Windows 10'],

    ['android', '5.1'],
    ['android', '4.4']

  ], function (memo, platform) {
    // internet explorer -> ie
    var label = platform[0].split(' ');
    if (label.length > 1) {
      label = _.invoke(label, 'charAt', 0)
    }
    label = (label.join("") + '_v' + platform[1]).replace(' ', '_').toUpperCase();
    memo[label] = {
      'base': 'SauceLabs',
      'browserName': platform[0],
      'version': platform[1],
      'platform': platform[2]
    };
    return memo;
  }, {});

  config.set({
    captureTimeout: 240000,
    browserNoActivityTimeout: 120000,

    sauceLabs: {
      testName: 'ng2-material',
      startConnect: true,
      recordVideo: false,
      recordScreenshots: false,
      options: {
        'selenium-version': '2.53.0',
        'command-timeout': 600,
        'idle-timeout': 600,
        'max-duration': 5400
      }
    },

    customLaunchers: sauceBrowsers,

    browsers: Object.keys(sauceBrowsers),

    reporters: ['mocha', 'saucelabs', 'coverage'],

    singleRun: true,

    transports:['polling'],

    plugins: [
      'karma-*'
    ]
  });

  if (process.env.TRAVIS) {
    config.sauceLabs.build = 'TRAVIS #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')';
    config.sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
  }

};
