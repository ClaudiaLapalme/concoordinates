import { ElementRef, Injectable } from '@angular/core';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { GoogleApisService } from 'src/app/core/services/google-apis.service';
import { LocationService } from './location.service';
import { LatLngLiteral } from '@google/maps';


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

                        //NOTE: Manual Testing purposes only! hardcoded Hall/JMSB Building Coords and called building.service to visually inspect functionality.
                        //Overlay will not be rendered from map.service; but will instead be moved to Campus class or other location.
                        var hallCoords = [
                            {lat: 45.496827, lng: -73.578845},
                            {lat: 45.497369, lng: -73.578335},
                            {lat: 45.497730, lng: -73.579049},
                            {lat: 45.497169, lng: -73.579578}
                        ];

                        var mbCoords = [
                            {lat: 45.495360, lng: -73.579367},
                            {lat: 45.495525, lng: -73.579193},
                            {lat: 45.495437, lng: -73.578938},
                            {lat: 45.495194, lng: -73.578520},
                            {lat: 45.494993, lng: -73.578761},
                            {lat: 45.495168, lng: -73.579163},
                            {lat: 45.495220, lng: -73.579112},
                            ]


                        var hallBuilding = new Building('Hall', hallCoords, mapObj);
                        var mbBuilding = new Building('JMSB', mbCoords, mapObj);
                        hallBuilding.displayBuildingOutline();
                        mbBuilding.displayBuildingOutline();


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
}
