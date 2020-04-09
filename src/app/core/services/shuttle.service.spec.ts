import { TestBed } from '@angular/core/testing';

import { ShuttleService } from './shuttle.service';
import { CampusBoundsService } from './campus-bounds.service';
import { GoogleApisService } from './google-apis.service';
import { RouteStep, Coordinates, OutdoorRoute, Transport, TransportMode } from '../models';

describe('ShuttleService', () => {
    let shuttleService: ShuttleService;
    let mockcampusBoundsService: CampusBoundsService;
    let mockgoogleApisService: GoogleApisService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        mockgoogleApisService = jasmine.createSpyObj('mockGoogleApisService', ['createLatLng', 'createMarker', 'createPolyline']);
        mockcampusBoundsService = jasmine.createSpyObj('mockcampusBoundsService', ['isWithinBoundsOfLoyola', 'isWithinBoundsOfSGW']);
        shuttleService = new ShuttleService(mockcampusBoundsService, mockgoogleApisService);


    });

    it('should be created', () => {
        expect(shuttleService).toBeTruthy();
    });

    describe('isShuttleRoute', () => {

        it('should return true if a route is a shuttle route', () => {
            const routeStep1 = new RouteStep(
                1,
                new Coordinates(1, 2, 0),
                new Coordinates(1, 2, 0),
                null,
                1,
                'instruction one',
                new Transport(0, 0, TransportMode.SHUTTLE, null));

            const routeStepsSpy = new Array<RouteStep>(routeStep1);
            const routeUnderTest = new OutdoorRoute(
                new Coordinates(1, 2, 0),
                new Coordinates(1, 2, 0),
                null,
                null,
                null,
                routeStepsSpy
            );
            expect(shuttleService.isShuttleRoute(routeUnderTest)).toBeTruthy();
        });

        it('should return false if a route is not a shuttle route', () => {
            const routeStep1 = new RouteStep(
                1,
                new Coordinates(1, 2, 0),
                new Coordinates(1, 2, 0),
                null,
                1,
                'instruction one',
                new Transport(0, 0, TransportMode.DRIVING, null));

            const routeStepsSpy = new Array<RouteStep>(routeStep1);
            const routeUnderTest = new OutdoorRoute(
                new Coordinates(1, 2, 0),
                new Coordinates(1, 2, 0),
                null,
                null,
                null,
                routeStepsSpy
            );
            expect(shuttleService.isShuttleRoute(routeUnderTest)).toBeFalsy();
        });
    });

    describe('displayShuttleRoute', () => {
        it('should return true if a route is a shuttle route', () => {
            const routeStep = new RouteStep(
                1,
                new Coordinates(1, 2, 0),
                new Coordinates(1, 2, 0),
                [new Coordinates(1, 2, 0), new Coordinates(1, 2, 0)],
                1,
                'instruction one',
                new Transport(0, 0, TransportMode.SHUTTLE, null));

            const routeStepList = new Array<RouteStep>(routeStep);
            const routeUnderTest = new OutdoorRoute(
                new Coordinates(1, 2, 0),
                new Coordinates(1, 2, 0),
                null,
                null,
                null,
                routeStepList
            );
            
            class MockMap extends google.maps.Map { }
            const path = [new google.maps.LatLng(45, -74)];
            (mockgoogleApisService.createPolyline as jasmine.Spy).and.returnValue(new google.maps.Polyline({path, geodesic: true, strokeColor:'#000000',strokeOpacity: 1.0, strokeWeight: 2}));


            expect(shuttleService.displayShuttleRoute(new MockMap(null), routeUnderTest)).toBeTruthy();

        });

        it('should return false if a route is a shuttle route', () => {
            const routeStep = new RouteStep(
                1,
                new Coordinates(1, 2, 0),
                new Coordinates(1, 2, 0),
                null,
                1,
                'instruction one',
                new Transport(0, 0, TransportMode.DRIVING, null));
    
            const routeStepList = new Array<RouteStep>(routeStep);
            const routeUnderTest = new OutdoorRoute(
                new Coordinates(1, 2, 0),
                new Coordinates(1, 2, 0),
                null,
                null,
                null,
                routeStepList
            );
            class MockMap extends google.maps.Map { }
    
            expect(shuttleService.displayShuttleRoute(new MockMap(null), routeUnderTest)).toBeFalsy();
    
        });
    });

});

