import {Component, ViewContainerRef, Input} from '@angular/core';
import {MATERIAL_DIRECTIVES, MdDialog, Media} from 'ng2-material';

@Component({
  selector: 'dialog-basic-usage',
  templateUrl: 'src/components/dialog/basic_usage.html',
  styleUrls: ['src/components/dialog/basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class DialogBasicUsage {
}

@Component({
  selector: 'dialog-custom',
  template: `
  <form>
    <h2 class="md-title">{{fruit}} (Fruit)</h2>
    <div>
      <p>
        The mango is a juicy stone fruit belonging to the genus Mangifera, consisting of numerous
        tropical fruiting trees, cultivated mostly for edible fruit. The majority of these species
        are found in nature as wild mangoes. They all belong to the flowering plant family
        Anacardiaceae. The mango is native to South and Southeast Asia, from where it has been
        distributed worldwide to become one of the most cultivated fruits in the tropics.
      </p>
      <p>
        The highest concentration of Mangifera genus is in the western part of Malesia (Sumatra,
        Java and Borneo) and in Burma and India. While other Mangifera species (e.g. horse mango,
        M. foetida) are also grown on a more localized basis, Mangifera indica&mdash;the "common
        mango" or "Indian mango"&mdash;is the only mango tree commonly cultivated in many tropical
        and subtropical regions.
      </p>
      <p>
        It originated in Indian subcontinent (present day India and Pakistan) and Burma. It is the
        national fruit of India, Pakistan, and the Philippines, and the national tree of
        Bangladesh. In several cultures, its fruit and leaves are ritually used as floral
        decorations at weddings, public celebrations, and religious ceremonies.
      </p>
    </div>
    <md-dialog-actions>
      <a md-button href="http://en.wikipedia.org/wiki/Mango" target="_blank">
        <span>More on Wikipedia</span>
      </a>
      <span flex></span>
      <button md-button (click)="dialog.close(false)">
        <span>Ignore</span>
      </button>
      <button md-button class="md-primary" (click)="dialog.close(true)">
        <span>Interesting...</span>
      </button>
    </md-dialog-actions>
  </form>
  `,
  styles: [``],
  directives: [MATERIAL_DIRECTIVES]
})
class DialogCustom {
  @Input() fruit: string;
}
