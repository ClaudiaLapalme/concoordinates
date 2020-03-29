import { Coordinates } from './coordinates';
import { RouteStep } from './route-step';
import { TransportMode } from './transport-mode';
export interface Route {
    startCoordinates: Coordinates;
    endCoordinates: Coordinates;
    startTime: Date;
    endTime: Date;
    routeSteps: RouteStep[];
    transportMode: TransportMode;
    disability: boolean;

    computeTotalDuration(): number;
    computeTotalDistance(): number;

    setCurrentTravelMode(transportMode: TransportMode): void;
    getInstructions(): string[];
}
