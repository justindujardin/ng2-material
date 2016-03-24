import {CONST_EXPR, Type} from "angular2/src/facade/lang";
import {MdAnchor, MdButton} from "./components/button/button";
import {MdCheckbox} from "./components/checkbox/checkbox";
import {MdContent} from "./components/content/content";
import {MdDialog} from "./components/dialog/dialog";
import {MdDivider} from "./components/divider/divider";
import {MdIcon} from "./components/icon/icon";
import {MdInk} from "./components/ink/ink";
import {
  MdPatternValidator,
  MdMaxLengthValidator,
  MdMinValueValidator,
  MdMaxValueValidator,
  MdNumberRequiredValidator,
  INPUT_VALIDATORS
} from "./components/form/validators";
import {MdMessage, MdMessages} from "./components/form/messages";
import {MdInput, MdInputContainer} from "./components/input/input";
import {MdList, MdListItem} from "./components/list/list";
import {MdProgressLinear} from "./components/progress_linear/progress_linear";
import {MdProgressCircular} from "./components/progress_circular/progress_circular";
import {MdPeekaboo} from "./components/peekaboo/peekaboo";
import {MdRadioButton, MdRadioGroup} from "./components/radio/radio_button";
import {MdRadioDispatcher} from "./components/radio/radio_dispatcher";
import {MdSwitch} from "./components/switcher/switch";
import {MdSubheader} from "./components/subheader/subheader";
import {MdSidenav, MdSidenavContainer} from "./components/sidenav/sidenav";
import {SidenavService} from "./components/sidenav/sidenav_service";
import {MdToolbar} from "./components/toolbar/toolbar";
import {MdTabs, MdTab} from "./components/tabs/tabs";
import {Media} from "./core/util/media";
export * from './components/button/button';

export * from './components/checkbox/checkbox';

export * from './components/content/content';

export * from './components/dialog/dialog';
export * from './components/divider/divider';

export * from './components/icon/icon';

export * from './components/ink/ink';

export * from './components/form/validators';
export * from './components/form/messages';

export * from './components/input/input';

export * from './components/list/list';

export * from './components/progress_linear/progress_linear';

export * from './components/progress_circular/progress_circular';

export * from './components/peekaboo/peekaboo';

export * from './components/radio/radio_button';
export * from './components/radio/radio_dispatcher';

export * from './components/switcher/switch';

export * from './components/subheader/subheader';

export * from './components/sidenav/sidenav';
export * from './components/sidenav/sidenav_service';

export * from './components/toolbar/toolbar';

export * from './components/tabs/tabs';

export * from './core/util/media';

export * from './core/util/animate';

/**
 * Collection of Material Design component directives.
 */
export const MATERIAL_DIRECTIVES: Type[] = CONST_EXPR([
  MdAnchor, MdButton,
  MdCheckbox,
  MdContent,
  MdDivider,
  MdIcon,
  MdInk,
  MdInput, MdInputContainer,
  MdPatternValidator, MdMaxLengthValidator,
  MdMinValueValidator, MdMaxValueValidator,
  MdNumberRequiredValidator,
  MdMessage, MdMessages,
  MdList, MdListItem,
  MdPeekaboo,
  MdProgressLinear,
  MdProgressCircular,
  MdRadioButton, MdRadioGroup,
  MdSidenav, MdSidenavContainer,
  MdSubheader,
  MdSwitch,
  MdToolbar,
  MdTab, MdTabs
]);

/**
 * Collection of Material Design component providers.
 */
export const MATERIAL_PROVIDERS: any[] = [
  MdDialog,
  Media,
  SidenavService,
  MdRadioDispatcher,
  INPUT_VALIDATORS
];
