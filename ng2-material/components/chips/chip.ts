import {
  Component,
  Input,
  ViewChild,
  HostListener,
  ContentChild,
  forwardRef,
  Inject,
  ChangeDetectionStrategy
} from "angular2/core";
import {MdIcon} from "../icon/icon";
import {MdChips, IMdChipData} from "./chips";
import {TemplatePortalDirective, PortalHostDirective} from "@angular2-material/core";
import {MdChipRemove} from "./chip_remove";
import {MdChipContent} from "./chip_content";

@Component({
  selector: 'md-chip',
  directives: [MdIcon, MdChipContent, MdChipRemove, TemplatePortalDirective, PortalHostDirective],
  template: `
<template md-chip-content>{{chip.label}}</template>
<template md-chip-remove>
  <button class="md-chip-remove" (click)="chips.remove(chip)" type="button">
    <i md-icon>cancel</i>
    <span class="md-visually-hidden">close</span>
  </button>
</template>
<div class="md-chip-content" role="button">
  <template [portalHost]="chipTemplate"></template>
</div>
<div class="md-chip-remove-container" [style.display]="(chips.deletable$ | async) ? 'block' : 'none'">
  <template [portalHost]="removeTemplate"></template>
</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.md-deletable]': 'chips.deletable$ | async'
  }
})
export class MdChip {
  constructor(@Inject(forwardRef(() => MdChips)) private chips: MdChips) {
  }

  chipTemplate: TemplatePortalDirective = null;
  removeTemplate: TemplatePortalDirective = null;

  @ViewChild(MdChipContent)
  private set viewChip(value: TemplatePortalDirective) {
    if (value) {
      this.chipTemplate = value;
    }
  }

  @ViewChild(MdChipRemove)
  private set viewRemove(value: TemplatePortalDirective) {
    if (value) {
      this.removeTemplate = value;
    }

  }

  @ContentChild(MdChipContent)
  private set contentChip(value: TemplatePortalDirective) {
    if (value) {
      this.chipTemplate = value;
    }
  }

  @ContentChild(MdChipRemove)
  private set contentRemove(value: TemplatePortalDirective) {
    if (value) {
      this.removeTemplate = value;
    }
  }

  @Input() chip: IMdChipData;
}
