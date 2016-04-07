import {
  Directive,
  Component,
  AfterContentInit,
  ElementRef,
  OnChanges,
  ContentChild,
  Input,
  Output,
  Optional
} from "angular2/core";
import {NgModel, NgControl, FORM_PROVIDERS} from "angular2/common";
import {ObservableWrapper, EventEmitter, TimerWrapper} from "angular2/src/facade/async";
import {isBlank} from "angular2/src/facade/lang";
import {DOM} from "angular2/src/platform/dom/dom_adapter";

// TODO(jd): <select> hasFocus/hasValue classes
// TODO(jd): input container validation styles.
// TODO(jelbourn): textarea resizing
// TODO(jelbourn): max-length counter


@Directive({
  selector: 'input[md-input],input.md-input,textarea[md-input],textarea.md-input',
  host: {
    'class': 'md-input',
    '[value]': 'value',
    '(input)': 'value=$event.target.value',
    '(focus)': 'setHasFocus(true)',
    '(blur)': 'setHasFocus(false)'
  },
  providers: [FORM_PROVIDERS]
})
export class MdInput {
  _value: string;

  constructor(@Optional() private model: NgModel,
              @Optional() private control: NgControl) {
  }

  @Input('value')
  set value(value: string) {
    this._value = value;
    ObservableWrapper.callEmit(this.mdChange, this.value);
  }

  get value(): string {
    let val = this.model ? this.model.value : this.control ? this.control.value : this._value;
    return !isBlank(val) ? val : '';
  }

  @Input()
  placeholder: string;
  @Output('valueChange')
  mdChange: EventEmitter<any> = new EventEmitter();
  @Output()
  mdFocusChange: EventEmitter<any> = new EventEmitter(false);

  setHasFocus(hasFocus: boolean) {
    ObservableWrapper.callEmit(this.mdFocusChange, hasFocus);
  }
}


@Component({
  selector: 'md-input-container',
  template: `<ng-content></ng-content><div class="md-errors-spacer"></div>`,
  host: {
    '[class.md-input-has-value]': 'inputHasValue',
    '[class.md-input-has-placeholder]': 'inputHasPlaceholder',
    '[class.md-input-focused]': 'inputHasFocus',
  }
})
export class MdInputContainer implements AfterContentInit, OnChanges {

  // The MdInput or MdTextarea inside of this container.
  @ContentChild(MdInput)
  _input: MdInput = null;

  // Whether the input inside of this container has a non-empty value.
  inputHasValue: boolean = false;

  // Whether the input inside of this container has focus.
  inputHasFocus: boolean = false;

  // Whether the input inside of this container has a placeholder
  inputHasPlaceholder: boolean = false;

  constructor(private _element: ElementRef) {
  }

  ngOnChanges(_) {
    this.inputHasValue = this._input.value !== '';

    // TODO(jd): Is there something like @ContentChild that accepts a selector? I would prefer not to
    // use a directive for label elements because I cannot use a parent->child selector to make them
    // specific to md-input
    this.inputHasPlaceholder = !!DOM.querySelector(this._element.nativeElement, 'label') && !!this._input.placeholder;
  }

  ngAfterContentInit() {
    // If there is no text input, just bail and do nothing.
    if (this._input === null) {
      return;
    }

    // TODO(jd): :sob: what is the correct way to update these variables after the component initializes?
    //  any time I do it directly here, debug mode complains about values changing after being checked. I
    //  need to wait until the content has been initialized so that `_input` is there
    // For now, just wrap it in a setTimeout to let the change detection finish up, and then set the values...
    TimerWrapper.setTimeout(() => this.ngOnChanges({}), 0);

    // Listen to input changes and focus events so that we can apply the appropriate CSS
    // classes based on the input state.
    ObservableWrapper.subscribe(this._input.mdChange, (value) => {
      this.inputHasValue = value !== '';
    });

    ObservableWrapper.subscribe<boolean>(this._input.mdFocusChange, (hasFocus: boolean) => {
      this.inputHasFocus = hasFocus
    });

  }
}

