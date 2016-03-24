import {
  Component,
  ViewEncapsulation,
  Host,
  SkipSelf,
  Attribute,
  Optional,
  OnChanges,
  OnInit,
  Output,
  Input,
  OnDestroy
} from "angular2/core";
import {isPresent, StringWrapper} from "angular2/src/facade/lang";
import {ObservableWrapper, EventEmitter} from "angular2/src/facade/async";
import {MdRadioDispatcher} from "./radio_dispatcher";
import {KeyCodes} from "../../core/key_codes";
import {parseTabIndexAttribute} from "../../core/util/util";

// TODO(jd): Use @ContentChildren instead of registering radio buttons with group parent manually.
// TODO(jelbourn): Behaviors to test
// Radio name is pulled on parent group

var _uniqueIdCounter: number = 0;

@Component({
  selector: 'md-radio-group',
  inputs: ['disabled', 'value'],
  host: {
    'role': 'radiogroup',
    '[attr.aria-disabled]': 'disabled',
    '[attr.aria-activedescendant]': 'activedescendant',
    '(keydown)': 'onKeydown($event)',
    '[tabindex]': 'tabindex',
  },
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})
export class MdRadioGroup implements OnChanges {

  @Output('valueChange')
  change: EventEmitter<any> = new EventEmitter(false);

  /** The selected value for the radio group. The value comes from the options. */
  @Input('value')
  value_: any;

  get value(): any {
    return this.value_;
  }

  set value(value: any) {
    this.value_ = value;
    this._setChildValue(value);
  }

  /** The HTML name attribute applied to radio buttons in this group. */
  name_: string = `md-radio-group-${_uniqueIdCounter++}`;

  /** Dispatcher for coordinating radio unique-selection by name. */
  radioDispatcher: MdRadioDispatcher;

  /** Array of child radio buttons. */
  radios_: MdRadioButton[] = [];

  activedescendant: any;

  disabled_: boolean = false;

  /** The ID of the selected radio button. */
  selectedRadioId: string = '';


  tabindex: number;

  constructor(@Attribute('tabindex') tabindex: string,
              @Attribute('disabled') disabled: string,
              radioDispatcher: MdRadioDispatcher) {
    this.radioDispatcher = radioDispatcher;

    // The simple presence of the `disabled` attribute dictates disabled state.
    this.disabled = isPresent(disabled);

    // If the user has not set a tabindex, default to zero (in the normal document flow).
    this.tabindex = parseTabIndexAttribute(tabindex);
  }

  /** Gets the name of this group, as to be applied in the HTML 'name' attribute. */
  getName(): string {
    return this.name_;
  }

  get disabled() {
    return this.disabled_;
  }

  set disabled(value) {
    this.disabled_ = isPresent(value) && value !== false;
  }

  /** Change handler invoked when bindings are resolved or when bindings have changed. */
  ngOnChanges(_) {
    // If the component has a disabled attribute with no value, it will set disabled = ''.
    this.disabled = isPresent(this.disabled) && this.disabled !== false;

    // If the value of this radio-group has been set or changed, we have to look through the
    // child radio buttons and select the one that has a corresponding value (if any).
    if (isPresent(this.value) && this.value !== '') {
      this.radioDispatcher.notify(this.name_);
      this._setChildValue(this.value);
    }
  }

  private _setChildValue(value: any) {
    let button = this.getChildByValue(value);
    if (button) {
      this.selectedRadioId = button.id;
      this.activedescendant = button.id;
      button.checked = true;
    }
  }

  /** Update the value of this radio group from a child md-radio being selected. */
  updateValue(value: any, id: string) {
    this.value = value;
    this.selectedRadioId = id;
    this.activedescendant = id;
    ObservableWrapper.callEmit(this.change, value);
  }

  /** Registers a child radio button with this group. */
  register(radio: MdRadioButton) {
    this.radios_.push(radio);
  }

  /** Unregister a child radio button with this group. */
  unregister(radio: MdRadioButton) {
    this.radios_ = this.radios_.filter(r => r.id !== radio.id);
  }

  /** Handles up and down arrow key presses to change the selected child radio. */
  onKeydown(event: KeyboardEvent) {
    if (this.disabled) {
      return;
    }

    switch (event.keyCode) {
      case KeyCodes.UP:
        this.stepSelectedRadio(-1);
        event.preventDefault();
        break;
      case KeyCodes.DOWN:
        this.stepSelectedRadio(1);
        event.preventDefault();
        break;
    }
  }

  // TODO(jelbourn): Replace this with a findIndex method in the collections facade.
  getSelectedRadioIndex(): number {
    for (let i = 0; i < this.radios_.length; i++) {
      if (this.radios_[i].id === this.selectedRadioId) {
        return i;
      }
    }

    return -1;
  }

  /**
   * Return a child radio by its value.
   */
  getChildByValue(value: any): MdRadioButton {
    for (let i = 0; i < this.radios_.length; i++) {
      if (this.radios_[i].value === value) {
        return this.radios_[i];
      }
    }
    return null;
  }

