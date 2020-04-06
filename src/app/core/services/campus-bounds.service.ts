import { Injectable } from '@angular/core';
import ConcordiaCampuses from '../data/concordia-campuses.json';
import { Coordinates } from '../models';
import { GoogleApisService } from './google-apis.service';


@Injectable({
    providedIn: 'root'
})
export class CampusBoundsService  {

    loyolaCoordinates: google.maps.LatLng;
    sgwCoordinates: google.maps.LatLng;

    constructor(private googleApis: GoogleApisService) { }


    isWithinBoundsOfLoyola(location: Coordinates): boolean {
        if (!this.loyolaCoordinates) {
            this.setCampusCoordinates();
        }

        const locationLatLng = this.googleApis.createLatLng(location.getLatitude(), location.getLongitude());
        const distance = google.maps.geometry.spherical.computeDistanceBetween(this.loyolaCoordinates, locationLatLng);
        return (2000 - distance) >= 0;
    }

    isWithinBoundsOfSGW(location: Coordinates): boolean {
        if (!this.sgwCoordinates) {
            this.setCampusCoordinates();
        }

        const locationLatLng = this.googleApis.createLatLng(location.getLatitude(), location.getLongitude());
        const distance = google.maps.geometry.spherical.computeDistanceBetween(this.sgwCoordinates, locationLatLng);
        return (2000 - distance) >= 0;
    }

    setCampusCoordinates() {
        for (let campus of ConcordiaCampuses) {            
            if (campus.code === 'Loyola') {
                this.loyolaCoordinates = this.googleApis.createLatLng(campus.coordinates.lat, campus.coordinates.lng);
            }
            if (campus.code === 'SGW') {
                this.sgwCoordinates = this.googleApis.createLatLng(campus.coordinates.lat, campus.coordinates.lng);
            }
        }
    }
}
