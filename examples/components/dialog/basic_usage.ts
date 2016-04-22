import {Component, ElementRef, Input} from "angular2/core";
import {MATERIAL_DIRECTIVES, MdDialog, Media, MdDialogConfig, MdDialogBasic, MdDialogRef} from "ng2-material/all";
import {DOM} from "angular2/src/platform/dom/dom_adapter";

@Component({
  selector: 'dialog-basic-usage',
  templateUrl: 'examples/components/dialog/basic_usage.html',
  styleUrls: ['examples/components/dialog/basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class DialogBasicUsage {

  status = '  ';
  customFullscreen = this.media.hasMedia('xs') || this.media.hasMedia('sm');

  constructor(public dialog: MdDialog,
              public media: Media,
              public element: ElementRef) {

  }

  showAlert(ev) {
    let config = new MdDialogConfig()
      .parent(DOM.query('#popupContainer'))
      .textContent('You can specify some description text in here')
      .title('This is an alert title')
      .ok('Got it!')
      .targetEvent(ev);
    this.dialog.open(MdDialogBasic, this.element, config);
  };

  showConfirm(ev) {
    let config = new MdDialogConfig()
      .textContent('All of the banks have agreed to forgive you your debts.')
      .clickOutsideToClose(false)
      .title('Would you like to delete your debt?')
      .ariaLabel('Lucky day')
      .ok('Please do it!')
      .cancel('Sounds like a scam')
      .targetEvent(ev);
    this.dialog.open(MdDialogBasic, this.element, config)
      .then((ref: MdDialogRef) => {
        ref.whenClosed.then((result) => {
          if (result) {
            this.status = 'You decided to get rid of your debt.';
          }
          else {
            this.status = 'You decided to keep your debt.';
          }
        })
      });
  };

  showAdvanced(ev) {
    let config = new CustomDialogConfig()
      .fruit("Mango")
      .clickOutsideToClose(false)
      .targetEvent(ev);
    this.dialog.open(DialogCustom, this.element, config)
      .then((ref: MdDialogRef) => {
        ref.whenClosed.then((interesting) => {
          if (interesting) {
            this.status = 'That article was interesting.';
          }
          else {
            this.status = 'Look for something else.';
          }
        })
      });
  };

  showTabDialog(ev) {

  };
}

class CustomDialogConfig extends MdDialogConfig {
    fruit(name: string) {
        this.context.fruit = name;
        return this;
    }
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

  constructor(private dialog: MdDialogRef) {}
}
