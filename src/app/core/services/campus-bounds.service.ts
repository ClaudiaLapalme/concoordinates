import { Injectable } from '@angular/core';
import ConcordiaCampuses from '../data/concordia-campuses.json';
import { Coordinates } from '../models';
import { GoogleApisService } from './google-apis.service';


@Injectable({
    providedIn: 'root'
})
export class CampusBoundsService  {

    /**
     * Coordinates of the loyola campus
     *
     * @type {google.maps.LatLng}
     * @memberof CampusBoundsService
     */
    loyolaCoordinates: google.maps.LatLng;

    /**
     * Coordinates of the SGW campus
     *
     * @type {google.maps.LatLng}
     * @memberof CampusBoundsService
     */
    sgwCoordinates: google.maps.LatLng;

    constructor(private googleApis: GoogleApisService) { }

    /**
     * Determines if a location is within 2 km of the loyola campus
     *
     * @param {Coordinates} location
     * @returns {boolean}
     * @memberof CampusBoundsService
     */
    isWithinBoundsOfLoyola(location: Coordinates): boolean {
        if (!this.loyolaCoordinates) {
            this.setCampusCoordinates();
        }

        const locationLatLng = this.googleApis.createLatLng(location.getLatitude(), location.getLongitude());
        const distance = this.googleApis.computeDistance(this.loyolaCoordinates, locationLatLng);
        return (2000 - distance) >= 0;
    }

    /**
     * Determines if a location is within a 2 km of the SGW campus
     *
     * @param {Coordinates} location
     * @returns {boolean}
     * @memberof CampusBoundsService
     */
    isWithinBoundsOfSGW(location: Coordinates): boolean {
        if (!this.sgwCoordinates) {
            this.setCampusCoordinates();
        }

        const locationLatLng = this.googleApis.createLatLng(location.getLatitude(), location.getLongitude());
        const distance = this.googleApis.computeDistance(this.sgwCoordinates, locationLatLng);
        return (2000 - distance) >= 0;
    }

    /**
     * Sets both campus coordinates
     *
     * @memberof CampusBoundsService
     */
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
