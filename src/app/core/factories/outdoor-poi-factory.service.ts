import { Injectable } from '@angular/core';
import { Coordinates } from '../models/coordinates';
import { POI, Campus, Building } from '../models';

import ConcordiaCampuses from '../data/concordia-campuses.json';
import ConcordiaBuildings from '../data/concordia-buildings.json';

@Injectable()
export class OutdoorPOIFactoryService {

  constructor() { }

  createBuilding(name: string, code: string, coordinates: Coordinates): Building {

    return new Building(name, code, coordinates);
  };

  createCampus(name: string, code: string, coordinates: Coordinates, buildings: Building[]): Campus {

    return new Campus(name, code, coordinates, buildings);
  };

  loadOutdoorPOIs(): POI[] {

    let campuses = this.loadCampuses();
    let outdoorPOIs: POI[] = campuses;

    for (let campus of campuses){
      outdoorPOIs = outdoorPOIs.concat(campus.getBuildings())
    }
    
    return outdoorPOIs;
  }

  loadCampuses(): Campus[] {

    let campuses: Campus[] = [];

    for (let campus of ConcordiaCampuses) {

      let campusCoordinates = new Coordinates(
                                      campus.coordinates.lat,
                                      campus.coordinates.lng,
                                      null);

      let campusBuildings = this.loadBuildings(campus.buildings);


      campuses.push(this.createCampus(campus.name, campus.code, campusCoordinates, campusBuildings));
    }

    return campuses;
  };

  loadBuildings(buildingsToGenerate: string[]): Building[] {

    let buildings: Building[] = [];

    for (let buildingCode of buildingsToGenerate) {

      let buildingCoordinates = new Coordinates(
                                        ConcordiaBuildings[buildingCode].coordinates.lat,
                                        ConcordiaBuildings[buildingCode].coordinates.lng,
                                        null);

      buildings.push(this.createBuilding(ConcordiaBuildings[buildingCode].name, buildingCode, buildingCoordinates))
    }

    return buildings;
  }
}
