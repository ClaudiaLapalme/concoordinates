import { async, TestBed } from '@angular/core/testing';
import { CoreModule } from '../core.module';
import { Coordinates } from './coordinates';
import { Route } from './route';
import { RouteStep } from './route-step';
import { TransportMode } from './transport-mode';

describe('Route', () => {
    class MockDirectionService extends google.maps.DirectionsService {
        route(request, callback) {}
    }

    function testFunctionSetup() {
        let routeStep1 = new RouteStep(
            1,
            new Coordinates(1, 2),
            new Coordinates(1, 2),
            null,
            1,
            'instruction one',
            null
        );
        let routeStep2 = new RouteStep(
            1,
            new Coordinates(1, 2),
            new Coordinates(1, 2),
            null,
            1,
            'instruction two',
            null
        );
        let routeStepsSpy = new Array<RouteStep>(routeStep1, routeStep2);
        let routeUnderTest = new Route(
            new Coordinates(1, 2),
            new Coordinates(1, 2),
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
        let expectedInstructions = ['instruction one', 'instruction two'];
        expect(routeUnderTest.getInstructions()).toEqual(expectedInstructions);
    });

    it('should run display function', () => {
        const rendererSpy = new google.maps.DirectionsRenderer();
        const directionSpy = new MockDirectionService();
        const spyRender = spyOn(rendererSpy, 'setDirections');
        // const spyDirection = spyOn(directionSpy, 'route');
        routeUnderTest.display(rendererSpy);
        // expect(directionSpy.route).toHaveBeenCalled();
        expect(rendererSpy.setDirections).toHaveBeenCalled();
    });
});
