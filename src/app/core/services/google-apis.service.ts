import { ElementRef, Injectable } from '@angular/core';

@Injectable()
export class GoogleApisService {
    constructor() {}

    public createMap(
        mapElement: ElementRef<any>,
        mapOptions: google.maps.MapOptions
    ): google.maps.Map<Element> {
        return new google.maps.Map(mapElement.nativeElement, mapOptions);
    }

    public createMarker(
        position: google.maps.LatLng,
        map: google.maps.Map<Element>,
        icon: google.maps.Icon
    ): google.maps.Marker {
        return new google.maps.Marker({ position, map, icon });
    }

    public createLatLng(
        latitude: number,
        longitude: number
    ): google.maps.LatLng {
        return new google.maps.LatLng(latitude, longitude);
    }

    public getGoogleMapRoutes(
        dirRequest: google.maps.DirectionsRequest
    ): Promise<google.maps.DirectionsResult> {
        return new Promise<google.maps.DirectionsResult>(resolve => {
            new google.maps.DirectionsService().route(
                dirRequest,
                (res, status) => {
                    if (status === 'OK') {
                        resolve(res);
                    } else {
                        throw new Error('Error the status is: ' + status);
                    }
                }
            );
        });
    }
    public getDirectionsService(): google.maps.DirectionsService {
        return new google.maps.DirectionsService();
    }
    public getMapRenderer(): google.maps.DirectionsRenderer {
        return new google.maps.DirectionsRenderer();
    }
}
