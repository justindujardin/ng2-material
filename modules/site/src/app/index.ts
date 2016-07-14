import {ButtonBasicUsageComponent} from './examples/button/button-basic-usage.component';
import {CardActionButtonsComponent} from './examples/card/card-action-buttons.component';
import {CardBasicUsageComponent} from './examples/card/card-basic-usage.component';
import {CardInlineActionsComponent} from './examples/card/card-inline-actions.component';
import {CheckboxBasicUsageComponent} from './examples/checkbox/checkbox-basic-usage.component';
import {DataTableBasicUsageComponent} from './examples/data-table/data-table-basic-usage.component';
import {
  DataTableSelectableRowsComponent
} from './examples/data-table/data-table-selectable-rows.component';
import {DialogBasicUsageComponent} from './examples/dialog/dialog-basic-usage.component';
import {ElevationBasicUsageComponent} from './examples/elevation/elevation-basic-usage.component';
import {InputBasicUsageComponent} from './examples/input/input-basic-usage.component';
import {ListBasicUsageComponent} from './examples/list/list-basic-usage.component';
import {PaginationBasicUsageComponent} from './examples/pagination/pagination-basic-usage.component';
import {PaginationSplitUsageComponent} from './examples/pagination/pagination-split-usage.component';
import {ProgressBarBasicUsageComponent} from './examples/progress-bar/progress-bar-basic-usage.component';
import {ProgressCircleBasicUsageComponent} from './examples/progress-circle/progress-circle-basic-usage.component';
import {RadioBasicUsageComponent} from './examples/radio/radio-basic-usage.component';
import {SidenavBasicUsageComponent} from './examples/sidenav/sidenav-basic-usage.component';
import {SwitchBasicUsageComponent} from './examples/switch/switch-basic-usage.component';
import {TabsDynamicHeightComponent} from './examples/tabs/tabs-dynamic-height.component';
import {TabsDynamicTabsComponent} from './examples/tabs/tabs-dynamic-tabs.component';
import {ToolbarBasicUsageComponent} from './examples/toolbar/toolbar-basic-usage.component';
import {ComponentsService, NavigationService, VersionService} from './shared';

export {environment} from './environment';
export {SiteAppComponent, AppRouterProviders} from './site.component';


/**
 * Collection of Material Design component example directives.
 */
export const DEMO_DIRECTIVES: any[] = [
  ElevationBasicUsageComponent, ButtonBasicUsageComponent, CardActionButtonsComponent,
  CardBasicUsageComponent, CardInlineActionsComponent, CheckboxBasicUsageComponent,
  DataTableBasicUsageComponent, DataTableSelectableRowsComponent, DialogBasicUsageComponent,
  InputBasicUsageComponent, ListBasicUsageComponent, PaginationBasicUsageComponent, PaginationSplitUsageComponent,
  ProgressBarBasicUsageComponent, ProgressCircleBasicUsageComponent, RadioBasicUsageComponent, SidenavBasicUsageComponent,
  SwitchBasicUsageComponent, TabsDynamicHeightComponent, TabsDynamicTabsComponent,
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
