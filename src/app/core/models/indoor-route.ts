import * as indoorPoiCoordinates from '../data/indoor-poi-to-coordinates.json';
import { Coordinates } from './coordinates';
import { Route } from './route';

export class IndoorRoute implements Route {

    constructor(startLocation: string, endLocation: string, disability: boolean, routeSteps: string[], distance: number) {
        this.startCoordinates = indoorPoiCoordinates[startLocation];
        this.endCoordinates = indoorPoiCoordinates[endLocation];
        this.routeSteps = routeSteps;
        this.distance = distance;
    }

    startCoordinates: Coordinates;
    endCoordinates: Coordinates;
    startTime: Date;
    endTime: Date;
    // In case of indoor, the steps constitute of the nodes in the adjacency matrix constituting the complete route
    routeSteps: string[];
    distance: number;

    computeTotalDuration(): number {
        return this.convertDistanceToDuration();
    }
    computeTotalDistance(): number {
        return this.distance;
    }

    private convertDistanceToDuration() {
        // TODO figure out what to return as duration. Date object? millis?
        return -1;
    }
}
