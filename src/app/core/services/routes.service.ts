import { Injectable } from '@angular/core';
import {
    Coordinates,
    Route,
    RouteStep,
    Transport,
    TransportMode,
} from '../models';

@Injectable({
    providedIn: 'root'
})
export class RoutesService {
    constructor() { }

    getGoogleMapRoutes = (dirRequest: google.maps.DirectionsRequest): Promise<google.maps.DirectionsResult> => {
        return new Promise<google.maps.DirectionsResult>((resolve) => {
            new google.maps.DirectionsService().route(dirRequest, (res, status) => {
                if (status === 'OK') {
                    resolve(res);
                } else {
                    throw new Error('Error the status is: ' + status);
                }
            });
        });
    }

    getMappedRoutes(dirRequest: google.maps.DirectionsRequest): Promise<any> {
        return this.getGoogleMapRoutes(dirRequest)
            .then(res => {
                return this.mapGoogleRoutesToRoutes(res.routes);
            }).catch(error => { console.log(error); });
    }

    mapGoogleRoutesToRoutes(googleRoutes: google.maps.DirectionsRoute[]): Route[] {
        const routes: Route[] = [];
        googleRoutes.forEach(gRoute => {
            const routeLeg = gRoute.legs[0];

            const route = new Route(
                new Coordinates(routeLeg.start_location.lat(), gRoute.legs[0].start_location.lng(), null),
                new Coordinates(routeLeg.end_location.lat(), gRoute.legs[0].end_location.lng(), null),
                routeLeg.departure_time && routeLeg.departure_time.value ? routeLeg.departure_time.value : null,
                routeLeg.arrival_time && routeLeg.arrival_time.value ? routeLeg.arrival_time.value : null,
                null,
                this.mapGoogleStepsToRouteSteps(routeLeg.steps)
            );

            routes.push(route);
        });
        return routes;
    }

    getPathFromLatLngList(latLngList: google.maps.LatLng[]): Coordinates[] {
        const coordinatesList: Coordinates[] = [];
        latLngList.forEach(latlng => {

            const coordinate = new Coordinates(latlng.lat(), latlng.lng(), null);
            coordinatesList.push(coordinate);

        });
        return coordinatesList;
    }

    mapGoogleStepsToRouteSteps(steps: google.maps.DirectionsStep[]): RouteStep[] {
        const rSteps: RouteStep[] = [];
        steps.forEach(element => {

            const rStep = new RouteStep(
                element.distance.value,
                new Coordinates(element.start_location.lat(), element.start_location.lng(), null),
                new Coordinates(element.end_location.lat(), element.end_location.lng(), null),
                this.getPathFromLatLngList(element.path),
                Math.ceil(element.duration.value / 60),
                element.instructions,
                new Transport(null, null, TransportMode[element.travel_mode.toString()], element.transit)
            );

            rSteps.push(rStep);
        });
        return rSteps;
    }
}
