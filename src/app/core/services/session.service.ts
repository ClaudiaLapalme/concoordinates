import { ElementRef, Injectable  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

    mapElement: ElementRef;
    mapElementLoaded = false;

  constructor() { }

  storeMapRef(mapElement: ElementRef): void {
    this.mapElement = mapElement;
    this.mapElementLoaded = true;
  }

  isMapRefSet(): boolean {
    return this.mapElementLoaded;
  }

  getMapRef(): ElementRef {
    return this.mapElement;
  }
}
