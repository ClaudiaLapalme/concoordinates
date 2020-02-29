import { jasmine } from 'jasmine-core';
import { Coordinates, Route, RouteStep , Transport , TransportMode} from '../core/models';
export class MockData {
    startCoordinates = 'Loyola';
    endCoordinates = 'Ohio';
    startTimeAsDate: Date = new Date(1000);
    endTimeAsDate: Date = new Date(1000);
    testGoogleTransportModeMockDriving: any = jasmine.createSpyObj('transportMode',
      { toString : 'DRIVING' });
    testGoogleTravelModeMockDriving: any = jasmine.createSpyObj('transportMode',
      { toString : 'DRIVING' });
    testTransportModeDriving = TransportMode.DRIVING;

    testLatNum = 6;
    testLngNum = 7;
    testFloorNum: number = null;
    testCoordinate: Coordinates = new Coordinates(this.testLatNum, this.testLngNum, this.testFloorNum);
    testGoogleLatLng = jasmine.createSpyObj('testGoogleLatLng', { lat: this.testLatNum, lng: this.testLngNum});
    testInstructions = 'turn left';
    testGoogleDistance: google.maps.Distance = {text: 'text', value: 15};
    testGoogleDuration: google.maps.Duration = {text: 'text', value: 20};

    getTestDirectionsRequest() {
        const dirRequest: google.maps.DirectionsRequest = {
            origin: this.startCoordinates.toString(),
            destination: this.endCoordinates.toString(),
            travelMode: this.testGoogleTravelModeMockDriving.toString(),
            transitOptions: { departureTime: this.startTimeAsDate, arrivalTime: this.endTimeAsDate },
            provideRouteAlternatives: true
          };
        return dirRequest;
    }

    getTestDirectionsRoute() {
        const dirRoute: google.maps.DirectionsRoute = {
            bounds: null,
            copyrights: null,
            fare: null,
            overview_path: null,
            overview_polyline: null,
            warnings: null,
            waypoint_order: null,
            legs: [{
                start_location: this.testGoogleLatLng,
                end_location: this.testGoogleLatLng,
                departure_time: {text: '', time_zone: 'GMT', value: this.startTimeAsDate},
                steps: this.getTestDirectionsSteps(),
                arrival_time: {text: '', time_zone: 'GMT', value: this.endTimeAsDate},
                distance: this.testGoogleDistance,
                duration: this.testGoogleDuration,
                duration_in_traffic: null,
                end_address: null,
                start_address: null,
                via_waypoints: null
              }]
        };
        return dirRoute;
    }

    getTestDirectionsRoutes() {
        return [this.getTestDirectionsRoute(), this.getTestDirectionsRoute()];
    }

    getTestDirectionsStep() {
        const mockStep: google.maps.DirectionsStep = {
            steps: [],
            distance: this.testGoogleDistance,
            duration: this.testGoogleDuration,
            end_location: this.testGoogleLatLng,
            instructions: this.testInstructions,
            path: this.getTestListOfGoogleLatLngs(),
            start_location: this.testGoogleLatLng,
            transit: null,
            travel_mode: this.testGoogleTravelModeMockDriving
          };
        return mockStep;
    }

    getTestDirectionsSteps() {
        return [this.getTestDirectionsStep(), this.getTestDirectionsStep()];
    }

    getTestRoute() {
        const testRoute = new Route(
            this.testCoordinate,
            this.testCoordinate,
            this.startTimeAsDate,
            this.endTimeAsDate,
            this.getTestAllowedTravelModes(),
            this.getTestRouteSteps()
          );
        return testRoute;
    }

    getTestListOfCoordinates() {
        return [this.testCoordinate, this.testCoordinate];
    }

    getTestListOfGoogleLatLngs() {
        return [this.testGoogleLatLng, this.testGoogleLatLng];
    }

    getTestAllowedTravelModes() {
        return null;
    }

    getTestRouteStep() {
        const testRoute = new RouteStep(
            this.testGoogleDistance.value,
            this.testCoordinate,
            this.testCoordinate,
            this.getTestListOfCoordinates(),
            Math.ceil(this.testGoogleDuration.value / 60),
            this.testInstructions,
            this.getTestTransport()
          );
        return testRoute;
    }

    getTestRouteSteps() {
        return [this.getTestRouteStep(), this.getTestRouteStep()];
    }

    getTestTransport() {
        const transport = new Transport(null, null, this.testTransportModeDriving, null);
        return transport;
    }
}
