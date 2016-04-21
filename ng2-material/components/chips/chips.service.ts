import {Injectable} from "angular2/core";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';


@Injectable()
export class MdChipsService {
  public collection$: Observable<Array<string>>;
  private _collectionObserver: any;
  private _collection: Array<string>;

  constructor() {
    this._collection = [];

    this.collection$ = new Observable(observer => {
      this._collectionObserver = observer;
    }).share();
  }


  add(chipValue: string) {
    this._collection.push(chipValue);
    this._collectionObserver.next(this._collection);
  }


  remove(chipValue: string, removeLast: boolean) {

    if (removeLast) {
      //Remove last chip


    } else {
      //remove chip
      this._collection.forEach((c, index) => {
        if (c === chipValue) { this._collection.splice(index, 1); }
      });
    }

    this._collectionObserver.next(this._collection);
  }
}
