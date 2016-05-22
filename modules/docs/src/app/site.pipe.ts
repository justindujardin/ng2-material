import {Pipe} from '@angular/core';

@Pipe({name: 'componentOrder'})
export class ComponentsOrderByPipe {
  transform(array: Array<string>, args: string): Array<string> {
    array.sort((a: any, b: any): number => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    return array;
  }
}
