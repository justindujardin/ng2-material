import {CONST_EXPR, Type} from 'angular2/src/facade/lang';
import CardBasicUsage from './components/card/basic_usage';
import CardInCardActions from './components/card/in_card_actions';
import CardActionButtons from './components/card/card_action_buttons';


import ToolbarBasicUsage from './components/toolbar/basic_usage';


import ProgressCircularBasicUsage from './components/progress_circular/basic_usage';
import ProgressLinearBasicUsage from './components/progress_linear/basic_usage';

import SwitchBasicUsage from './components/switch/basic_usage';

/**
 * Collection of Material Design component directives.
 */
export const DEMO_DIRECTIVES: Type[] = CONST_EXPR([
  CardBasicUsage, CardInCardActions, CardActionButtons,
  ToolbarBasicUsage,
  SwitchBasicUsage,
  ProgressCircularBasicUsage,
  ProgressLinearBasicUsage
]);

export * from './example';
