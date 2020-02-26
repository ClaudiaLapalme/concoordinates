import { Injectable } from '@angular/core';
import { Building } from '../models/building';
import { Campus } from '../models/campus';
import { Coordinates } from "src/app/core/models/coordinates"

@Injectable()
export class OutdoorPOIFactoryService {

  constructor() { }

  createBuilding(
    name: string,
    coordinates: Coordinates,
    id: string): Building {

      return new Building(name, coordinates, id);
  };


  createCampus(
    name: string,
    coordinates: Coordinates,
    buildings: Building[]): Campus {

      return new Campus(name, coordinates, buildings);
  };
}
