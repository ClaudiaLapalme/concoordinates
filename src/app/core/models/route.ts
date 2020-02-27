import { Transport } from "./travel-mode"
import { RouteStep } from "./route-step"
import { Injectable } from '@angular/core';
import { Coordinates } from './coordinates';



@Injectable()
export class Route { 

    constructor(startCoordinates: Coordinates, endCoordinates: Coordinates, 
        startTime: Date, endTime: Date, 
        allowedTravelModes: Array<Transport>, routeSteps: Array<RouteStep>) {
        this.startCoordinates = startCoordinates;
        this.endCoordinates = endCoordinates;
        this.startTime = startTime;
        this.endTime = endTime;
        this.allowedTravelModes = allowedTravelModes;
        this.routeSteps = routeSteps;
    } 

    startCoordinates: Coordinates
    endCoordinates: Coordinates
    startTime: Date
    endTime: Date
    allowedTravelModes: Array<Transport>
    routeSteps: Array<RouteStep>

    computeTotalDuration():number{
        let totalDuration = 0;
        this.routeSteps.forEach(e => totalDuration+=e.getDuration());
        return totalDuration;
    }

    computeTotalDistance():number{
        let totalDistance = 0;
        this.routeSteps.forEach(e => totalDistance+=e.getDistance());
        return totalDistance;
    }

    getInstructions():string[]{
        return this.routeSteps.map(e => e.instruction);
    }


}