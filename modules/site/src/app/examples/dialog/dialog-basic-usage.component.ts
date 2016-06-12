import {Component} from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material';
import {OVERLAY_PROVIDERS} from '@angular2-material/core/overlay/overlay';

@Component({
  moduleId: module.id,
  selector: 'dialog-basic-usage',
  templateUrl: 'dialog-basic-usage.component.html',
  styleUrls: ['dialog-basic-usage.component.css'],
  directives: [MATERIAL_DIRECTIVES],
  providers: [OVERLAY_PROVIDERS]
})
export class DialogBasicUsageComponent {
  status: string = '';

  confirmClose(forgiveDebt: boolean) {
    if (forgiveDebt) {
      this.status = 'You decided to get rid of your debt.';
    } else {
      this.status = 'You decided to keep your debt.';
    }
  }

  customClose(interesting: boolean) {
    if (interesting) {
      this.status = 'That article was interesting.';
    } else {
      this.status = 'Look for something else.';
    }
  }
}
