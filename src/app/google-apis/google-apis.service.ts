import { Injectable } from '@angular/core';
import { ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleApisService {

  constructor() { }

  public createMarker(latLng: google.maps.LatLng, map: google.maps.Map<Element>, icon: google.maps.Icon): google.maps.Marker {
    return new google.maps.Marker({
      position: latLng,
      map,
      icon,
    });
  }

  public createMap(mapElement: ElementRef<any>, mapOptions: google.maps.MapOptions): any {
    return new google.maps.Map(mapElement.nativeElement, mapOptions);
  }

}
