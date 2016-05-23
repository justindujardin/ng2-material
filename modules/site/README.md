ng2-material website
---

This project is built on the angular-cli, please become familiar with it before continuing: https://cli.angular.io

# Building

To run the app you need to build ng2-material to its output `dist` folder first:

 > grunt build-npm
  
Once you've built the library without error you must install the built package:

 > npm install
 
Then you can run the app using angular-cli:

 > ng serve

Finally open your browser to http://localhost:4200/

# Developing

When developing it can be useful to be able to quickly build ng2-material and have your changes instantly reflected
in the docs app.  To do this you need to use `npm link`.

First navigate to the `dist` path in the root of this repository (where your output from `grunt build-npm` ended up)
and tell npm that it is the path for ng2-material globally:

 > npm link
 
Then navigate back to the docs project folder and link ng2-material into it:

 > npm link ng2-material
 
If you want to unlink it later you can run the same commands, but with `unlink` instead of `link`

# Contributing Examples

Create a new component by specifying the component type that is being demonstrated, and the 
behavior that the example demonstrates. Specify the by giving `ng generate component` a path of the
form `components/[component-type]/[component-type]-[what-it-demonstrates]`. Here are a few examples:

 > ng generate component examples/button/button-basic-usage --prefix=false --flat
 
 > ng generate component examples/button/button-floating-action-buttons --prefix=false --flat
 
 > ng generate component examples/sidenav/sidenav-content-push --prefix=false --flat
 
 > ng generate component examples/sidenav/sidenav-responsive-mode --prefix=false --flat
 
 > ng generate component examples/data-table/data-table-pagination --prefix=false --flat
 
If you are creating the first most basic example for a component, specify the name `basic-usage`:

 > ng generate component examples/data-table/data-table-basic-usage --prefix=false  --flat
 
