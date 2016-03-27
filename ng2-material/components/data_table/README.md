# MdDataTable
MdDataTable is an enhancment of classic data tables.

## Basic data table
### Classes
| Name | Target | Description |
| --- | --- | --- |
| md-text-cell | thead th, tbody td | Declare a cell as non-numeric and left align its text. |

## Selectable data table
### Properties
| Name | Target | Type | Description |
| --- | --- | --- | --- |
| selectable | md-data-table | boolean | Enable one checkbox per line and a master checkbox to rule them all. |   
| selectableValue | tbody tr | string | value of the checkbox. If it's not set the checkbox's value will be the index of the row. |

### Events
| Name | Description |
| --- | --- |
| selectable_change | Emmited when the user select or unselect a row |

## Examples
```
<md-data-table [selectable]="true">
  <thead>
  <tr>
    <th class="md-text-cell">Material</th>
    <th>Quantity</th>
    <th>Unit price</th>
  </tr>
  </thead>
  <tbody>
  <tr *ngFor="#material of materials" [selectableValue]="material.id">
    <td class="md-text-cell">{{ material.name }}</td>
    <td>{{ material.quantity }}</td>
    <td>{{ material.price }}</td>
  </tr>
  </tbody>
</md-data-table>
```
