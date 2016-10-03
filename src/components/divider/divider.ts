import {NgModule, Component, ViewEncapsulation} from "@angular/core";

/**
 * @name mdDivider
 *
 * @description
 * Dividers group and separate content within lists and page layouts using strong visual and spatial distinctions. This divider is a thin rule, lightweight enough to not distract the user from content.
 *
 * @param {boolean=} md-inset Add this attribute to activate the inset divider style.
 * @usage
 * <hljs lang="html">
 * <md-divider></md-divider>
 *
 * <md-divider md-inset></md-divider>
 * </hljs>
 *
 */
@Component({
  selector: 'md-divider',
  template: '',
  encapsulation: ViewEncapsulation.None
})
class MdDivider {
}

@NgModule({
  declarations: [MdDivider],
  exports: [MdDivider]
})
export class MdDividerModule {}
