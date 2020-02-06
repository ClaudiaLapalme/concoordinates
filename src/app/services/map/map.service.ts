import { Injectable } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { LocationService } from '../location/location.service';
import { GoogleApisService } from 'src/app/google-apis/google-apis.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(
    private geolocation: Geolocation,
    private locationService: LocationService,
    private googleApis: GoogleApisService
  ) {}

  // TODO: encapsulate these members into one?
  map: google.maps.Map;
  address: string;
  marker: google.maps.Marker;
  icon: google.maps.Icon = {
    url: '../../../assets/icon/center_marker.png',
    scaledSize: new google.maps.Size(30, 30), // scaled size
  };

  loadMap(mapElement: ElementRef, startingLatitude: number = 0.0, startingLongitude: number = 0.0): void {
    // TODO: push all async things to google-apis.service
    this.geolocation.getCurrentPosition({enableHighAccuracy: true})
      .then((geoposition: Geoposition) => {

        const coords: Coordinates = geoposition.coords;

        let latLng: google.maps.LatLng;
        if (startingLatitude === 0.0 && startingLongitude === 0.0) {
          latLng = new google.maps.LatLng(coords.latitude, coords.longitude);
        } else {
          latLng = new google.maps.LatLng(startingLatitude, startingLongitude);
        }

        const mapOptions: google.maps.MapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };


        this.locationService.getAddressFromCoords(coords.latitude, coords.longitude);

        this.map = this.googleApis.createMap(mapElement, mapOptions);
        this.marker = this.googleApis.createMarker(latLng, this.map, this.icon);

        this.map.addListener('tilesloaded', () => {
          console.log('accuracy', this.map);
          this.locationService.getAddressFromCoords(
            this.map.getCenter().lat(),
            this.map.getCenter().lng()
          );
        });
      })
      .catch(error => {
        console.log('Error getting location', error);
      });
  }
}
