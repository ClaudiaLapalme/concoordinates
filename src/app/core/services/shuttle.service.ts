import { Injectable } from '@angular/core';
import ShuttleRoute from '../data/shuttle-route.json';
import { Coordinates, OutdoorRoute, Route, RouteStep, Transport, TransportMode  } from '../models';
import { CampusBoundsService } from './campus-bounds.service';
import { GoogleApisService } from './google-apis.service';
import { IconService } from './icon.service';

@Injectable({
    providedIn: 'root'
})
export class ShuttleService {

    constructor(
        private campusBoundsService: CampusBoundsService, 
        private googleApisService: GoogleApisService,
        private iconService: IconService
    ) { }

    /**
     * Campus that is the start location of the route
     *
     */
    startCampus: string;

     /**
      * Determines if a route is eligible for to use the shuttle by using its start and end locations
      *
      */
     isEligibleForShuttle(fromLocation: Coordinates, toLocation: Coordinates): boolean {
        if (this.campusBoundsService.isWithinBoundsOfLoyola(fromLocation) || this.campusBoundsService.isWithinBoundsOfSGW(fromLocation)) {
            if (this.campusBoundsService.isWithinBoundsOfLoyola(fromLocation)) {
                if (this.campusBoundsService.isWithinBoundsOfSGW(toLocation)) {
                    this.startCampus = 'LOY';
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

    /**
     * Generates a shuttle route
     *
     */
    generateShuttleRoute(
        startCoord: Coordinates,
        endCoord: Coordinates,
        routes: Route[]): Route[] {

        const isEligible = this.isEligibleForShuttle(startCoord, endCoord);

        if (isEligible) {
            const shuttlePath = this.generateShuttlePath();
            const routeSteps = [
                new RouteStep (
                    0,
                    startCoord,
                    endCoord,
                    shuttlePath,
                    30,
                    'Take the shuttle',
                    new Transport(0, 0, TransportMode.SHUTTLE, null))
                ];
            routes[routes.length - 1] = new OutdoorRoute(startCoord, endCoord, null, null, null, routeSteps);
        }
        return routes;
    }

    /**
     * Generates a shuttle path depending on which campus is the start location
     *
     */
    generateShuttlePath(): Coordinates[] {
        let path = [];
        ShuttleRoute[this.startCampus].forEach(node => {
            path.push(new Coordinates(parseFloat(node.lat), parseFloat(node.lng), null));
        });
        return path;
    }


    /**
     * Renders the shuttle route on the map
     *
     */
    displayShuttleRoute(map: google.maps.Map, route: OutdoorRoute): void {
            let path: google.maps.LatLng[] = [];

            route.routeSteps.forEach(step => {
                let pathCoord: google.maps.LatLng[] = [];

                step.path.forEach(coord => {
                    pathCoord.push(this.googleApisService.createLatLng(coord.getLatitude(), coord.getLongitude()));
                });

                path = path.concat(pathCoord);
            });

            const shuttlePath = this.googleApisService.createPolyline(path, true, '#000000', 1.0, 2);
            shuttlePath.setMap(map);
            map.setZoom(13);
            map.setCenter(path[0]);
            this.googleApisService.createMarker(path[path.length - 1], map, this.iconService.getPlaceIcon());
    }

    /**
     * Determines if a route is a shuttle route
     *
     */
    isShuttleRoute(route: OutdoorRoute): boolean {
        let isShuttle = false;

        route.routeSteps.forEach(step => {
            if (step.transport.travelType === 'SHUTTLE') {
                isShuttle = true;
            }
        });
        return isShuttle;
    }
}
