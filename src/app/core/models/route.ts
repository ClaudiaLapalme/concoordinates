import { Coordinates } from './coordinates';
import { RouteStep } from './route-step';

export class Route {

    constructor(
        startCoordinates: Coordinates,
        endCoordinates: Coordinates,
        startTime: Date,
        endTime: Date,
        allowedTravelModes: Array<Transport>,
        routeSteps: Array<RouteStep>) {
        this.startCoordinates = startCoordinates;
        this.endCoordinates = endCoordinates;
        this.startTime = startTime;
        this.endTime = endTime;
        this.allowedTravelModes = allowedTravelModes;
        this.routeSteps = routeSteps;
    }

    startCoordinates: Coordinates;
    endCoordinates: Coordinates;
    startTime: Date;
    endTime: Date;
    allowedTravelModes: Array<Transport>;
    routeSteps: Array<RouteStep>;

    computeTotalDuration(): number {
        let totalDuration = 0;
        this.routeSteps.forEach(e => totalDuration += e.getDuration());
        return totalDuration;
    }

    computeTotalDistance(): number {
        let totalDistance = 0;
        this.routeSteps.forEach(e => totalDistance += e.getDistance());
        return totalDistance;
    }

    getInstructions(): string[] {
        return this.routeSteps.map(e => e.instruction);
    }

    // map is given an `any` option to accomodate indoor routing instructions
    display(map: google.maps.Map | any): void {
        const renderer = new google.maps.DirectionsRenderer();
        renderer.setMap(map);

        new google.maps.DirectionsService().route(this.getDirectionsRequestFromRoute(this), (res, status) => {
            if (status === 'OK') {
                console.log(res);
                renderer.setDirections(res);
            } else {
                console.log('Directions request failed due to ' + status);
            }
        });
    }

    getDirectionsRequestFromRoute(route: Route): google.maps.DirectionsRequest {
        const dirRequest: google.maps.DirectionsRequest = {
            origin: new google.maps.LatLng(route.startCoordinates.getLatitude(), route.startCoordinates.getLongitude()),
            destination: new google.maps.LatLng(route.endCoordinates.getLatitude(), route.endCoordinates.getLongitude()),
            // TODO: Fix travel modes across the project
            travelMode: google.maps.TravelMode.TRANSIT,
            transitOptions: { departureTime: route.startTime, arrivalTime: route.endTime },
            provideRouteAlternatives: true
        };
        return dirRequest;
    }


}