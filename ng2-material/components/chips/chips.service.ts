import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {Subscriber} from "rxjs/Subscriber";
import "rxjs/add/operator/share";
import {uuid} from "../../core/util/uuid";

/**
 * Basic data object for a chip.
 */
export interface IMdChipData {
  /**
   * Human readable text to show on the chip
   */
  label: string;
  /**
   * Unique ID to differentiate the chip from others in the list
   */
  id: any;

  /**
   * Arbitrary user data associated with a chip.
   */
  data?: any;
}


@Injectable()
export class MdChipsService {
  public collection$: Observable<IMdChipData[]> = new Observable(observer => {
    this._collectionObserver = observer;
  }).share();

  private _collectionObserver: Subscriber<IMdChipData[]>;
  private _collection: IMdChipData[] = [];
  private _next = () => this._collectionObserver && this._collectionObserver.next(this._collection);

  add(chip: string, unique: boolean = false, id: string = uuid()) {
    if(!unique || !this.isInCollection(chip)) {
      this._collection.push({label: chip, id: id});
      this._next();
    }
  }

  remove(chip: IMdChipData) {
    this._collection = this._collection.filter((c) => c.id !== chip.id);
    this._next();
  }

  setLabels(chips: string[]) {
    this._collection = chips.map((c:string) => ({label: c, id: uuid()}));
    this._next();
  }

  removeLast() {
    this._collection = this._collection.splice(0, this._collection.length - 1);
    this._next();
  }

  isInCollection(chip: string) {
    for (var i = 0; i < this._collection.length; i++) {
      if(this._collection[i].label == chip) {
        return true
      }
    }
    return false;
  }
}
