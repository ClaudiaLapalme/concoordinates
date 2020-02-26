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

    // const LOYALA_COORDINATES: google.maps.LatLng = new google.maps.LatLng();
    SWG_COORDINATES: google.maps.LatLng = new google.maps.LatLng(45.4959053, -73.5801141);

    /**
     * Given a map reference create a map 
     * @param mapElement the reference to the html map
     */
    async loadMap(mapElement: ElementRef): Promise<google.maps.Map<Element>> {
        let mapOptions: google.maps.MapOptions = {
            // center: new google.maps.LatLng(45.4959053, -73.5801141),
            center: this.SWG_COORDINATES,
            zoom: 15,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP]
            },
            disableDefaultUI: true,
            mapTypeControl: false,
            scaleControl: true,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE
            },
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

                return mapObj;

            } else {
                const map = this.googleApis.createMap(mapElement, mapOptions);
                // var centerControlDiv = document.createElement('div');
                // var centerControl = new CenterControl(centerControlDiv, map, this.SWG_COORDINATES);

                // centerControlDiv.index = 1;
                // centerControlDiv.style['padding-top'] = '10px';
                // map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

                return map;
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