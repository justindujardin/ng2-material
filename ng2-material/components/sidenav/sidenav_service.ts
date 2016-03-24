import {Injectable} from "angular2/core";
import {MdSidenav} from "./sidenav";

@Injectable()
export class SidenavService {
  show(name: string): Promise<void> {
    let instance: MdSidenav = this.find(name);
    if (!instance) {
      return Promise.reject('invalid container');
    }
    return instance.show();
  }

  hide(name: string): Promise<void> {
    let instance: MdSidenav = this.find(name);
    if (!instance) {
      return Promise.reject('invalid container');
    }
    return instance.hide();
  }

  find(name: string): MdSidenav {
    return this._instances.filter((c: MdSidenav) => {
        return c.name === name;
      })[0] || null;
  }

  private _instances: MdSidenav[] = [];

  register(instance: MdSidenav) {
    this._instances.push(instance);
  }

  unregister(instance: MdSidenav) {
    this._instances = this._instances.filter((c: MdSidenav) => {
      return c.name !== instance.name;
    });
  }

}
