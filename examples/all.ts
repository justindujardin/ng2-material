// TODO(jd): auto generate import/exports for examples during the grunt site-meta task.


import {CONST_EXPR, Type} from "angular2/src/facade/lang";
import CardBasicUsage from "./components/card/basic_usage";
import CardInlineActions from "./components/card/inline_actions";
import ButtonBasicUsage from "./components/button/basic_usage";
import ChipsBasicUsage from "./components/chips/basic_usage";
import CardActionButtons from "./components/card/action_buttons";
import DataTableBasicUsage from './components/data_table/basic_usage';
import DataTableSelectableUsage from './components/data_table/selectable_usage';
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
import ChipsPortal from "./components/chips/portal";

/**
 * Collection of Material Design component example directives.
 */
export const DEMO_DIRECTIVES: Type[] = CONST_EXPR([
  CardBasicUsage, CardInlineActions, CardActionButtons,
  ButtonBasicUsage,
  ChipsBasicUsage,
  ChipsPortal,
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

export * from './example';
