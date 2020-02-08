import { ElementRef, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GoogleApisService {

    constructor() { }

    public createMap(mapElement: ElementRef<any>, mapOptions: google.maps.MapOptions): any {
        return new google.maps.Map(mapElement.nativeElement, mapOptions);
    }

    public createMarker(position: google.maps.LatLng, map: google.maps.Map<Element>, icon: google.maps.Icon): google.maps.Marker {
        return new google.maps.Marker({ position, map, icon });
    }

}
