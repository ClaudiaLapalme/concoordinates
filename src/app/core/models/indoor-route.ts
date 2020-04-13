import { IndoorFunctionsService } from 'src/app/shared/indoor-functions.service';
import indoorPoiToCoordinates from '../data/indoor-poi-to-coordinates.json';
import indoorWalkingPathCoordinates from '../data/indoor-walking-path-coordinates.json';
import { Coordinates } from './coordinates';
import { IndoorCoordinates } from './indoor-coordinates';
import { Route } from './route';
import { RouteStep } from './route-step';
import { TransportMode } from './transport-mode';

export class IndoorRoute implements Route {
    private indoorFunctionsService: IndoorFunctionsService = new IndoorFunctionsService();
    private indoorPoiToCoords: IndoorCoordinates =
        Object.assign({}, indoorPoiToCoordinates, indoorWalkingPathCoordinates);

    constructor(startLocation: string, endLocation: string, disability: boolean, routeSteps: RouteStep[], distance: number) {
        this.startCoordinates = this.indoorFunctionsService.getIndoorCoordinate(startLocation);
        this.endCoordinates = this.indoorFunctionsService.getIndoorCoordinate(endLocation);
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
