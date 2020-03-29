import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { IndoorFunctionsService } from 'src/app/shared/indoor-functions.service';
import { Coordinates } from '..';
import { IndoorRoute } from '../models';
import { TransportMode } from '../models/transport-mode';
import { RoutesService } from '../services/routes.service';

@Injectable()
export class RouteFactory {
    constructor(private routesService: RoutesService, private indoorFunctionsService: IndoorFunctionsService) { }

    async getRoutes(
        startCoordinates: Coordinates | string,
        endCoordinates: Coordinates | string,
        startTime?: Date,
        endTime?: Date,
        transportMode?: TransportMode,
        disability?: boolean
    ): Promise<any> {
        if (
            typeof startCoordinates === 'string' &&
            typeof endCoordinates === 'string' &&
            this.indoorFunctionsService.bothCoordinatesMatchIndoorParams(startCoordinates, endCoordinates)) {
            return this.generateIndoorRoutes(startCoordinates, endCoordinates, disability);
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
