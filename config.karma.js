var config = {
  packages: {
    'dist': {
      defaultExtension: 'js'
    },
    'src': {
      defaultExtension: 'js'
    },
    '@angular': {
      defaultExtension: 'js'
    },
    '@angular2-material': {
      defaultExtension: 'js'
    },
    'rxjs': {
      defaultExtension: 'js'
    }
  },
  map: {
    '@angular': '/base/node_modules/@angular',
    '@angular2-material': '/base/node_modules/@angular2-material',
    'rxjs': '/base/node_modules/rxjs'
  },
  baseURL: './base/'
};


var packageNames = [
  '@angular/common',
  '@angular/compiler',
  '@angular/core',
  '@angular/http',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/router',
  '@angular/forms',
  '@angular/router',
  '@angular/testing',
  '@angular/upgrade'
];

var material2Packages = [
  'core', 'checkbox'
];
material2Packages.forEach(function (pkgName) {
  config.packages['@angular2-material/' + pkgName] = {main: pkgName + '.js', defaultExtension: 'js', format: 'cjs'}
});

// add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
packageNames.forEach(function (pkgName) {
  config.packages[pkgName] = {main: 'index.js', defaultExtension: 'js'};
});


System.config(config);
