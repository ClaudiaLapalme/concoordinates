import { Injectable } from '@angular/core';
import {
    Coordinates,
    OutdoorRoute,
    RouteStep,
    Transport,
    TransportMode,
} from '../models';
import { GoogleApisService } from '../services/google-apis.service';

@Injectable({
    providedIn: 'root'
})
export class RoutesService {
    constructor(private googleApis: GoogleApisService) {}

    /*
    This function is responsible for calling the actual google api
    through our interface to query the google services for routing instructions
    */
    async getMappedRoutes(
        dirRequest: google.maps.DirectionsRequest
    ): Promise<any> {
        try {
            const res = await this.googleApis.getGoogleMapRoutes(dirRequest);
            return this.mapGoogleRoutesToRoutes(res.routes);
        } catch (error) {
            console.log(error);
        }
    }

    /*
    A conversion function responsible for mapping google routes to our OutdoorRoutes model
    Reference to google routes object structure:
    https://developers.google.com/maps/documentation/directions/intro#DirectionsResponses
    */
    mapGoogleRoutesToRoutes(
        googleRoutes: google.maps.DirectionsRoute[]
    ): OutdoorRoute[] {
        const routes: OutdoorRoute[] = [];
        googleRoutes.forEach(gRoute => {
            const routeLeg = gRoute.legs[0];

            const route = new OutdoorRoute(
                new Coordinates(
                    routeLeg.start_location.lat(),
                    gRoute.legs[0].start_location.lng(),
                    null
                ),
                new Coordinates(
                    routeLeg.end_location.lat(),
                    gRoute.legs[0].end_location.lng(),
                    null
                ),
                routeLeg.departure_time && routeLeg.departure_time.value
                    ? routeLeg.departure_time.value
                    : null,
                routeLeg.arrival_time && routeLeg.arrival_time.value
                    ? routeLeg.arrival_time.value
                    : null,
                null,
                this.mapGoogleStepsToRouteSteps(routeLeg.steps)
            );

            routes.push(route);
        });
        return routes;
    }

    /*
    A conversion function responsible for mapping google LatLng coordinates into our Coordinates model
    */
    getPathFromLatLngList(latLngList: google.maps.LatLng[]): Coordinates[] {
        const coordinatesList: Coordinates[] = [];
        latLngList.forEach(latlng => {
            const coordinate = new Coordinates(
                latlng.lat(),
                latlng.lng(),
                null
            );
            coordinatesList.push(coordinate);
        });
        return coordinatesList;
    }

    /*
    A conversion function to convert underlying leg steps of the google object into our routeSteps objects
    */
    mapGoogleStepsToRouteSteps(
        steps: google.maps.DirectionsStep[]
    ): RouteStep[] {
        const rSteps: RouteStep[] = [];
        steps.forEach(element => {
            const rStep = new RouteStep(
                element.distance.value,
                new Coordinates(
                    element.start_location.lat(),
                    element.start_location.lng(),
                    null
                ),
                new Coordinates(
                    element.end_location.lat(),
                    element.end_location.lng(),
                    null
                ),
                this.getPathFromLatLngList(element.path),
                Math.ceil(element.duration.value / 60),
                element.instructions,
                new Transport(
                    null,
                    null,
                    TransportMode[element.travel_mode.toString()],
                    element.transit
                )
            );

            rSteps.push(rStep);
        });
        return rSteps;
    }
}
