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
     */
    loyolaCoordinates: Coordinates;

    /**
     * Coordinates of the SGW campus
     *
     */
    sgwCoordinates: Coordinates;

    constructor(private googleApis: GoogleApisService) { }

    /**
     * Determines if a location is within 2 km of the loyola campus
     *
     */
    isWithinBoundsOfLoyola(location: Coordinates): boolean {
        if (!this.loyolaCoordinates) {
            this.setCampusCoordinates();
        }

        const distance = this.googleApis.computeDistance(this.loyolaCoordinates, location);
        return (2000 - distance) >= 0;
    }

    /**
     * Determines if a location is within a 2 km of the SGW campus
     *
     */
    isWithinBoundsOfSGW(location: Coordinates): boolean {
        if (!this.sgwCoordinates) {
            this.setCampusCoordinates();
        }

        const distance = this.googleApis.computeDistance(this.sgwCoordinates, location);
        return (2000 - distance) >= 0;
    }

    /**
     * Sets both campus coordinates
     *
     */
    setCampusCoordinates() {
        for (let campus of ConcordiaCampuses) {            
            if (campus.code === 'Loyola') {
                this.loyolaCoordinates = new Coordinates (campus.coordinates.lat, campus.coordinates.lng, null);
            }
            if (campus.code === 'SGW') {
                this.sgwCoordinates = new Coordinates (campus.coordinates.lat, campus.coordinates.lng, null);
            }
        }
    }
}
