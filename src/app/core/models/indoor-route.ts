import indoorPoiToCoordinates from '../data/indoor-poi-to-coordinates.json';
import indoorWalkingPathCoordinates from '../data/indoor-walking-path-coordinates.json';
import { Coordinates } from './coordinates';
import { IndoorCoordinates } from './indoor-coordinates';
import { Route } from './route';
import { RouteStep } from './route-step';
import { TransportMode } from './transport-mode';

export class IndoorRoute implements Route {

    private indoorPoiToCoords: IndoorCoordinates =
        Object.assign({}, indoorPoiToCoordinates, indoorWalkingPathCoordinates);

    constructor(startLocation: string, endLocation: string, disability: boolean, routeSteps: RouteStep[], distance: number) {
        /// TODO move this to a function
        this.startCoordinates = new Coordinates(
            +this.indoorPoiToCoords[startLocation].lat,
            +this.indoorPoiToCoords[startLocation].lng,
            +this.indoorPoiToCoords[startLocation].fN
        );
        this.endCoordinates = new Coordinates(
            +this.indoorPoiToCoords[endLocation].lat,
            +this.indoorPoiToCoords[endLocation].lng,
            +this.indoorPoiToCoords[endLocation].fN
        );
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
