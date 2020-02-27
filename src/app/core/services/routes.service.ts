import { Injectable } from '@angular/core';
import { Route } from '../models/route';
import { Coordinates } from '../models';
import { RouteStep } from '../models/route-step';
import { Transport } from '../models/travel-mode';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  googleDirectionsService = new google.maps.DirectionsService();


  getRoutes(dirRequest: google.maps.DirectionsRequest):void {
    this.googleDirectionsService.route(
      {
          origin: 'concordia university',
          destination: 'loyola campus',
          travelMode: google.maps.TravelMode.TRANSIT,
          provideRouteAlternatives: true
      },
      (res, status) => {
          console.log(res);
          let mappedRoutes = this.mapGoogleStepsToRouteSteps(res.routes[0].legs[0].steps);
          console.log(mappedRoutes);
          return mappedRoutes;
      }
  );

  }

mapGoogleRoutesToRoutes(googleRoutes: google.maps.DirectionsRoute[]): Route[]{
    let routes = new Array<Route>();
    googleRoutes.forEach(gRoute => {
        let routeLeg = gRoute.legs[0];
        let route = new Route(
            new Coordinates(routeLeg.start_location.lat(),gRoute.legs[0].start_location.lng()),
            new Coordinates(routeLeg.end_location.lat(),gRoute.legs[0].end_location.lng()),
            routeLeg.departure_time.value,
            routeLeg.arrival_time.value,
            null,
            this.mapGoogleStepsToRouteSteps(routeLeg.steps)
        )
    });
    return routes;
}

getPathFromLatLngList(latLngList: google.maps.LatLng[]): Coordinates[]{
    let coordinatesList = new Array<Coordinates>();
    latLngList.forEach((latlng) => {
        let coordinate = new Coordinates(latlng.lat(),latlng.lng());
        coordinatesList.push(coordinate);
    })
    return coordinatesList;
}

mapGoogleStepsToRouteSteps(steps: google.maps.DirectionsStep[]): RouteStep[]{
    let rSteps = new Array<RouteStep>();
    steps.forEach(element => {
        let rStep = new RouteStep(
            element.distance.value,
            new Coordinates(element.start_location.lat(),element.start_location.lng()),
            new Coordinates(element.end_location.lat(),element.end_location.lng()),
            this.getPathFromLatLngList(element.path),
            element.duration.value,
            element.instructions,
            new Transport(null,null,null)
        )
        rSteps.push(rStep);
    });
    return rSteps;
}


  constructor() { }
}
