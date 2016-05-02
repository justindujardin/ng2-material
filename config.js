System.config({
  packages: {
    '@angular2-material/core': {
      format: 'cjs',
      defaultExtension: 'js',
      main: 'core.js'
    },
    'ng2-material': {
      defaultExtension: 'js'
    },
    'examples': {
      defaultExtension: 'js'
    }
  },
  map: {
    '@angular2-material/core': 'node_modules/@angular2-material/core'
  },
  baseURL: './'
});
