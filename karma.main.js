// Sourced from: https://github.com/mgechev/angular2-seed -- check it out.

// Tun on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;

// Cancel Karma's synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function () {
};

System
  .import('dist/platform/testing/bootstrap').then(function (tests) {
    return tests.load(window.__karma__.files);
  })
  .then(function () {
    __karma__.start();
  }, function (error) {
    console.error(error.stack || error);
    __karma__.start();
  });

