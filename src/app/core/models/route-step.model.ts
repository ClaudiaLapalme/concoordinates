import { Transport } from './travel-mode.module';

export class RouteStep {

    constructor(distance: number, startCoordinate: Coordinates,endCoordinate: Coordinates,
        path: Array<Coordinates>, duration: number, instruction: string, travelMode: Transport){
        this.distance = distance;
        this.startCoordinate = startCoordinate;
        this.endCoordinate = endCoordinate;
        this.path = path;
        this.duration = duration;
        this.instruction = instruction;
        this.travelMode = travelMode;
    }
    distance: number;
    startCoordinate: Coordinates;
    endCoordinate: Coordinates;
    path: Array<Coordinates>;
    duration: number;
    instruction: string;
    travelMode: Transport;

    getDuration(): number{
        return this.duration
    }

    getDistance(): number{
        return this.distance
    }


}