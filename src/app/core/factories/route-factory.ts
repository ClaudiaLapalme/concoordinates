import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { RoutesService } from '../services/routes.service';
import { Coordinates } from '..';
import { TransportMode } from '../models/transport-mode';

@Injectable()
export class RouteFactory {
    constructor(private routesService: RoutesService) {}

    generateAccesibleRoutes = (
        startCoordinates: Coordinates,
        endCoordinates: Coordinates,
        startTime: Time,
        endTime: Time
    ) => {
        return null;
    };

    async generateDefaultRoutes(
        startCoordinates: Coordinates | string,
        endCoordinates: Coordinates | string,
        startTime?: Date,
        endTime?: Date,
        transportMode?: any
    ): Promise<any> {
        if (transportMode !== undefined) {
            if (!(transportMode in TransportMode)) {
                throw Error('Invalid TransportMode type used');
            }
        }
        const dirRequest: google.maps.DirectionsRequest = {
            origin: startCoordinates.toString(),
            destination: endCoordinates.toString(),
            travelMode: transportMode,
            transitOptions: { departureTime: startTime, arrivalTime: endTime },
            provideRouteAlternatives: true
        };
        return await this.routesService.getMappedRoutes(dirRequest);
    }
}
