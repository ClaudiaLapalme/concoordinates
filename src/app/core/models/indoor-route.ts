import * as indoorPoiCoordinates from '../data/indoor-poi-to-coordinates.json';
import { Coordinates } from './coordinates';
import { Route } from './route';
import { RouteStep } from './route-step';
import { TransportMode } from './transport-mode';

export class IndoorRoute implements Route {

    constructor(startLocation: string, endLocation: string, disability: boolean, routeSteps: RouteStep[], distance: number) {
        // TODO fix this
        const moduleKey = 'default';
        const coords: {[coordName: string]: Coordinates} = indoorPoiCoordinates[moduleKey];
        this.startCoordinates = coords[startLocation];
        this.endCoordinates = coords[endLocation];
        this.routeSteps = routeSteps;
        this.distance = distance;
        this.disability = disability;
    }

    startCoordinates: Coordinates;
    endCoordinates: Coordinates;
    startTime: Date;
    endTime: Date;
    // In case of indoor, the steps constitute of the nodes in the adjacency matrix constituting the complete route
    routeSteps: RouteStep[];
    transportMode: TransportMode;

    distance: number;
    disability: boolean;

    computeTotalDuration(): number {
        let totalDuration = 0;
        this.routeSteps.forEach(e => (totalDuration += e.getDuration()));
        return totalDuration;
    }
    computeTotalDistance(): number {
        return this.distance;
    }
    getInstructions(): string[] {
        return this.routeSteps.map(e => e.instruction);
    }

    setCurrentTravelMode(transportMode: TransportMode): void {
        // no op
    }
}
