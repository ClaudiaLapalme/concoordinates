import { TravelMode } from "./travel-mode.module"
import { RouteStep } from "./route-step.model"
import { Injectable } from '@angular/core';
import { EEXIST } from 'constants';



@Injectable()
export class Route { 

    constructor(startCoordinates: Coordinates, endCoordinates: Coordinates, 
        startTime: Date, endTime: Date, 
        allowedTravelModes: Array<TravelMode>, routeSteps: Array<RouteStep>) {
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
    allowedTravelModes: Array<TravelMode>
    routeSteps: Array<RouteStep>

    // getInstructions(){
    //     return this.routeSteps.map(e => e.instruction);
    // }
    
    // computeTotalTime(): number{
    //     return this.endTime.getMilliseconds()-this.startTime.getMilliseconds();
    // }

}