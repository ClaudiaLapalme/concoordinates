import { ElementRef, Injectable } from '@angular/core';

@Injectable()
export class GoogleApisService {

    constructor() { }

    public createMap(mapElement: ElementRef<any>, mapOptions: google.maps.MapOptions): google.maps.Map<Element> {
        return new google.maps.Map(mapElement.nativeElement, mapOptions);
    }

    public createMarker(position: google.maps.LatLng, map: google.maps.Map<Element>, icon: google.maps.Icon): google.maps.Marker {
        return new google.maps.Marker({ position, map, icon });
    }

    public createLatLng(latitude: number, longitude: number): google.maps.LatLng {
        return new google.maps.LatLng(latitude, longitude);
    }

    public drawBuildingOverlay(buildingCoords: {lat: number, lng: number}[]){
        return new google.maps.Polygon({paths: buildingCoords, strokeColor: '#FF0000', strokeOpacity: 0.8, strokeWeight: 2, fillColor: '#FF0000', fillOpacity: 0.35});
    }

}
