import { Injectable } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationService } from '../location/location.service';
// import {  } from '@google/maps';

// declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(
    private geolocation: Geolocation,
    private locationService: LocationService
  ) {}

  map: any;
  address: string;
  marker: any;

  icon = {
    url: '../../../assets/icon/center_marker.png',
    scaledSize: new google.maps.Size(30, 30), // scaled size
  };

  loadMap(
    mapElement: ElementRef,
    startingLatitude: number = 0.0,
    startingLongitude: number = 0.0
  ) {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        let latLng: any;
        if (startingLatitude == 0.0 && startingLongitude == 0.0) {
          latLng = new google.maps.LatLng(
            resp.coords.latitude,
            resp.coords.longitude
          );
        } else {
          latLng = new google.maps.LatLng(
            startingLatitude,
            startingLongitude
          );
        }
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.locationService.getAddressFromCoords(
          resp.coords.latitude,
          resp.coords.longitude
        );

        this.map = new google.maps.Map(mapElement.nativeElement, mapOptions);

        this.marker = new google.maps.Marker({
          position: latLng,
          map: this.map,  
          icon: this.icon
        });

        this.map.addListener('tilesloaded', () => {
          console.log('accuracy', this.map);
          this.locationService.getAddressFromCoords(
            this.map.center.lat(),
            this.map.center.lng()
          );
        });
      })
      .catch(error => {
        console.log('Error getting location', error);
      });
  }
}
