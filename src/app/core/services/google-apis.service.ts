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

    public computeDistance(firstLocation: google.maps.LatLng, secondLocation: google.maps.LatLng): number {
        return google.maps.geometry.spherical.computeDistanceBetween(firstLocation, secondLocation);
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

    public createPolyline(path: google.maps.LatLng[], geodesic: boolean, strokeColor: string, strokeOpacity: number, strokeWeight: number): google.maps.Polyline {
        return new google.maps.Polyline({
            path,
            geodesic,
            strokeColor,
            strokeOpacity,
            strokeWeight
        });
    }

    public getDirectionsService(): google.maps.DirectionsService {
        return new google.maps.DirectionsService();
    }
    public getMapRenderer(): google.maps.DirectionsRenderer {
        return new google.maps.DirectionsRenderer();
    }
}
