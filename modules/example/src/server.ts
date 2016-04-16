import * as path from "path";
import * as express from "express";
import "angular2-universal/polyfills";
import {
  expressEngine,
  REQUEST_URL,
  NODE_ROUTER_PROVIDERS,
  NODE_HTTP_PROVIDERS,
  queryParamsToBoolean,
  BASE_URL
} from "angular2-universal";
import {provide, enableProdMode} from "angular2/core";
import {APP_BASE_HREF} from "angular2/router";
import {App} from "./app";
import {UrlResolver} from "angular2/compiler";
import {MATERIAL_NODE_PROVIDERS, MATERIAL_DIRECTIVES} from "ng2-material/all";
import {DEMO_PROVIDERS, DEMO_DIRECTIVES} from "./all";

// Angular 2

export class NodeUrlResolver extends UrlResolver {
  resolve(baseUrl: string, url: string): string {
    return `file://${path.resolve(path.join(baseUrl, url))}`;
  }
}

var serveStatic = require('serve-static');
var Router = express.Router;
var http = require('http');

let ROOT = path.resolve(path.join(__dirname, '../'));
var router = Router();
var app = express();

enableProdMode();

var SERVER_IP = '127.0.0.1';
var port = process.env.PORT || 3000;


app.engine('html', expressEngine);
app.set('views', ROOT);
app.set('view engine', 'html');
app.set('view options', {doctype: 'html'});
app.set('json spaces', 2);


function ngRouter(req, res) {
  let baseUrl = '/';
  let url = req.originalUrl.replace(baseUrl, '') || '/';
  let queryParams: any = queryParamsToBoolean(req.query);

  let options = Object.assign(queryParams, {
    directives: [App, MATERIAL_DIRECTIVES, DEMO_DIRECTIVES],
    providers: [
      provide(APP_BASE_HREF, {useValue: baseUrl}),
      provide(BASE_URL, {useValue: path.resolve(__dirname)}),
      provide(REQUEST_URL, {useValue: path.resolve(__dirname)}),
      provide(UrlResolver, {useValue: new NodeUrlResolver}),
      NODE_ROUTER_PROVIDERS,
      NODE_HTTP_PROVIDERS,
    ],
    platformProviders: [MATERIAL_NODE_PROVIDERS],
    componentProviders: [DEMO_PROVIDERS],
    data: {},

    preboot: null
  });

  res.render('src/app.html', options);

}

router
  .get('/', ngRouter)
  .get('/components/:id', ngRouter);


// needed for sourcemaps

app.use('/src', serveStatic(`${ROOT}/src`));
app.use('/angular2', serveStatic(`${ROOT}/node_modules/angular2`));
app.use('/rxjs', serveStatic(`${ROOT}/node_modules/rxjs`));
app.use('/node_modules', serveStatic(`${ROOT}/node_modules`));
app.use('/', router);

// router.use(historyApiFallback({
//   // verbose: true
// }));

http.createServer(app)
  .listen(port, SERVER_IP, function () {
    console.log(`Listening on port: ${port}`);
    // for smoke testing
    // smokeTest();
  });


// router
//   .route('/')
//   .get(function ngApp(req, res) {
//     let queryParams = queryParamsToBoolean(req.query);
//     let options = Object.assign(queryParams, {
//       // client url for systemjs
//       buildClientScripts: true,
//       componentUrl: 'examples/src/universal/test_page/browser',
//
//       // directives: [appPage.App],
//       directives: [appPage.App, appPage.MyApp],
//       providers: [
//         provide(REQUEST_URL, {useValue: req.originalUrl}),
//         provide(APP_BASE_HREF, {useValue: '/'}),
//         provide(BASE_URL, {useExisting: req.originalUrl}),
//
//         NODE_PLATFORM_PIPES,
//         NODE_ROUTER_PROVIDERS,
//         NODE_HTTP_PROVIDERS,
//       ],
//       data: {},
//
//       async: true,
//
//       systemjs: {
//         componentUrl: 'examples/src/universal/test_page/browser',
//         map: {
//           'angular2-universal': 'node_modules/angular2-universal'
//         },
//         packages: {
//           'angular2-universal/polyfills': {
//             format: 'cjs',
//             main: 'dist/polyfills',
//             defaultExtension: 'js'
//           },
//           'angular2-universal': {
//             format: 'cjs',
//             main: 'dist/browser/index',
//             defaultExtension: 'js'
//           }
//         }
//       },
//
//       preboot: queryParams.preboot === false ? null : {
//         appRoot: 'app', // we need to manually include the root
//
//         start:    true,
//         freeze:   'spinner',     // show spinner w button click & freeze page
//         replay:   'rerender',    // rerender replay strategy
//         buffer:   true,          // client app will write to hidden div until bootstrap complete
//         debug:    false,
//         uglify:   true,
//         presets:  ['keyPress', 'buttonPress', 'focus']
//       },
//       ngOnRendered: () => {
//         console.log('DONE');
//       }
//
//     });
//
//     res.render('app', options);
//
//   });
