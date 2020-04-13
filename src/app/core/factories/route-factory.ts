import { Injectable } from '@angular/core';
import { IndoorFunctionsService } from 'src/app/shared/indoor-functions.service';
import { Coordinates, IndoorRoute, Route, TransportMode } from '../models';
import { RoutesService } from '../services/routes.service';
import { ShuttleService } from '../services/shuttle.service';


@Injectable()
export class RouteFactory {
    constructor(private routesService: RoutesService, private indoorFunctionsService: IndoorFunctionsService, private shuttleService: ShuttleService) { }

    async getRoutes(
        startCoordinates: google.maps.places.PlaceResult,
        endCoordinates: google.maps.places.PlaceResult,
        startTime?: Date,
        endTime?: Date,
        transportMode?: TransportMode,
        disability?: boolean
    ): Promise<Route[]> {
        if (this.indoorFunctionsService.bothCoordinatesMatchIndoorParams(startCoordinates.formatted_address, endCoordinates.formatted_address)
        ) {
            return this.generateIndoorRoutes(startCoordinates.formatted_address, endCoordinates.formatted_address, disability);
        }

        return this.generateOutdoorRoutes(startCoordinates, endCoordinates, startTime, endTime, transportMode);
    }

    private generateIndoorRoutes(
        startLocation: string,
        endLocation: string,
        disability: boolean
    ): IndoorRoute[] {
        return this.routesService.getIndoorRoutes(startLocation, endLocation, disability);
    }

    private async generateOutdoorRoutes(
        startCoordinates: google.maps.places.PlaceResult,
        endCoordinates: google.maps.places.PlaceResult,
        startTime?: Date,
        endTime?: Date,
        transportMode?: TransportMode
    ): Promise<Route[]> {
        const convertedTransportMode: any = transportMode ? transportMode : 'TRAVEL';
        const dirRequest: google.maps.DirectionsRequest = {
            origin: startCoordinates.formatted_address,
            destination: endCoordinates.formatted_address,
            travelMode: convertedTransportMode,
            transitOptions: { departureTime: startTime, arrivalTime: endTime },
            provideRouteAlternatives: true
        };
        let routes = await this.routesService.getMappedRoutes(dirRequest);

        // only generate a shuttle route if a route is of mode TRANSIT
        if (transportMode === 'TRANSIT') {
            const startLocationCoord = new Coordinates(startCoordinates.geometry.location.lat(), startCoordinates.geometry.location.lng(), null);
            const endLocationCoord = new Coordinates(endCoordinates.geometry.location.lat(), endCoordinates.geometry.location.lng(), null);
            // returns the same route list if the route is not eligible to have a shuttle route option
            routes = this.shuttleService.generateShuttleRoute(startLocationCoord, endLocationCoord, routes);
        }

        return routes;
    }
}
