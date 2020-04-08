import { Injectable } from '@angular/core';
import { Coordinates, Route, OutdoorRoute, RouteStep, TransportMode, Transport } from '../models';
import { CampusBoundsService } from './campus-bounds.service';

@Injectable({
    providedIn: 'root'
})
export class ShuttleService {

    constructor(private campusBoundsService: CampusBoundsService) { }

    startCampus: string;

    private isEligibleForShuttle(fromLocation: Coordinates, toLocation: Coordinates): boolean {
        if (this.campusBoundsService.isWithinBoundsOfLoyola(fromLocation) || this.campusBoundsService.isWithinBoundsOfSGW(fromLocation)) {
            if (this.campusBoundsService.isWithinBoundsOfLoyola(fromLocation)) {
                if (this.campusBoundsService.isWithinBoundsOfSGW(toLocation)) {
                    this.startCampus = 'Loyola';
                    return true;
                }
            } else if (this.campusBoundsService.isWithinBoundsOfSGW(fromLocation)) {

                if (this.campusBoundsService.isWithinBoundsOfLoyola(toLocation)) {
                    this.startCampus = 'SGW';

                    return true;
                }
            }
        }
        return false;
    }

    //TODO: Check start campus, import data from json and input the coordinates for the path in route step 

    generateShuttleRoute(
        startLocation: google.maps.places.PlaceResult, 
        endLocation: google.maps.places.PlaceResult,
        routes: Route[]): Route[] {
        const startCoord = new Coordinates(startLocation.geometry.location.lat(), startLocation.geometry.location.lng(), null);
        const endCoord = new Coordinates(endLocation.geometry.location.lat(), endLocation.geometry.location.lng(), null);
        const isEligible = this.isEligibleForShuttle(startCoord, endCoord);

        if (isEligible) {
            const routeSteps = [new RouteStep(0, startCoord, endCoord, [startCoord, endCoord], 30, 'Take the shuttle', new Transport(0, 0,TransportMode.SHUTTLE, null))];
            routes[routes.length-1] = new OutdoorRoute (startCoord, endCoord, null, null, null, routeSteps);
        }

        return routes;

    }
}