  /** Steps the selected radio based on the given step value (usually either +1 or -1). */
  stepSelectedRadio(step) {
    let index = this.getSelectedRadioIndex() + step;
    if (index < 0 || index >= this.radios_.length) {
      return;
    }

    let radio = this.radios_[index];

    // If the next radio is line is disabled, skip it (maintaining direction).
    if (radio.disabled) {
      this.stepSelectedRadio(step + (step < 0 ? -1 : 1));
      return;
    }

    this.updateValue(radio.value, radio.id);
    radio.checked = true;
  }
}


@Component({
  selector: 'md-radio-button',
  inputs: ['id', 'name', 'value', 'checked', 'disabled'],
  host: {
    'role': 'radio',
    '[id]': 'id',
    '[tabindex]': 'tabindex',
    '[attr.aria-checked]': 'checked',
    '[attr.disabled]': 'disabled ? "" : undefined',
    '[attr.aria-disabled]': 'disabled',
    '(keydown)': 'onKeydown($event)',
    '(click)': 'select($event)'
  },
  template: `
    <label role="radio" class="md-radio-root" [class.md-radio-checked]="checked">
      <div class="md-radio-container">
        <div class="md-radio-off"></div>
        <div class="md-radio-on"></div>
      </div>
      <div class="md-radio-label">
        <ng-content></ng-content>
      </div>
    </label>`,
  directives: [],
  encapsulation: ViewEncapsulation.None
})
export class MdRadioButton implements OnInit, OnDestroy {
  /** Whether this radio is checked. */
  checked: boolean;

  /** Whether the radio is disabled. */
  disabled_: boolean;

  /** The unique ID for the radio button. */
  id: string;

  /** Analog to HTML 'name' attribute used to group radios for unique selection. */
  name: string;

  /** Value assigned to this radio. Used to assign the value to the parent MdRadioGroup. */
  value: any;

  /** The parent radio group. May or may not be present. */
  radioGroup: MdRadioGroup;

  /** Dispatcher for coordinating radio unique-selection by name. */
  radioDispatcher: MdRadioDispatcher;

  tabindex: number;

  constructor(@Optional() @SkipSelf() @Host() radioGroup: MdRadioGroup,
              @Attribute('id') id: string,
              @Attribute('value') value: string,
              @Attribute('checked') checked: string,
              @Attribute('tabindex') tabindex: string,
              radioDispatcher: MdRadioDispatcher) {
    // Assertions. Ideally these should be stripped out by the compiler.
    // TODO(jelbourn): Assert that there's no name binding AND a parent radio group.

    this.radioGroup = radioGroup;
    this.radioDispatcher = radioDispatcher;
    this.value = value ? value : null;
    this.checked = isPresent(checked) ? true : false;

    this.id = isPresent(id) ? id : `md-radio-${_uniqueIdCounter++}`;

    // Whenever a radio button with the same name is checked, uncheck this radio button.
    radioDispatcher.listen((name) => {
      if (name === this.name) {
        this.checked = false;
      }
    });

    // When this radio-button is inside of a radio-group, the group determines the name.
    if (isPresent(radioGroup)) {
      this.name = radioGroup.getName();
      this.radioGroup.register(this);
      if (this.checked) {
        this.radioGroup.updateValue(this.value, this.id);
      }
    }

    // If the user has not set a tabindex, default to zero (in the normal document flow).
    if (!isPresent(radioGroup)) {
      this.tabindex = parseTabIndexAttribute(tabindex);
    } else {
      this.tabindex = -1;
    }
  }

  /** Change handler invoked when bindings are resolved or when bindings have changed. */
  ngOnInit() {
    if (isPresent(this.radioGroup)) {
      this.name = this.radioGroup.getName();
    }
  }

  ngOnDestroy(): any {
    if (isPresent(this.radioGroup)) {
      this.radioGroup.unregister(this);
    }
  }


  /** Whether this radio button is disabled, taking the parent group into account. */
  isDisabled(): boolean {
    // Here, this.disabled may be true/false as the result of a binding, may be the empty string
    // if the user just adds a `disabled` attribute with no value, or may be absent completely.
    // TODO(jelbourn): If someone sets `disabled="disabled"`, will this work in dart?
    return this.disabled || (isPresent(this.disabled) && StringWrapper.equals(this.disabled, '')) ||
      (isPresent(this.radioGroup) && this.radioGroup.disabled);
  }

  get disabled(): any {
    // True if self or parent group are disabled.
    return this.disabled_ || (this.radioGroup && this.radioGroup.disabled);
  }

  set disabled(value: any) {
    this.disabled_ = isPresent(value) && value !== false;
  }

  /** Select this radio button. */
  select(event: Event) {
    if (this.isDisabled()) {
      event.stopPropagation();
      return;
    }

    // Notifiy all radio buttons with the same name to un-check.
    this.radioDispatcher.notify(this.name);

    this.checked = true;

    if (isPresent(this.radioGroup)) {
      this.radioGroup.updateValue(this.value, this.id);
    }
  }

  /** Handles pressing the space key to select this focused radio button. */
  onKeydown(event: KeyboardEvent) {
    if (event.keyCode === KeyCodes.SPACE) {
      event.preventDefault();
      this.select(event);
    }
  }
}
