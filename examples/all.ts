// TODO(jdd): auto generate import/exports for examples during the grunt site-meta task.


import {CONST_EXPR, Type} from 'angular2/src/facade/lang';

import CardBasicUsage from './components/card/basic_usage';
import CardInlineActions from './components/card/inline_actions';
import ButtonBasicUsage from './components/button/basic_usage';
import CardActionButtons from './components/card/action_buttons';
import ToolbarBasicUsage from './components/toolbar/basic_usage';
import ToolbarScrollShrink from './components/toolbar/scroll_shrink';
import ProgressLinearBasicUsage from './components/progress_linear/basic_usage';
import RadioBasicUsage from './components/radio/basic_usage';
import SwitchBasicUsage from './components/switch/basic_usage';
import TabsDynamicHeight from './components/tabs/dynamic_height';
import TabsDynamicTabs from './components/tabs/dynamic_tabs';

/**
 * Collection of Material Design component directives.
 */
export const DEMO_DIRECTIVES: Type[] = CONST_EXPR([
  CardBasicUsage, CardInlineActions, CardActionButtons,
  ButtonBasicUsage,
  RadioBasicUsage,
  SwitchBasicUsage,
  TabsDynamicHeight,
  TabsDynamicTabs,
  ToolbarBasicUsage, ToolbarScrollShrink,
  ProgressLinearBasicUsage
]);

export * from './example';
