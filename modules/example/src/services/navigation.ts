import {Injectable} from "angular2/core";
import {IComponentMeta} from "./components";

export interface INavigationLink {
  /**
   * Brief description of no more than a few words
   */
  brief: string;
  /**
   * Value to bind to routeLink.
   */
  routeLink: any[];
}

@Injectable()
export class NavigationService {
  public currentTitle: string = null;
  public nextLink: INavigationLink = null;
  public prevLink: INavigationLink = null;

  componentLink(comp: IComponentMeta): INavigationLink {
    return {
      brief: comp.name,
      routeLink: ['Component', {id: comp.id}]
    };
  }
}
