import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {Subscriber} from "rxjs/Subscriber";
import "rxjs/add/operator/share";


@Injectable()
export class MdChipsService {
  public collection$: Observable<string[]> = new Observable(observer => {
    this._collectionObserver = observer;
  }).share();

  private _collectionObserver: Subscriber<string[]>;
  private _collection: string[] = [];

  add(chipValue: string) {
    this._collection.push(chipValue);
    this._collectionObserver.next(this._collection);
  }

  remove(label: string) {
    this._collection = this._collection.filter((c) => c !== label);
    this._collectionObserver.next(this._collection);
  }

  set(labels: string[]) {
    this._collection = labels.splice(0);
    this._collectionObserver.next(this._collection);
  }
}
