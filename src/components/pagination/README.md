# MdPagination
Use pagination components when you need to display large numbers of items. Configure the number of items to display
in a page, control which page is active, and format the display of the current page state.

The pagination model is a plain javascript object that contains number values for *currentPage*, *itemsPerPage*, and *totalItems*.

This set of components follows the general guidelines provided [here](http://www.google.com/design/spec/components/data-tables.html#data-tables-interaction)

## `<md-pagination>`

### Properties
| Name | Type | Description |
| --- | --- | --- |
| name | string | Shared name for the pagination model |
| model | IPaginationModel | Pagination configuration model |
| controls | boolean | Toggle the display of next/back controls |
| range | boolean | Toggle the display of range |
| rangeFormat | string | Range format string with `{start}`, `{end}`, `{total}` |
| itemsPerPage | boolean | Toggle the display of items per page selector |
| itemsPerPageBefore | string | Prepend items per page selector with a string |
| itemsPerPageAfter | string | Append items per page selector with a string |
| itemsPerPageOptions | number[] | Page size options as an array of numbers |
           
### Events
| Name | Type | Description |
| --- | --- | --- |
| onPaginationChange | EventEmitter<IPaginationChange> | Emitted when the model changes |



## `<md-pagination-items-per-page>`

Length selector component that controls the number of items shown on each page.

### Properties
| Name | Type | Description |
| --- | --- | --- |
| name | string | Shared name for the pagination model |
| model | IPaginationModel | Pagination configuration model |
| itemsPerPageBefore | string | Prepend items per page selector with a string |
| itemsPerPageAfter | string | Append items per page selector with a string |
| itemsPerPageOptions | number[] | Page size options as an array of numbers |


## `<md-pagination-controls>`

Pagination controls component that move back and forth between pages.

### Properties
| Name | Type | Description |
| --- | --- | --- |
| name | string | Shared name for the pagination model |
| model | IPaginationModel | Pagination configuration model |


## `<md-pagination-range>`

Range display component that displays the current state of the pagination model.

### Properties
| Name | Type | Description |
| --- | --- | --- |
| name | string | Shared name for the pagination model |
| model | IPaginationModel | Pagination configuration model |
| rangeFormat | string | Range format string with `{start}`, `{end}`, `{total}` |

## PaginationService

Data service that coordinate state between various components. Prefer the `onPaginationChange` output of `MdPagination`. 
If needed, subscribe to the `onChange` property or push changes via `change` on the service. 
