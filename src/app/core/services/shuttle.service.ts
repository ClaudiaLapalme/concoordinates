import { Injectable } from '@angular/core';
import { Coordinates, Route, OutdoorRoute, RouteStep, TransportMode, Transport } from '../models';
import { CampusBoundsService } from './campus-bounds.service';
import { GoogleApisService } from './google-apis.service';
import ShuttleRoute from '../data/shuttle-route.json';

@Injectable({
    providedIn: 'root'
})
export class ShuttleService {

    constructor(private campusBoundsService: CampusBoundsService, private googleApisService: GoogleApisService) { }

    /**
     * Campus that is the start location of the route
     *
     * @type {string}
     * @memberof ShuttleService
     */
    startCampus: string;

    /**
     * 
     *
     * @type {google.maps.Icon}
     * @memberof ShuttleService
     */
    icon: google.maps.Icon = {
        url: '../../../assets/icon/place_marker.svg',
        scaledSize: new google.maps.Size(30, 30) // scaled size
    };

     /**
      * Determines if a route is eligible for to use the shuttle by using its start and end locations
      *
      * @param {Coordinates} fromLocation
      * @param {Coordinates} toLocation
      * @returns {boolean}
      * @memberof ShuttleService
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
     * @param {Coordinates} startCoord
     * @param {Coordinates} endCoord
     * @param {Route[]} routes
     * @returns {Route[]}
     * @memberof ShuttleService
     */
    generateShuttleRoute(
        startCoord: Coordinates,
        endCoord: Coordinates,
        routes: Route[]): Route[] {

        const isEligible = this.isEligibleForShuttle(startCoord, endCoord);

        if (isEligible) {
            const shuttlePath = this.generateShuttlePath();
            const routeSteps = [new RouteStep(0, startCoord, endCoord, shuttlePath, 30, 'Take the shuttle', new Transport(0, 0, TransportMode.SHUTTLE, null))];
            routes[routes.length - 1] = new OutdoorRoute(startCoord, endCoord, null, null, null, routeSteps);
        }
        return routes;
    }

    /**
     * Generates a shuttle path depending on which campus is the start location
     *
     * @returns {Coordinates[]}
     * @memberof ShuttleService
     */
    generateShuttlePath(): Coordinates[] {
        let path = [];
        ShuttleRoute[this.startCampus].forEach(node => {
            path.push(new Coordinates(parseFloat(node.lat), parseFloat(node.lng), null))
        });
        return path;
    }


    /**
     * Renders the shuttle route on the map
     *
     * @param {google.maps.Map} map
     * @param {OutdoorRoute} route
     * @returns {boolean}
     * @memberof ShuttleService
     */
    displayShuttleRoute(map: google.maps.Map, route: OutdoorRoute): boolean {
        if (this.isShuttleRoute(route)) {
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
            this.googleApisService.createMarker(path[path.length-1], map, this.icon);

            return true;
        }
        return false;
    }

    /**
     * Determines if a route is a shuttle route
     *
     * @param {OutdoorRoute} route
     * @returns {boolean}
     * @memberof ShuttleService
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
