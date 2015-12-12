System.config({
  packages: {
    'test': {
      defaultExtension: 'js'
    },
    'ng2-material': {
      defaultExtension: 'js'
    },
    'angular2': {
      defaultExtension: 'js'
    },
    'rxjs': {
      defaultExtension: 'js'
    }
  },
  map: {
    'angular2': '/base/node_modules/angular2',
    'rxjs': '/base/node_modules/rxjs'
  },
  baseURL: './base/'
});
