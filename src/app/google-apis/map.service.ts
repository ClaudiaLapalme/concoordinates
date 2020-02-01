import { Injectable } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationService } from './location.service';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private geolocation: Geolocation, private locationService: LocationService ) {
  }

  map: any;
  address:string;

  loadMap(mapElement: ElementRef, starting_latitude: number = 0.0, starting_longitude: number = 0.0) {
    this.geolocation.getCurrentPosition().then((resp) => {
        let latLng: any;
      if(starting_latitude==0.0 && starting_longitude==0.0){
        latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      }else{
        latLng = new google.maps.LatLng(starting_latitude,starting_longitude);
      }
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.locationService.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
 
      this.map = new google.maps.Map(mapElement.nativeElement, mapOptions);
 
      this.map.addListener('tilesloaded', () => {
        console.log('accuracy',this.map);
        this.locationService.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });
 
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
 
}
