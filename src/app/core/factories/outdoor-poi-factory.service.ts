import { Injectable } from '@angular/core';
import { OutdoorPOI } from '../models/outdoor-poi';
import { Building } from '../models/building';
import { Campus } from '../models/campus';
import { Coordinates } from "src/app/core/models/coordinates"

@Injectable()
export class OutdoorPOIFactoryService {

  constructor() { }

  createBuilding(
    name: string,
    coordinates: Coordinates): OutdoorPOI {
      
      return new Building(name, coordinates);
  };


  createCampus(
    name: string,
    coordinates: Coordinates,
    buildings: Building[]): OutdoorPOI {

      return new Campus(name, coordinates, buildings);
  };
}
