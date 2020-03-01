import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { Coordinates } from '..';
import { TransportMode } from '../models/transport-mode';
import { RoutesService } from '../services/routes.service';

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
    }

    async generateDefaultRoutes(
        startCoordinates: Coordinates | string,
        endCoordinates: Coordinates | string,
        startTime?: Date,
        endTime?: Date,
        transportMode?: TransportMode
    ): Promise<any> {
        const convertedTransportMode: any = transportMode ? transportMode : 'TRAVEL';
        const dirRequest: google.maps.DirectionsRequest = {
            origin: startCoordinates.toString(),
            destination: endCoordinates.toString(),
            travelMode: convertedTransportMode,
            transitOptions: { departureTime: startTime, arrivalTime: endTime },
            provideRouteAlternatives: true
        };
        return await this.routesService.getMappedRoutes(dirRequest);
    }
}
