import { ElementRef, Injectable  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

    map: google.maps.Map;
    mapLoaded = false;

  constructor() { }

  storeMapRef(map: google.maps.Map): void {
    this.map = map;
    this.mapLoaded = true;
  }

  isMapRefSet(): boolean {
    return this.mapLoaded;
  }

  getMapRef(): google.maps.Map {
    return this.map;
  }
}
