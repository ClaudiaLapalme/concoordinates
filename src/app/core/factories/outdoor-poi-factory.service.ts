import { Injectable } from '@angular/core';;
import { Campus } from '../models/campus';
import { Coordinates, Building } from '../models';
import ConcordiaCampuses from '../data/concordia-campuses.json';
import ConcordiaBuildings from '../data/concordia-buildings.json';

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

  /** Temporary... (Should be in OutdoorMap)
   * Generates the campuses and buildings.
   * Also draws the buildings outlines.
   * Returns a array of campuses. (not used right now)
   * @param mapObj 
   */
  loadCampuses(mapObj: google.maps.Map<Element>):Campus[] {
      
    let campuses: Campus[] = [];
    
    //Loop through the concordia-campuses.json
    for(var id in ConcordiaCampuses){
        
      let campusName = ConcordiaCampuses[id].name;
      let campusBuildings: Building[] = [];
      let campusCoordinates = new Coordinates(
                                      ConcordiaCampuses[id].coordinates.lat,
                                      ConcordiaCampuses[id].coordinates.lng, null);

      //Loop through the list of buildings of the campus
      ConcordiaCampuses[id].buildings.forEach(id => {
        
        let buildingName = ConcordiaBuildings[id].name
        let buildingCoordinates =  new Coordinates(
                                            ConcordiaBuildings[id].coordinates.lat,
                                            ConcordiaBuildings[id].coordinates.lat, null);

        //Create building
        let building = this.createBuilding(buildingName, buildingCoordinates, id);
        //Display the outline
        building.displayBuildingOutline(mapObj);
        //Add the building to the Buildings array of the campus
        campusBuildings.push(building);
          
      });

      //Create campus
      campuses.push(this.createCampus(campusName, campusCoordinates, campusBuildings));
    }   
    return campuses;
  }
}
