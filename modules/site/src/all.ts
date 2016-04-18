// TODO(jd): auto generate import/exports for examples during the grunt site-meta task.


import {CONST_EXPR, Type} from "angular2/src/facade/lang";
import CardBasicUsage from "./components/card/basic_usage";
import CardInlineActions from "./components/card/inline_actions";
import ButtonBasicUsage from "./components/button/basic_usage";
import CardActionButtons from "./components/card/action_buttons";
import DataTableBasicUsage from "./components/data_table/basic_usage";
import DataTableSelectableUsage from "./components/data_table/selectable_usage";
import DialogBasicUsage from "./components/dialog/basic_usage";
import ToolbarBasicUsage from "./components/toolbar/basic_usage";
import ToolbarScrollShrink from "./components/toolbar/scroll_shrink";
import ProgressLinearBasicUsage from "./components/progress_linear/basic_usage";
import ProgressCircularBasicUsage from "./components/progress_circular/basic_usage";
import RadioBasicUsage from "./components/radio/basic_usage";
import SwitchBasicUsage from "./components/switch/basic_usage";
import TabsDynamicHeight from "./components/tabs/dynamic_height";
import TabsDynamicTabs from "./components/tabs/dynamic_tabs";
import CheckboxBasicUsage from "./components/checkbox/basic_usage";
import CheckboxSyncing from "./components/checkbox/syncing";
import ListBasicUsage from "./components/list/basic_usage";
import InputBasicUsage from "./components/input/basic_usage";
import InputFormBuilder from "./components/input/form_builder";
import WhiteframeBasicUsage from "./components/whiteframe/basic_usage";
import SidenavBasicUsage from "./components/sidenav/basic_usage";
import {ComponentsService} from "./services/components";
import {NavigationService} from "./services/navigation";
import {VersionService} from "./services/version";
import {PlatformHost} from "./platform/index";
import {NodePlatformHost} from "./platform/node";
import {provide} from "angular2/core";
import {BrowserPlatformHost} from "./platform/browser";

/**
 * Collection of Material Design component example directives.
 */
export const DEMO_DIRECTIVES: Type[] = CONST_EXPR([
  CardBasicUsage, CardInlineActions, CardActionButtons,
  ButtonBasicUsage,
  CheckboxBasicUsage, CheckboxSyncing,
  DataTableBasicUsage, DataTableSelectableUsage,
  DialogBasicUsage,
  InputBasicUsage,
  InputFormBuilder,
  ListBasicUsage,
  RadioBasicUsage,
  SwitchBasicUsage,
  TabsDynamicHeight,
  TabsDynamicTabs,
  ToolbarBasicUsage, ToolbarScrollShrink,
  ProgressLinearBasicUsage,
  ProgressCircularBasicUsage,
  SidenavBasicUsage,
  WhiteframeBasicUsage
]);



/**
 * Collection of providers for example app
 */
export const DEMO_PROVIDERS: Type[] = CONST_EXPR([
  ComponentsService, NavigationService, VersionService
]);


/**
 * Material Design component providers for use in a Node.JS environment.
 */
export const DEMO_NODE_PROVIDERS: any[] = [
  ...DEMO_PROVIDERS,
  provide(PlatformHost, {useClass: NodePlatformHost})
];

/**
 * Material Design component providers for use in the browser.
 */
export const DEMO_BROWSER_PROVIDERS: any[] = [
  ...DEMO_PROVIDERS,
  provide(PlatformHost, {useClass: BrowserPlatformHost})
];

export * from './components/example';
export * from './components/highlight';
