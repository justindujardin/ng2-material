import {NgModule, ApplicationRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app.routes';
import {App} from './app.component';
import {Home} from './home/index';
import {NoContent} from './no-content/index';
import {XLarge} from './home/x-large/index';
import {DataTableBasicUsageComponent} from './examples/ng2-material/data-table/data-table-basic-usage.component';
import {DataTableSelectableRowsComponent} from './examples/ng2-material/data-table/data-table-selectable-rows.component';
import {DialogBasicUsageComponent} from './examples/ng2-material/dialog/dialog-basic-usage.component';
import {PaginationBasicUsageComponent} from './examples/ng2-material/pagination/pagination-basic-usage.component';
import {PaginationSplitUsageComponent} from './examples/ng2-material/pagination/pagination-split-usage.component';

import {ButtonBasicUsageComponent} from './examples/@angular/material/button/button-basic-usage.component';
import {CardActionButtonsComponent} from './examples/@angular/material/card/card-action-buttons.component';
import {CardBasicUsageComponent} from './examples/@angular/material/card/card-basic-usage.component';
import {CardInlineActionsComponent} from './examples/@angular/material/card/card-inline-actions.component';
import {CheckboxBasicUsageComponent} from './examples/@angular/material/checkbox/checkbox-basic-usage.component';
import {InputBasicUsageComponent} from './examples/@angular/material/input/input-basic-usage.component';
import {ListBasicUsageComponent} from './examples/@angular/material/list/list-basic-usage.component';
import {ProgressBarBasicUsageComponent} from './examples/@angular/material/progress-bar/progress-bar-basic-usage.component';
import {ProgressCircleBasicUsageComponent} from './examples/@angular/material/progress-circle/progress-circle-basic-usage.component';
import {RadioBasicUsageComponent} from './examples/@angular/material/radio/radio-basic-usage.component';
import {SidenavBasicUsageComponent} from './examples/@angular/material/sidenav/sidenav-basic-usage.component';
import {SlideToggleBasicUsageComponent} from './examples/@angular/material/slide-toggle/slide-toggle-basic-usage.component';
import {TabsDynamicHeightComponent} from './examples/@angular/material/tabs/tabs-dynamic-height.component';
import {TabsDynamicTabsComponent} from './examples/@angular/material/tabs/tabs-dynamic-tabs.component';
import {ToolbarBasicUsageComponent} from './examples/@angular/material/toolbar/toolbar-basic-usage.component';
import {ComponentsService, NavigationService, VersionService} from './shared/index';
import {MaterialModule} from '@angular/material';
import {Ng2MaterialModule} from '../../src/index';
import {ExampleComponent} from './shared/example/example.component';
import {FooterComponent} from './shared/footer/footer.component';
import {HighlightComponent} from './shared/highlight/highlight.component';
import {HighlightContainerComponent} from './shared/highlight/highlight-container.component';
import {ComponentsOrderByPipe} from './app.pipe';
import {IndexComponent} from './index/index.component';
import {ComponentsComponent} from './components/components.component';

/*
 * Platform and Environment providers/directives/pipes
 */
// App is our top level component

// Application wide providers
const APP_PROVIDERS = [];

/**
 * Collection of Material Design component example directives.
 */
export const DEMO_DIRECTIVES: any[] = [
  ButtonBasicUsageComponent, CardActionButtonsComponent,
  CardBasicUsageComponent, CardInlineActionsComponent, CheckboxBasicUsageComponent,
  DataTableBasicUsageComponent, DataTableSelectableRowsComponent, DialogBasicUsageComponent,
  InputBasicUsageComponent, ListBasicUsageComponent, PaginationBasicUsageComponent, PaginationSplitUsageComponent,
  ProgressBarBasicUsageComponent, ProgressCircleBasicUsageComponent, RadioBasicUsageComponent, SidenavBasicUsageComponent,
  SlideToggleBasicUsageComponent, TabsDynamicHeightComponent, TabsDynamicTabsComponent,
  ToolbarBasicUsageComponent
];


/**
 * Describe an example that can be dynamically loaded.
 */
export interface IExampleData {
  template: string;
  source: string;
  styles: string;
  component: string;
  name: string;
}

/**
 * Collection of providers for example app
 */
export const DEMO_PROVIDERS: any[] = [ComponentsService, NavigationService, VersionService];


export const DEMO_SHARED: any[] = [
  ExampleComponent,
  FooterComponent,
  HighlightComponent,
  HighlightContainerComponent,
  ComponentsOrderByPipe

];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App,
    ...DEMO_SHARED,
    ...DEMO_DIRECTIVES,
    Home,
    IndexComponent,
    ComponentsComponent,
    NoContent,
    XLarge
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    Ng2MaterialModule.forRoot(),
    RouterModule.forRoot(ROUTES, {useHash: true})
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ...APP_PROVIDERS,
    ...DEMO_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {
  }
}

