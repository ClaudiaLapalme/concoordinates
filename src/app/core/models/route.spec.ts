import { async, TestBed } from '@angular/core/testing';
import { RouteStep } from './route-step';
import { Route } from './route';

describe('Route', () => {

    function testFunctionSetup() {
        let routeStep1 = new RouteStep(1,null,null,null,1,"instruction one",null);
        let routeStep2 = new RouteStep(1,null,null,null,1,"instruction two",null);
        let routeStepsSpy = new Array<RouteStep>(routeStep1,routeStep2);
        let routeUnderTest = new Route(null,null,null,null,null,routeStepsSpy);
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
        let expectedInstructions = ["instruction one", "instruction two"];
        expect(routeUnderTest.getInstructions()).toEqual(expectedInstructions);
    });
});