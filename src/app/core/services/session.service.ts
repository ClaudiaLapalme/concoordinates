import { ElementRef, Injectable  } from '@angular/core';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

    map: google.maps.Map;
    mapLoaded = false;

  constructor() { }

  /**
   * Stores global reference copy  map object
   *
   * @param {google.maps.Map} map
   */
  storeMapRef(map: google.maps.Map): void {
    this.map = _.cloneDeep(map);
    this.mapLoaded = true;
  }

  /**
   * Checks if map reference was set
   *
   * @returns {boolean}
   * @memberof SessionService
   */
  isMapRefSet(): boolean {
    return this.mapLoaded;
  }

  // returns map reference
  getMapRef(): google.maps.Map {
    return this.map;
  }
}
