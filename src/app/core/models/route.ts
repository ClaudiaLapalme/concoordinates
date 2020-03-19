import { Coordinates } from './coordinates';
import { RouteStep } from './route-step';
export interface Route {
    startCoordinates: Coordinates;
    endCoordinates: Coordinates;
    startTime: Date;
    endTime: Date;
    routeSteps: Array<RouteStep> | Array<string>;

    computeTotalDuration(): number;
    computeTotalDistance(): number;
}
