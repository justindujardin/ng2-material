System.config({
  baseUrl: './',
  transpiler: 'typescript',
  typescriptOptions: {
    resolveTypings: true,
    emitDecoratorMetadata: true,
    sourceMap: true,
    inlineSourceMap: false
  },
  packages: {
    'ng2-material': {
      main: './all.ts',
      defaultExtension: 'ts'
    }
  },
  map: {
    typescript: './node_modules/typescript/lib/typescript.js'
  },
  paths: {
    "angular2/*": "./node_modules/angular2/bundles/angular2.dev.js"
  },
  defaultJSExtensions: true
});
