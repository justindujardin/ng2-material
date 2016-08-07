import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {IPaginationModel, IPaginationChange} from './pagination';


@Injectable()
export class PaginationService {
  public onChange: Subject<IPaginationChange>;

  constructor() {
    this.onChange = new Subject(null);
  }

  change(name: string = 'default', pagination: IPaginationModel) {
    let newEvent: IPaginationChange = {
      name: 'pagination_changed',
      target: name,
      pagination: pagination
    };

    this.onChange.next(newEvent);
  }
}
