import { ElementRef, Injectable  } from '@angular/core';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
    map: google.maps.Map;
    mapLoaded = false;
    navigationParams: any;
    navigationParamsLoaded = false;

  constructor() { }

  /**
   * Stores global reference copy  map object
   *
   */
  storeMapRef(map: google.maps.Map): void {
    this.map = _.cloneDeep(map);
    this.mapLoaded = true;
  }

  /**
   * Checks if map reference was set
   *
   */
  isMapRefSet(): boolean {
    return this.mapLoaded;
  }

  /**
   * returns map reference
   *
   */
  getMapRef(): google.maps.Map {
    return this.map;
  }


  /**
   * Stores global navigation params object
   *
   */
  storeNavigationParams(params: NavigationParams): void {
    this.navigationParams = params;
    this.navigationParamsLoaded = true;
  }

  /**
   * Checks if Navigation params are loaded
   *
   */
  areNavigationParamsLoaded(): boolean {
    return this.navigationParamsLoaded;
  }

  /**
   * returns navigation params
   */
  getNavigationParams(): NavigationParams {
    return this.navigationParams;
  }


}

export interface NavigationParams {
  location: string,
  isRouteToEvent: boolean
}
