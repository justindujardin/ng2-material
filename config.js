System.config({
  packages: {
    'ng2-material': {
      defaultExtension: 'js'
    },
    'examples': {
      defaultExtension: 'js'
    }
  },
  map: {
    "angular2/*" : "node_modules/angular2/*"
  },
  baseURL: './'
});
