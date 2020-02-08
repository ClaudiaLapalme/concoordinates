import { Injectable } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { LocationService } from '../location/location.service';
import { GoogleApisService } from 'src/app/google-apis/google-apis.service';
import { Observable, from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MapService {
    constructor(
        private geolocation: Geolocation,
        private locationService: LocationService,
        private googleApis: GoogleApisService
    ) { }

    // marker: google.maps.Marker;
    icon: google.maps.Icon = {
        url: '../../../assets/icon/center_marker.png',
        scaledSize: new google.maps.Size(30, 30), // scaled size
    };

    // /**
    //  * Given a map reference create a map 
    //  * @param mapElement the reference to the html map
    //  */
    // loadMap(mapElement: ElementRef): Observable<google.maps.Map<Element>> {
    //     // TODO: push all async things to google-apis.service
    //     const map: google.maps.Map;
    //     const mapRef = this.geolocation.getCurrentPosition()

    //         .then((geoposition: Geoposition): Promise<google.maps.Map<Element>> => {

    //             const coords: Coordinates = geoposition.coords;
    //             const latLng: google.maps.LatLng = new google.maps.LatLng(coords.latitude, coords.longitude);

    //             const mapOptions: google.maps.MapOptions = {
    //                 center: latLng,
    //                 zoom: 15,
    //                 mapTypeId: google.maps.MapTypeId.ROADMAP
    //             };


    //             // this.locationService.getAddressFromLatLng(coords.latitude, coords.longitude);

    //             map = this.googleApis.createMap(mapElement, mapOptions);
    //             this.googleApis.createMarker(latLng, map, this.icon);

    //             map.addListener('tilesloaded', () => {
    //                 console.log('accuracy', map);
    //                 this.locationService.getAddressFromLatLng(
    //                     map.getCenter().lat(),
    //                     map.getCenter().lng()
    //                 );
    //             });

    //             return map;
    //         })
    //         .catch(error => {
    //             console.log('Error getting location', error);
    //         });
    //         return from(mapRef);
    // }
}
