import {
  Component,
  AfterContentInit,
  ElementRef,
  OnChanges,
  ContentChild,
  Input,
  HostBinding,
  HostListener
} from "angular2/core";
import {TimerWrapper} from "angular2/src/facade/async";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {MdInput} from "../input/input";
import {FORM_DIRECTIVES} from "angular2/common";

// TODO(jd): <select> hasFocus/hasValue classes
// TODO(jd): input container validation styles.
// TODO(jelbourn): textarea resizing
// TODO(jelbourn): max-length counter



@Component({
  selector: 'md-autocomplete-container',
  template: `<ng-content></ng-content>
      <div class="suggestions" *ngIf="filteredList.length > 0">
          <ul>
              <li *ngFor="#item of filteredList">
                  <a (click)="select(item)">{{item}}</a>
              </li>
          </ul>
      </div>
    <div class="md-errors-spacer"></div>`
})
export class MdAutocompleteContainer implements AfterContentInit, OnChanges {

  private filteredList = [];
  private mdAutoComplete: Array<string> = ["Albania","Andorra","Armenia","Austria","Azerbaijan","Belarus","Belgium","Bosnia & Herzegovina",
    "Bulgaria","Croatia","Cyprus","Czech Republic","Denmark","Estonia","Finland","France","Georgia",
    "Germany","Greece","Hungary","Iceland","Ireland","Italy","Kosovo","Latvia","Liechtenstein",
    "Lithuania","Luxembourg","Macedonia","Malta","Moldova","Monaco","Montenegro","Netherlands",
    "Norway","Poland","Portugal","Romania","Russia","San Marino","Serbia","Slovakia",
    "Slovenia","Spain","Sweden","Switzerland","Turkey","Ukraine","United Kingdom","Vatican City"];

  // The MdInput or MdTextarea inside of this container.
  @ContentChild(MdInput)
  _input: MdInput = null;

  // Whether the input inside of this container has a non-empty value.
  @HostBinding('class.md-input-has-value')
  inputHasValue: boolean = false;

  // Whether the input inside of this container has focus.
  @HostBinding('class.md-input-focused')
  inputHasFocus: boolean = false;

  // Whether the input inside of this container has a placeholder
  @HostBinding('class.md-input-has-placeholder')
  inputHasPlaceholder: boolean = false;

  //
  @HostListener('document:click', ['$event.target']) onClick(target) {
    this.handleClick(target);
  }
  @HostListener('keyup') keyEventHandler() {
    this.filter();
  }

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
    this._input.mdChange.subscribe((value: string) => {
      this.inputHasValue = value !== '';
    });

    this._input.mdFocusChange.subscribe((hasFocus: boolean) => {
      this.inputHasFocus = hasFocus;
    });

  }

  filter() {
    if (this.inputHasValue && this.mdAutoComplete !== []) {
      this.filteredList = this.mdAutoComplete.filter( (el) => {
        return el.toLowerCase().indexOf(this._input.value.toLowerCase()) > -1;
      });

    } else {
      this.filteredList = [];
    }

  }

  select(item){
    this._input.value = item;
    this.filteredList = [];
  }

  handleClick(target){
    var clickedComponent = target;
    var inside = false;
    do {
      if (clickedComponent === this._element.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if(!inside){
      this.filteredList = [];
    }
  }

}

