System.config({
  baseUrl: './',
  transpiler: 'typescript',
  typescriptOptions: {
    module: "system",
    resolveTypings: true,
    emitDecoratorMetadata: true,
    sourceMap: true,
    inlineSourceMap: false
  },
  meta: {
    'angular2/*': {build: false},
    'rxjs/*': {build: false}
  },
  packages: {
    'ng2-material': {
      main: './all.ts',
      defaultExtension: 'ts'
    },
    'examples': {
      main: './all.ts',
      defaultExtension: 'ts'
    },
    'angular2': {
      baseUrl: './node_modules/angular2/bundles',
      defaultExtension: 'js'
    }
  },
  map: {
    typescript: './node_modules/typescript/lib/typescript.js'
  }
});
