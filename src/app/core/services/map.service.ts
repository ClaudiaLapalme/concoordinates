import { ElementRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoogleApisService } from 'src/app/core/services/google-apis.service';
import { LocationService } from './location.service';
import { Geoposition } from '@ionic-native/geolocation/ngx';

@Injectable()
export class MapService {
    constructor(
        private locationService: LocationService,
        private googleApis: GoogleApisService
    ) { }

    // marker: google.maps.Marker;
    icon: google.maps.Icon = {
        url: '../../../assets/icon/center_marker.png',
        scaledSize: new google.maps.Size(30, 30), // scaled size
    };

    /**
     * Given a map reference create a map 
     * @param mapElement the reference to the html map
     */
    async loadMap(mapElement: ElementRef): Promise<google.maps.Map<Element>> {
        const mapOptions: google.maps.MapOptions = {
            center: new google.maps.LatLng(0, 0),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        try {
            const geoPos = await this.locationService.getGeoposition();
            const latLng = new google.maps.LatLng(geoPos.coords.latitude, geoPos.coords.latitude);
            mapOptions.center = latLng;
            const mapObj = this.googleApis.createMap(mapElement, mapOptions);
            this.googleApis.createMarker(latLng, mapObj, this.icon);
            mapObj.addListener('tilesloaded', () => {
                console.log('map', map);
                this.locationService.getAddressFromLatLng(latLng.lat(), latLng.lng())
                    .then(address => console.log);
            });
            return mapObj;
        } catch (error) {
            console.log(error);
            return this.googleApis.createMap(mapElement, mapOptions);
        }
    }
}
