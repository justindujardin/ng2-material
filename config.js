System.config({
  packages: {
    'ng2-material': {
      defaultExtension: 'js'
    },
    'examples': {
      defaultExtension: 'js'
    },
    'rxjs': {
      defaultExtension: 'js'
    }
  },
  map: {
    "rxjs": "node_modules/rxjs",
    "angular2/*" : "node_modules/angular2/*"
  },
  baseURL: './'
});
