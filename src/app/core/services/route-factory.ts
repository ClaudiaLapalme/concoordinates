import { Time } from "@angular/common";
import { Injectable } from "@angular/core";
import { DirectionsRequest } from "@google/maps";
import { start } from "repl";
import { throwError } from "rxjs";
import { Route } from "../models/route";
import { RoutesService } from "./routes.service";

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

  generateDefaultRoutes(
    startCoordinates: number,
    endCoordinates: number,
    startTime?: Date,
    endTime?: Date,
    transitMode?: any
  ): Route[] {
    if (transitMode !== undefined) {
      if (!transitMode[typeof google.maps.TransitMode]) {
        throw new Error("Invalid Transitmode type used");
      }
    }
    const dirRequest: google.maps.DirectionsRequest = {
      destination: new google.maps.LatLng(startCoordinates, endCoordinates),
      travelMode: transitMode,
      transitOptions: { departureTime: startTime, arrivalTime: endTime },
      provideRouteAlternatives: true
    };
    return this.routesService.getRoutes(dirRequest);
  }
}
