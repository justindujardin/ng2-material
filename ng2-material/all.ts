import {CONST_EXPR, Type} from 'angular2/src/facade/lang';

import {MdAnchor, MdButton} from './components/button/button';
import {MdCheckbox} from './components/checkbox/checkbox';
import {MdContent} from './components/content/content';
import {MdDivider} from './components/divider/divider';
import {MdGridList, MdGridTile} from './components/grid_list/grid_list';
import {MdIcon} from './components/icon/icon';
import {MdInput, MdInputContainer} from './components/input/input';
import {MdList, MdListItem} from './components/list/list';
import {MdProgressLinear} from './components/progress_linear/progress_linear';
import {MdProgressCircular} from './components/progress_circular/progress_circular';
import {MdRadioButton, MdRadioGroup} from './components/radio/radio_button';
import {MdSwitch} from './components/switcher/switch';
import {MdToolbar} from './components/toolbar/toolbar';

/**
 * Collection of Material Design component directives.
 */
export const MATERIAL_DIRECTIVES: Type[] = CONST_EXPR([
  MdAnchor, MdButton,
  MdCheckbox,
  MdContent,
  MdDivider,
  MdGridList, MdGridTile,
  MdIcon,
  MdInput, MdInputContainer,
  MdList, MdListItem,
  MdProgressLinear,
  MdProgressCircular,
  MdRadioButton, MdRadioGroup,
  MdSwitch,
  MdToolbar
]);

// Re-export all components
export * from './components/button/button';
export * from './components/checkbox/checkbox';
export * from './components/content/content';
export * from './components/dialog/dialog';
export * from './components/divider/divider';
export * from './components/grid_list/grid_list';
export * from './components/icon/icon';
export * from './components/input/input';
export * from './components/list/list';
export * from './components/progress_linear/progress_linear';
export * from './components/progress_circular/progress_circular';
export * from './components/radio/radio_button';
export * from './components/radio/radio_dispatcher';
export * from './components/switcher/switch';
export * from './components/toolbar/toolbar';
