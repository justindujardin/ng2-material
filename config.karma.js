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
    'rxjs': {
      defaultExtension: 'js'
    }
  },
  map: {
    '@angular': '/base/node_modules/@angular',
    'rxjs': '/base/node_modules/rxjs'
  },
  baseURL: './base/'
};


var packageNames = [
  '@angular/common',
  '@angular/compiler',
  '@angular/core',
  '@angular/http',
  '@angular/material',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/router',
  '@angular/forms',
  '@angular/router',
  '@angular/testing',
  '@angular/upgrade'
];

// add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
packageNames.forEach(function (pkgName) {
  config.packages[pkgName] = {main: 'index.js', defaultExtension: 'js'};
});


System.config(config);
