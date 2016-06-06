# MdButton
Button allow usage of Flat, Raise, Icons Floating Actions and Mini Floating Actions buttons.

## `[md-button], [md-fab], [md-raised-button]`
This directive can be applied either on button markup and anchor link.

### Properties

| Name | Type | Description |
| --- | --- | --- |
| `disabled` | `boolean` | Allow to apply disable style on an anchor as you do on button |

### Examples

#### Basic buttons usages

```html
<button md-button>Button</button>
<button md-raised-button>Raised Button</button>
<button md-fab><i md-icon>people</i></button>
<a md-button href="http://www.google.com">Default Link</a>
<a md-button href="http://www.google.com">Default Link</a>
<a md-button [disabled]="linkActive" href="http://www.google.com">Disabled link</a>
```
