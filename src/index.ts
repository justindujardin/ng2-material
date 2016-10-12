import {NgModule, ModuleWithProviders} from '@angular/core';
import {MdContentModule} from './components/content/content';
import {MdDataTableModule} from './components/data-table/index';
import {MdDividerModule} from './components/divider/divider';
import {MdPaginationModule} from './components/pagination/index';
import {MdPeekabooModule} from './components/peekaboo/peekaboo';
import {MdSubheaderModule} from './components/subheader/subheader';
import {Media} from './core/util/media';
import {ViewportHelper, BrowserViewportHelper, NodeViewportHelper} from './core/util/viewport';
import {MdDialogModule} from './components/dialog/dialog.module';
import {MdBackdropModule} from './components/backdrop/backdrop';
import {MdServicesModule} from './core/util/util.module';
// import {MdMessage, MdMessages} from "./components/form/messages"; // Needs upgrade from deprecated forms module

export * from './components/backdrop/backdrop';

export * from './components/content/content';

export * from './components/data-table/index';

export * from './components/dialog/index';
export * from './components/divider/divider';

export * from './components/pagination/index';

export * from './components/peekaboo/peekaboo';

export * from './components/subheader/subheader';

export * from './core/util/media';

export * from './core/util/viewport';
export * from './core/util/animate';

/**
 * Material Design component providers for use in a Node.JS environment.
 */
export const MATERIAL_NODE_PROVIDERS: any[] = [
  {provide: ViewportHelper, useClass: NodeViewportHelper},
  Media
];

/**
 * Material Design component providers for use in the browser.
 */
export const MATERIAL_BROWSER_PROVIDERS: any[] = [
  ...MATERIAL_NODE_PROVIDERS,
  {provide: ViewportHelper, useClass: BrowserViewportHelper},
];


/**
 * Collection of Material Design component modules.
 */
const MATERIAL_MODULES = [
  MdBackdropModule,
  MdContentModule,
  MdDataTableModule,
  MdDialogModule,
  MdDividerModule,
  MdPaginationModule,
  MdPeekabooModule,
  MdSubheaderModule,
  MdServicesModule
];

/**
 * Material Design module for use in a Node.JS environment.
 */
@NgModule({
  exports: MATERIAL_MODULES,
  imports: MATERIAL_MODULES
})
export class Ng2MaterialNodeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ng2MaterialNodeModule,
      providers: MATERIAL_NODE_PROVIDERS
    }
  }
}

/**
 * Material Design module for use in the browser.
 */
@NgModule({
  exports: MATERIAL_MODULES,
  imports: MATERIAL_MODULES
})
export class Ng2MaterialModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ng2MaterialModule,
      providers: MATERIAL_BROWSER_PROVIDERS
    }
  }
}
