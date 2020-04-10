import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor() { }

  getPlaceIcon(): google.maps.Icon {
      return  {
        url: '../../../assets/icon/place_marker.svg',
        scaledSize: new google.maps.Size(30, 30) 
    };
  }

  getLocationIcon() : google.maps.Icon {
      return {
        url: '../../../assets/icon/location_marker.png',
        scaledSize: new google.maps.Size(30, 30) // scaled size
    };
  }
}
