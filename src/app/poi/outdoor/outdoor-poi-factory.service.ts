import { Injectable } from '@angular/core';
import { OutdoorPOI } from './outdoor-poi';
import { Builder } from 'protractor';
import { Building } from './campus/building/building';
import { Campus } from './campus/campus';
import { build$ } from 'protractor/built/element';
import { Coordinates } from "src/app/core/coordinates"

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
