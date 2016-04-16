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

var serveStatic = require('serve-static');
var Router = express.Router;
var http = require('http');

let ROOT = path.resolve(path.join(__dirname, '../'));
var router = Router();
var app = express();

var SERVER_IP = '127.0.0.1';
var port = process.env.PORT || 3000;

enableProdMode();

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
    directives: [App],
    providers: [
      provide(APP_BASE_HREF, {useValue: baseUrl}),
      provide(BASE_URL, {useValue: path.resolve(__dirname)}),
      provide(REQUEST_URL, {useValue: url}),
      NODE_ROUTER_PROVIDERS,
      NODE_HTTP_PROVIDERS,
    ],
    data: {},
    async: true,
    preboot: false
  });

  res.render('index.html', options);
}

router
  .get('/', ngRouter)
  .get('/home', ngRouter)
  .get('/about', ngRouter);

app.use('/src', serveStatic(`${ROOT}/src`));
app.use('/dist', serveStatic(`${ROOT}/dist`));
app.use('/angular2', serveStatic(`${ROOT}/node_modules/angular2`));
app.use('/rxjs', serveStatic(`${ROOT}/node_modules/rxjs`));
app.use('/node_modules', serveStatic(`${ROOT}/node_modules`));
app.use('/', router);

http.createServer(app).listen(port, SERVER_IP, () => {
  console.log(`Listening on port: ${port}`);
});
