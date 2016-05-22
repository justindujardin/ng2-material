# MdDialog
Dialogs allow prompting the user to make a decision or take action that must be completed before normal operation may continue.

## `<md-dialog>`
### Properties

| Name | Type | Description |
| --- | --- | --- |
| `config` | `OverlayConfig` | Used to override dialog positioning |


### Events

| Name | Value Type | Description |
| --- | --- | --- | 
| `onClose` | `any` | Emitted when the dialog closes with a user specified value |
| `onCancel` | `any` | Emitted when the dialog closes because of an escape action |
| `onShow` | `MdDialog` | Emitted when the dialog has been presented to the user |


### Examples

#### Basic dialog with one action

```html
<md-dialog #alert>
  Clicking the button will close this dialog
  <md-dialog-actions ok="Got It"></md-dialog-actions>
</md-dialog>

<button md-button (click)="alert.show()">Open Dialog</button>
```

## `<md-dialog-title>`
### Properties

| Name | Type | Description |
| --- | --- | --- |
| `title` | `string` | Specify dialog title with a binding |

### Examples

#### Dialog with title and body

```html
<md-dialog #rentMovie>
  <md-dialog-title text="Confirm Rental"></md-dialog-title>
  Your account will be charged $4.99.
  <md-dialog-actions ok="Purchase" cancel="Cancel"></md-dialog-actions>
</md-dialog>

<button md-button (click)="rentMovie.show()">Rent Movie</button>
```

## `<md-dialog-actions>`
### Properties

| Name | Type | Description |
| --- | --- | --- |
| `ok` | `string` | The label to use for an acceptance action button |
| `cancel` | `string` | The label to use for a cancel action button |
| `dialog` | `MdDialog` | The dialog to take action on. Set by the owning dialog, but could be overridden for custom behavior. |


### Examples

#### Confirmation dialog with a yes/no decision

```html
<md-dialog #confirm (onClose)="confirmClose($event)">
  <md-dialog-title>Are you sure?</md-dialog-title>
  This decision will change your life.
  <md-dialog-actions ok="Yep" cancel="Nope"></md-dialog-actions>
</md-dialog>

<button md-button (click)="confirm.show()">Confirm</button>
```

#### Dialog with custom action buttons

```html
<md-dialog #custom>
  <md-dialog-title>Did you like it?</md-dialog-title>
  Scott Pilgrim vs. the World
  <md-dialog-actions>
    <a md-button href="https://en.wikipedia.org/wiki/Scott_Pilgrim_vs._the_World">
      <span>What's that?</span>
    </a>
    <span flex></span>
    <button md-button (click)="custom.close(false)">
      <span>It was awesome!</span>
    </button>
    <button md-button class="md-primary" (click)="custom.close(true)">
      <span>It was trying too hard...</span>
    </button>
  </md-dialog-actions>
</md-dialog>

<button md-button (click)="custom.show()">Feedback</button>
```
