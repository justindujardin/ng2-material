# MdPagination
MdPagination allow you to use pagination related to your datas. There's any real recommandations about pagination 
but this component follow [this example](http://www.google.com/design/spec/components/data-tables.html#data-tables-interaction)

## `<md-pagination>`

Main component of the pagination

### Properties
| Name | Type | Description |
| --- | --- | --- |
| name | string | Group pagination by name to enable multiple instance of MdPagination on the same page |
| model | IPaginationModel | Model that include pagination informations: *currentPage*, *itemsPerPage*, *totalItems* |
| controls | boolean | Toggle the display of controls |
| range | boolean | Toggle the display of range |
| rangeFormat | string | Override the default format of the range by using `{start}`, `{end}`, `{total}` keys |
| itemsPerPage | boolean | Toggle the display of items per page selector |
| itemsPerPageBefore | string | Prepend items per page selector with a string |
| itemsPerPageAfter | string | Append items per page selector with a string |
| itemsPerPageOptions | Array<number> | available lengths to display in the combobox. If you don't provide choices, the selector won't be displayed |
           
### Events
| Name | Type | Description |
| --- | --- | --- |
| onPaginationChange | EventEmitter<IPaginationChange> | Emitted when something change on the model: *currentPage*, *itemsPerPage*, *totalItems* |


## `<md-pagination-items-per-page>`

Length selector component

### Properties
| Name | Type | Description |
| --- | --- | --- |
| name | string | Group pagination by name to enable multiple instance of MdPagination on the same page |
| model | IPaginationModel | Model that include pagination informations: *currentPage*, *itemsPerPage*, *totalItems* |
| itemsPerPageBefore | string | Prepend items per page selector with a string |
| itemsPerPageAfter | string | Append items per page selector with a string |
| itemsPerPageOptions | Array<number> | available lengths to display in the combobox. If you don't provide choices, the selector won't be displayed |


## `<md-pagination-controls>`

Pagination controls component

### Properties
| Name | Type | Description |
| --- | --- | --- |
| name | string | Group pagination by name to enable multiple instance of MdPagination on the same page |
| model | IPaginationModel | Model that include pagination informations: *currentPage*, *itemsPerPage*, *totalItems* |


## `<md-pagination-range>`

Range display component

### Properties
| Name | Type | Description |
| --- | --- | --- |
| name | string | Group pagination by name to enable multiple instance of MdPagination on the same page |
| model | IPaginationModel | Model that include pagination informations: *currentPage*, *itemsPerPage*, *totalItems* |
| rangeFormat | string | Override the default format of the range by using `{start}`, `{end}`, `{total}` keys |

## PaginationService

It's the service that help pagination components to communicate between them. You can subscribe to the `onChange` property or push changes via `change` function of this service 
but you should avoid this and prefer subscribing to `onPaginationChange` output of `MdPagination`.
