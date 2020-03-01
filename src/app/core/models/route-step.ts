import { Coordinates } from './coordinates';
import { Transport } from './transport-mode';

export class RouteStep {

    constructor(
        distance: number,
        startCoordinate: Coordinates,
        endCoordinate: Coordinates,
        path: Coordinates[],
        duration: number,
        instruction: string,
        transport: Transport) {
        this.distance = distance;
        this.startCoordinate = startCoordinate;
        this.endCoordinate = endCoordinate;
        this.path = path;
        this.duration = duration;
        this.instruction = instruction;
        this.transport = transport;
    }
    distance: number;
    startCoordinate: Coordinates;
    endCoordinate: Coordinates;
    path: Coordinates[];
    duration: number;
    instruction: string;
    transport: Transport;

    getDuration(): number {
        return this.duration;
    }

    getDistance(): number {
        return this.distance;
    }
}
