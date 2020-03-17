import { Coordinates } from './coordinates';
import { RouteStep } from './route-step';
import { TransportMode } from './transport-mode';

export class Route {
    constructor(
        startCoordinates: Coordinates,
        endCoordinates: Coordinates,
        startTime: Date,
        endTime: Date,
        allowedTransportModes: Array<TransportMode>,
        routeSteps: Array<RouteStep>
    ) {
        this.startCoordinates = startCoordinates;
        this.endCoordinates = endCoordinates;
        this.startTime = startTime;
        this.endTime = endTime;
        this.allowedTransportModes = allowedTransportModes;
        this.routeSteps = routeSteps;
    }

    startCoordinates: Coordinates;
    endCoordinates: Coordinates;
    startTime: Date;
    endTime: Date;
    allowedTransportModes: Array<TransportMode>;
    transportMode: TransportMode;
    routeSteps: Array<RouteStep>;

    computeTotalDuration(): number {
        let totalDuration = 0;
        this.routeSteps.forEach(e => (totalDuration += e.getDuration()));
        return totalDuration;
    }

    computeTotalDistance(): number {
        let totalDistance = 0;
        this.routeSteps.forEach(e => (totalDistance += e.getDistance()));
        return totalDistance;
    }

    getInstructions(): string[] {
        return this.routeSteps.map(e => e.instruction);
    }

    // set Travel Mode based on UI's selected state
    setCurrentTravelMode(transportMode: TransportMode): void {
        this.transportMode = transportMode;
    }

    getDirectionsRequestFromRoute(): google.maps.DirectionsRequest {
        const convertedTransportMode: any = this.transportMode
            ? this.transportMode
            : 'TRAVEL';
        const dirRequest: google.maps.DirectionsRequest = {
            origin: new google.maps.LatLng(
                this.startCoordinates.getLatitude(),
                this.startCoordinates.getLongitude()
            ),
            destination: new google.maps.LatLng(
                this.endCoordinates.getLatitude(),
                this.endCoordinates.getLongitude()
            ),
            travelMode: convertedTransportMode,
            transitOptions: {
                departureTime: this.startTime,
                arrivalTime: this.endTime
            },
            provideRouteAlternatives: true
        };
        return dirRequest;
    }
}
