import { Injectable } from '@angular/core';
import * as indoorCoordinates from '../core/data/indoor-poi-to-coordinates.json';
import { Coordinates } from '../core/models/coordinates';


@Injectable({
  providedIn: 'root'
})
export class IndoorFunctionsService {

  constructor() { }

  // TODO Fix this to validate for the coordinate existence in the poi list
  bothCoordinatesMatchIndoorParams(startCoordinates: string, endCoordinates: string): boolean {
    return (this.coordinateIsIndoors(startCoordinates) && this.coordinateIsIndoors(endCoordinates));
  }

  startCoordinateIsIndoors(startCoordinates: string, endCoordinates: string): boolean {
    return (this.coordinateIsIndoors(startCoordinates) && !this.coordinateIsIndoors(endCoordinates));
  }

  endCoordinateIsIndoors(startCoordinates: string, endCoordinates: string): boolean {
    return (!this.coordinateIsIndoors(startCoordinates) && this.coordinateIsIndoors(endCoordinates));
  }

  getIndoorCoordinate(coordinate: string): Coordinates {
    if (!this.coordinateIsIndoors(coordinate)) {
      throw new Error('This is not an indoor coordinate');
    }
    const moduleKey = 'default';    // TODO fix this
    const indoorCoords: IndoorCoordinates = indoorCoordinates[moduleKey];
    return new Coordinates(+indoorCoords[coordinate].lat, +indoorCoords[coordinate].lng, +indoorCoords[coordinate].fN);
  }

  coordinateIsIndoors(coordinate: string): boolean {
    const moduleKey = 'default';    // TODO fix this
    const indoorCoords: IndoorCoordinates = indoorCoordinates[moduleKey];
    return !!indoorCoords[coordinate];
  }
}

interface IndoorCoordinates {
  [coordinateName: string]: { lat: number, lng: number, fN: number };
}
