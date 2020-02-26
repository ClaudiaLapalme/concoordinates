import { ElementRef, Injectable } from '@angular/core';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { GoogleApisService } from './google-apis.service';
import { LocationService } from './location.service';
import { OutdoorPOIFactoryService } from '../factories';
import { Coordinates, Building } from '../models';
import ConcordiaCampuses from '../data/concordia-campuses.json';
import ConcordiaBuildings from '../data/concordia-buildings.json';


@Injectable()
export class MapService {
    constructor(
        private locationService: LocationService,
        private googleApis: GoogleApisService,
        private outdoorPOIFactory: OutdoorPOIFactoryService
    ) { }

    icon: google.maps.Icon = {
        url: '../../../assets/icon/center_marker.png',
        scaledSize: new google.maps.Size(30, 30), // scaled size
    };

    /**
     * Given a map reference create a map 
     * @param mapElement the reference to the html map
     */
    async loadMap(mapElement: ElementRef): Promise<google.maps.Map<Element>> {
        let mapOptions: google.maps.MapOptions = {
            center: new google.maps.LatLng(45.4959053, -73.5801141),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        try {
            const geoPos: Geoposition = await this.locationService.getGeoposition();
            if (geoPos) {

                const latLng = this.googleApis.createLatLng(geoPos.coords.latitude, geoPos.coords.longitude);

                mapOptions.center = latLng;

                const mapObj = this.googleApis.createMap(mapElement, mapOptions);
                this.googleApis.createMarker(latLng, mapObj, this.icon);

                mapObj.addListener('tilesloaded',
                    this.tilesLoadedHandler(mapObj,
                        latLng.lat(), latLng.lng()));
                    
                this.loadCampuses(mapObj);        
                return mapObj;

            } else {
                return this.googleApis.createMap(mapElement, mapOptions); 
            }
        } catch (error) {
            console.log(error);
            return this.googleApis.createMap(mapElement, mapOptions);
        }
    }

    private tilesLoadedHandler(mapObj: google.maps.Map, latitude: number, longitude: number) {
        return () => {
            console.log('mapObj', mapObj); // debug
            this.locationService.getAddressFromLatLng(latitude, longitude).then(console.log);
        };
    }

    /**
     * To discuss with the team:
     * - The following three functions should be inside another file (OutdoorMap not implemented).
     * - A json parser service should be created. 
     */
    private loadCampuses(mapObj: google.maps.Map<Element>):void {
        
        //Loop through the concordia-campuses.json
        for(var id in ConcordiaCampuses){
            
            if (this.campusDataFound(id)) {

                let campusName = ConcordiaCampuses[id].name;
                let campusBuildings: Building[] = [];
                let campusCoordinates = new Coordinates(
                                                ConcordiaCampuses[id].coordinates.lat,
                                                ConcordiaCampuses[id].coordinates.lng, null);

                //Loop through the list of buildings of the campus
                ConcordiaCampuses[id].buildings.forEach(id => {
                    
                    if (this.buildingDataFound(id)) {

                        let buildingName = ConcordiaBuildings[id].name
                        let buildingCoordinates =  new Coordinates(
                                                            ConcordiaBuildings[id].coordinates.lat,
                                                            ConcordiaBuildings[id].coordinates.lat, null);

                        //Create building
                        let building = this.outdoorPOIFactory.createBuilding(buildingName, buildingCoordinates, id);
                        //Display the outline
                        building.displayBuildingOutline(mapObj);
                        //Add the building to the Buildings array of the campus
                        campusBuildings.push(building);
                    }
                });

                //Create campus
                this.outdoorPOIFactory.createCampus(campusName, campusCoordinates, campusBuildings);
            }
        }
    }
    

    private campusDataFound(id): boolean{

        return ConcordiaCampuses.hasOwnProperty(id);
    }

    private buildingDataFound(id): boolean{

        return ConcordiaBuildings.hasOwnProperty(id);
    }
}
