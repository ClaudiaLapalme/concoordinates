import { Injectable } from '@angular/core';
import { POI, Campus, Building, Coordinates, IndoorMap } from '../models';
import { MapService } from '../services'

import ConcordiaCampuses from '../data/concordia-campuses.json';
import ConcordiaBuildings from '../data/concordia-buildings.json';

@Injectable()
export class OutdoorPOIFactoryService {

    private mapService: MapService;

    constructor() { }

    setMapService(mapService: MapService): void {
        this.mapService = mapService;
    }

    createBuilding(name: string, code: string, coordinates: Coordinates, indoorMaps: Record<number, IndoorMap>): Building {

        return new Building(name, code, coordinates, indoorMaps);
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

        for (const buildingCode of buildingsToGenerate) {

            const buildingCoordinates = new Coordinates(
                                              ConcordiaBuildings[buildingCode].coordinates.lat,
                                              ConcordiaBuildings[buildingCode].coordinates.lng,
                                              null);

            let indoorMaps = null;
            if (buildingCode) {
                indoorMaps = this.mapService.loadIndoorMaps();
            }

            buildings.push(this.createBuilding(ConcordiaBuildings[buildingCode].name, buildingCode, buildingCoordinates, indoorMaps))
        }

        return buildings;
    }
}
