import { ElementRef, Injectable } from '@angular/core';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { GoogleApisService } from 'src/app/core/services/google-apis.service';
import { LocationService } from './location.service';
import { LatLngLiteral } from '@google/maps';
import { Building } from 'src/app/core/models/building';
import { Coordinates } from '../models/coordinates';


@Injectable()
export class MapService {
    constructor(
        private locationService: LocationService,
        private googleApis: GoogleApisService
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
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        try {
            const geoPos: Geoposition = await this.locationService.getGeoposition();
            if (false) {

                const latLng = this.googleApis.createLatLng(geoPos.coords.latitude, geoPos.coords.longitude);

                mapOptions.center = latLng;

                const mapObj = this.googleApis.createMap(mapElement, mapOptions);
                this.googleApis.createMarker(latLng, mapObj, this.icon);

                mapObj.addListener('tilesloaded',
                    this.tilesLoadedHandler(mapObj,
                        latLng.lat(), latLng.lng()));
                        

                        let coordinates = new Coordinates(0,0,0);
                        var hallBuilding = new Building('B', coordinates);
                        var mbBuilding = new Building('MB', coordinates);
                        hallBuilding.displayBuildingOutline(mapObj);
                        mbBuilding.displayBuildingOutline(mapObj);


                return mapObj;

            } else {
                const latLng = this.googleApis.createLatLng(geoPos.coords.latitude, geoPos.coords.longitude);
                const mapObj = this.googleApis.createMap(mapElement, mapOptions);
                mapObj.addListener('tilesloaded',
                    this.tilesLoadedHandler(mapObj,
                        latLng.lat(), latLng.lng()));
                        

                        let coordinates = new Coordinates(0,0,0);
                        var hallBuilding = new Building('D', coordinates);
                        var mbBuilding = new Building('EV', coordinates);
                        var cBuilding = new Building('GM', coordinates);
                        cBuilding.displayBuildingOutline(mapObj);
                        hallBuilding.displayBuildingOutline(mapObj);
                        mbBuilding.displayBuildingOutline(mapObj);


                return mapObj;
                
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
}
