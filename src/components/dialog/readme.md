# MdDialog
Dialogs allow prompting the user to make a decision or take action that must be completed before normal operation may continue.

### Examples
A simple alert dialog
```html
<md-dialog #alert>
  Clicking the button will close this dialog
  <md-dialog-actions ok="Got It"></md-dialog-actions>
</md-dialog>
<button md-button (click)="alert.show()">Open Dialog</button>
```

A confirmation dialog with a yes/no decision
```html
<md-dialog #confirm (onClose)="confirmClose($event)">
  <md-dialog-title>Are you sure?</md-dialog-title>
  This decision will change your life.
  <md-dialog-actions ok="Okay..." cancel="I changed my mind"></md-dialog-actions>
</md-dialog>
<button md-button (click)="confirm.show()">Confirm</button>
```

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
| `onShow` | `MdDialog` | The user specified return value from the dialog |


## `<md-dialog-title>`
### Properties

| Name | Type | Description |
| --- | --- | --- |
| `title` | `string` | Specify dialog title with a binding |


## `<md-dialog-actions>`
### Properties

| Name | Type | Description |
| --- | --- | --- |
| `ok` | `string` | The label to use for an acceptance action button |
| `cancel` | `string` | The label to use for a cancel action button |
| `dialog` | `MdDialog` | The dialog to take action on. Set by the owning dialog, but could be overridden for custom behavior. |

