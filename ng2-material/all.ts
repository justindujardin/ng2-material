import {CONST_EXPR, Type} from 'angular2/src/facade/lang';
import {provide} from 'angular2/core';

import {MdAnchor, MdButton} from './components/button/button';
export * from './components/button/button';

import {MdCheckbox} from './components/checkbox/checkbox';
export * from './components/checkbox/checkbox';

import {MdContent} from './components/content/content';
export * from './components/content/content';

export * from './components/dialog/dialog';
import {MdDialog} from './components/dialog/dialog';

import {MdDivider} from './components/divider/divider';
export * from './components/divider/divider';

import {MdGridList, MdGridTile} from './components/grid_list/grid_list';
export * from './components/grid_list/grid_list';

import {MdIcon} from './components/icon/icon';
export * from './components/icon/icon';

import {MdInput, MdInputContainer} from './components/input/input';
export * from './components/input/input';

import {MdList, MdListItem} from './components/list/list';
export * from './components/list/list';

import {MdProgressLinear} from './components/progress_linear/progress_linear';
export * from './components/progress_linear/progress_linear';

import {MdProgressCircular} from './components/progress_circular/progress_circular';
export * from './components/progress_circular/progress_circular';

import {MdPeekaboo} from './components/peekaboo/peekaboo';
export * from './components/peekaboo/peekaboo';

import {MdRadioButton, MdRadioGroup} from './components/radio/radio_button';
import {MdRadioDispatcher} from './components/radio/radio_dispatcher';
export * from './components/radio/radio_button';
export * from './components/radio/radio_dispatcher';

import {MdSwitch} from './components/switcher/switch';
export * from './components/switcher/switch';

import {MdToolbar} from './components/toolbar/toolbar';
export * from './components/toolbar/toolbar';

import {MdTabs, MdTab} from './components/tabs/tabs';
import {UrlResolver} from "angular2/compiler";
import {Media} from "./core/util/media";
export * from './components/toolbar/toolbar';

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
  MdPeekaboo,
  MdProgressLinear,
  MdProgressCircular,
  MdRadioButton, MdRadioGroup,
  MdSwitch,
  MdToolbar,
  MdTab, MdTabs
]);


/**
 * Reference to specified base load URL for templates and styles.
 * @private
 */
var BASE_URL: string = null;

/**
 * Specify the baseUrl to load templates and styles from.
 * @param url
 */
export function setBaseUrl(url: string) {
  BASE_URL = url;
}

/**
 * This is a workaround to tell us where to load templates and styles from until
 * we have a better template bundling strategy.
 */
export class MaterialTemplateResolver extends UrlResolver {
  static RESOURCE_MATCHER: RegExp = /^ng2-material\/.*?\.(html|css)$/;

  resolve(baseUrl: string, url: string): string {
    if (!BASE_URL) {
      return super.resolve(baseUrl, url);
    }
    if (baseUrl.startsWith(BASE_URL)) {
      baseUrl = baseUrl.substr(0, BASE_URL.length);
    }
    let result = super.resolve(baseUrl, url);
    if (MaterialTemplateResolver.RESOURCE_MATCHER.test(result)) {
      return `${BASE_URL}${result}`;
    }
    return result;
  }
}

/**
 * Collection of Material Design component providers.
 */
export const MATERIAL_PROVIDERS: any[] = [
  MdDialog,
  Media,
  MdRadioDispatcher,
  provide(UrlResolver, {useValue: new MaterialTemplateResolver()})
];
