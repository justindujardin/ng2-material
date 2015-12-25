import {Animate} from "../../core/util/animate";
import {ElementRef} from "angular2/core";
import {AfterViewInit} from "angular2/core";
import {ViewEncapsulation} from "angular2/core";
import {View} from "angular2/core";
import {Component} from "angular2/core";
import {Input} from "angular2/core";
import {Output} from "angular2/core";
import {EventEmitter} from "angular2/core";
/** Component for the dialog "backdrop", a transparent overlay over the rest of the page. */
@Component({
  selector: 'md-backdrop',
  host: {
    '(click)': 'onClick()',
  },
})
@View({template: '', encapsulation: ViewEncapsulation.None})
export class MdBackdrop implements AfterViewInit {

  /**
   * When true, clicking on the backdrop will close it
   */
  @Input()
  clickClose: boolean = false;

  @Output()
  onHiding: EventEmitter<MdBackdrop> = new EventEmitter<MdBackdrop>();

  @Output()
  onHidden: EventEmitter<MdBackdrop> = new EventEmitter<MdBackdrop>();

  /** Whether this checkbox is checked. */
  @Input() checked: boolean;

  constructor(public element: ElementRef) {
  }

  active: boolean = false;

  ngAfterViewInit() {
    Animate.enter(this.element.nativeElement, 'md-active');
    this.active = true;
  }

  onClick() {
    if (this.clickClose && this.active) {
      this.hide();
    }
  }

  hide(): Promise<void> {
    if (!this.active) {
      return Promise.resolve();
    }
    this.active = false;
    this.onHiding.emit(this);
    return Animate.leave(this.element.nativeElement, 'md-active').then(() => {
      this.onHidden.emit(this);
    });
  }
}
