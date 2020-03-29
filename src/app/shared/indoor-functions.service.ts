import { Injectable } from '@angular/core';
import * as indoorCoordinates from '../core/data/indoor-poi-to-coordinates.json';
 

@Injectable({
  providedIn: 'root'
})
export class IndoorFunctionsService {

  constructor() { }

  // TODO Fix this to validate for the coordinate existence in the poi list
  coordinatesMatchIndoorParams(startCoordinates: string, endCoordinates: string): boolean {
    return (this.coordinateIsIndoors(startCoordinates) && this.coordinateIsIndoors(endCoordinates));
  }

  coordinateIsIndoors(coordinate: string): boolean{
    const moduleKey = "default";    // TODO fix this
    const indoorCoords: IndoorCoordinates = indoorCoordinates[moduleKey];
    return !!indoorCoords[coordinate];
  }
}

interface IndoorCoordinates {
  [coordinateName: string]: { lat, lng, fN };
}
