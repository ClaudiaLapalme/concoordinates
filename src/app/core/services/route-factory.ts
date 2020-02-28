import { Time } from "@angular/common";
import { Injectable } from "@angular/core";
import { DirectionsRequest } from "@google/maps";
import { throwError } from "rxjs";
import { Route } from "../models/route";
import { RoutesService } from "./routes.service";
import { Coordinates } from "..";
import { TransportMode } from '../models/transport-mode';

@Injectable()
export class RouteFactory {
  constructor(private routesService: RoutesService) {}

  generateAccesibleRoutes = (
    startCoordinates: Coordinates,
    endCoordinates: Coordinates,
    startTime: Time,
    endTime: Time
  ) => {
    return null;
  };

  async generateDefaultRoutes(
    startCoordinates: Coordinates | string,
    endCoordinates: Coordinates | string,
    startTime?: Date,
    endTime?: Date,
    travelMode?: any
  ): Promise<any> {
    if (travelMode !== undefined) {
      if (!(travelMode in google.maps.TravelMode)) {
        throw Error("Invalid Transitmode type used");
      }
    }  
    const dirRequest: google.maps.DirectionsRequest = {
      origin: startCoordinates.toString(),
      destination: 
        endCoordinates.toString()
      ,
      travelMode,
      transitOptions: { departureTime: startTime, arrivalTime: endTime },
      provideRouteAlternatives: true
    };
    return await this.routesService.getMappedRoutes(dirRequest);
  }
}
