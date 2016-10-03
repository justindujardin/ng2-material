/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {};

/** User packages configuration. */
const packages: any = {};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core', '@angular/common', '@angular/forms', '@angular/compiler', '@angular/http', '@angular/router',
  '@angular/platform-browser', '@angular/platform-browser-dynamic', '@angular/material'

  // Thirdparty barrels.
  'rxjs', 'ng2-material',


  // App specific barrels.
  'app', 'app/shared', 'app/+index', 'app/+components', 'app/footer', 'app/shared/footer',
  'app/shared/example', 'app/shared/highlight',
  /** @cli-barrel */

];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => { cliSystemConfigPackages[barrelName] = {main: 'index'}; });


/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'ng2-material': 'vendor/ng2-material',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({map, packages});
