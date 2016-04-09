import "angular2-universal-preview/polyfills";
import * as path from "path";
import * as express from "express";
import * as bodyParser from "body-parser";
import {
  expressEngine,
  REQUEST_URL,
  NODE_ROUTER_PROVIDERS,
  NODE_HTTP_PROVIDERS,
  BASE_URL
} from "angular2-universal-preview";
import {provide, enableProdMode} from "angular2/core";
import {APP_BASE_HREF} from "angular2/router";
import {App} from "./app";
import {MATERIAL_NODE_PROVIDERS} from "ng2-material/all";
import {DEMO_PROVIDERS} from "./all";

// Angular 2


// Application
var morgan = require('morgan');
let app = express();
let root = path.resolve(path.join(__dirname, '..'));


// setup the logger
app.use(morgan('combined'));

enableProdMode();

app.use(bodyParser.json());

// Serve static files
app.use(express.static(root, {index: false}));
app.use('public', express.static(path.join(__dirname, '../../../public/')));
// app.use('src', express.static(__dirname));

// Express View
app.engine('.html', expressEngine);
app.set('views', __dirname);
app.set('view engine', 'html');

function ngApp(req, res) {
  let baseUrl = '/';
  let url = req.originalUrl || '/';
  res.render('index', {
    directives: [App],
    providers: [
      provide(APP_BASE_HREF, {useValue: baseUrl}),
      provide(REQUEST_URL, {useValue: url}),
      provide(BASE_URL, {useValue: root}),
      MATERIAL_NODE_PROVIDERS,
      DEMO_PROVIDERS,
      NODE_ROUTER_PROVIDERS,
      NODE_HTTP_PROVIDERS,
    ],
    async: true,
    preboot: false // { appRoot: 'app' } // your top level app component selector
  });
}


// Our API for demos only
app.get('/data.json', (req, res) => {
  res.json({
    data: 'fake data'
  });
});

// Routes with html5pushstate
app.use('/', ngApp);
app.use('/about', ngApp);
app.use('/home', ngApp);

// Server
app.listen(3000, () => {
  console.log('Listen on http://localhost:3000');
});
