import { Coordinates } from './coordinates';
import { Route } from './route';
import { RouteStep } from './route-step';
import { TransportMode } from './transport-mode';

export class OutdoorRoute implements Route {
    constructor(
        startCoordinates: Coordinates,
        endCoordinates: Coordinates,
        startTime: Date,
        endTime: Date,
        allowedTransportModes: Array<TransportMode>,
        routeSteps: RouteStep[]
    ) {
        this.startCoordinates = startCoordinates;
        this.endCoordinates = endCoordinates;
        this.startTime = startTime;
        this.endTime = endTime;
        this.allowedTransportModes = allowedTransportModes;
        this.routeSteps = routeSteps;
        this.disability = true;
    }

    startCoordinates: Coordinates;
    endCoordinates: Coordinates;
    startTime: Date;
    endTime: Date;
    allowedTransportModes: Array<TransportMode>;
    transportMode: TransportMode;
    routeSteps: RouteStep[];
    disability: boolean;

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
