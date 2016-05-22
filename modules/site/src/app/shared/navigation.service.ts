import {Injectable} from '@angular/core';
import {IComponentMeta} from './components.service';

export interface INavigationLink {
  /**
   * Brief description of no more than a few words
   */
  brief: string;
  /**
   * Value to bind to routeLink.
   */
  routeLink: string;
}

@Injectable()
export class NavigationService {
  public currentTitle: string = null;
  public nextLink: INavigationLink = null;
  public prevLink: INavigationLink = null;

  componentLink(comp: IComponentMeta): INavigationLink {
    return {brief: comp.name, routeLink: '/components/' + comp.id};
  }
}
