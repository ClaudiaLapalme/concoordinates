import { Time } from "@angular/common";
import { Injectable } from "@angular/core";
import { DirectionsRequest } from "@google/maps";
import { Route } from "../models/route";
import { RoutesService } from "./routes.service";
import { Coordinates } from '../models';

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
    startCoordinates: Coordinates,
    endCoordinates: Coordinates,
    startTime?: Date,
    endTime?: Date,
    transitMode?: any
  ): Route[] {
    // if (transitMode !== undefined) {
    //   if (!transitMode[typeof google.maps.TransitMode]) {
    //     throw new Error("Invalid Transitmode type used");
    //   }
    // }
    const dirRequest: google.maps.DirectionsRequest = {
      origin: new google.maps.LatLng(startCoordinates.getLatitude(),startCoordinates.getLongitude()),
      destination: new google.maps.LatLng(endCoordinates.getLatitude(),endCoordinates.getLongitude()),
      travelMode: google.maps.TravelMode.TRANSIT,
      transitOptions: { departureTime: startTime, arrivalTime: endTime },
      provideRouteAlternatives: true
    };
    return this.routesService.getRoutes(dirRequest);
  }
}
