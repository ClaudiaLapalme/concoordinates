import { async, TestBed } from '@angular/core/testing';
import { CoreModule } from '../core.module';
import { Coordinates } from './coordinates';
import { Route } from './route';
import { RouteStep } from './route-step';
import { TransportMode } from './transport-mode';

describe('Route', () => {

    function testFunctionSetup() {
        const routeStep1 = new RouteStep(
            1,
            new Coordinates(1, 2, 0),
            new Coordinates(1, 2, 0),
            null,
            1,
            'instruction one',
            null
        );
        const routeStep2 = new RouteStep(
            1,
            new Coordinates(1, 2, 0),
            new Coordinates(1, 2, 0),
            null,
            1,
            'instruction two',
            null
        );
        const routeStepsSpy = new Array<RouteStep>(routeStep1, routeStep2);
        const routeUnderTest = new Route(
            new Coordinates(1, 2, 0),
            new Coordinates(1, 2, 0),
            null,
            null,
            null,
            routeStepsSpy
        );
        routeUnderTest.setCurrentTravelMode(TransportMode.TRANSIT);
        return routeUnderTest;
    }
    const routeUnderTest = testFunctionSetup();
    it('should compute total duration', () => {
        expect(routeUnderTest.computeTotalDuration()).toBe(2);
    });

    it('should compute total distance', () => {
        expect(routeUnderTest.computeTotalDistance()).toBe(2);
    });

    it('should return all step instructions', () => {
        const expectedInstructions = ['instruction one', 'instruction two'];
        expect(routeUnderTest.getInstructions()).toEqual(expectedInstructions);
    });

    it('Should convert Route to DirectionsRequest object', () => {
        const travelMode: any = 'TRANSIT';
        const createdDirReq: google.maps.DirectionsRequest = {
            origin: new google.maps.LatLng(1, 2),
            destination: new google.maps.LatLng(1, 2),
            travelMode: travelMode,
            transitOptions: {
                departureTime: null,
                arrivalTime: null
            },
            provideRouteAlternatives: true
        };
        expect(routeUnderTest.getDirectionsRequestFromRoute()).toEqual(createdDirReq);
    });
});
