import { TestBed } from '@angular/core/testing';

import { Coordinates, OutdoorRoute,  Route, RouteStep, Transport, TransportMode } from '../models';
import { CampusBoundsService } from './campus-bounds.service';
import { GoogleApisService } from './google-apis.service';
import { ShuttleService } from './shuttle.service';
import { IconService } from './icon.service';

describe('ShuttleService', () => {
    let shuttleService: ShuttleService;
    let mockShuttleService: ShuttleService;
    let mockcampusBoundsService: CampusBoundsService;
    let mockgoogleApisService: GoogleApisService;
    let mockIconService: IconService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        mockgoogleApisService = jasmine.createSpyObj('mockGoogleApisService', ['createLatLng', 'createMarker', 'createPolyline']);
        mockcampusBoundsService = jasmine.createSpyObj('mockcampusBoundsService', ['isWithinBoundsOfLoyola', 'isWithinBoundsOfSGW']);
        mockShuttleService = jasmine.createSpyObj('mockShuttleService', ['isEligibleForShuttle']);
        mockIconService = jasmine.createSpyObj('mockIconService', ['getPlaceIcon']);
        shuttleService = new ShuttleService(mockcampusBoundsService, mockgoogleApisService, mockIconService);
    });

    class MockPlaceResult implements google.maps.places.PlaceResult {
        address_components?: google.maps.GeocoderAddressComponent[];
        adr_address?: string;
        aspects?: google.maps.places.PlaceAspectRating[];
        formatted_address?: string;
        formatted_phone_number?: string;
        geometry?: google.maps.places.PlaceGeometry;
        html_attributions?: string[];
        icon?: string;
        id?: string;
        international_phone_number?: string;
        name: string;
        opening_hours?: google.maps.places.OpeningHours;
        permanently_closed?: boolean;
        photos?: google.maps.places.PlacePhoto[];
        place_id?: string;
        plus_code?: google.maps.places.PlacePlusCode;
        price_level?: number;
        rating?: number;
        reviews?: google.maps.places.PlaceReview[];
        types?: string[];
        url?: string;
        user_ratings_total?: number;
        utc_offset?: number;
        utc_offset_minutes?: number;
        vicinity?: string;
        website?: string;
    }

    function generateMockPath(): Coordinates[] {
        return  [
            new Coordinates(45.49708084, -73.57838711, null),
            new Coordinates(45.49632880, -73.57904157, null),
            new Coordinates(45.49565948, -73.57929906, null),
            new Coordinates(45.49356122, -73.58162722, null),
            new Coordinates(45.49010906, -73.58573636, null),
            new Coordinates(45.48931180, -73.58457765, null),
            new Coordinates(45.48457314, -73.58927688, null),
            new Coordinates(45.48001463, -73.59457692, null),
            new Coordinates(45.47852513, -73.59637937, null),
            new Coordinates(45.47799853, -73.59743079, null),
            new Coordinates(45.47593722, -73.59985551, null),
            new Coordinates(45.47557611, -73.60089621, null),
            new Coordinates(45.47590713, -73.60220512, null),
            new Coordinates(45.47292788, -73.60570272, null),
            new Coordinates(45.47207019, -73.60680779, null),
            new Coordinates(45.47091153, -73.60899648, null),
            new Coordinates(45.46669803, -73.61715039, null),
            new Coordinates(45.46523076, -73.62013301, null),
            new Coordinates(45.46669803, -73.62341603, null),
            new Coordinates(45.46466641, -73.62727841, null),
            new Coordinates(45.46036967, -73.63535723, null),
            new Coordinates(45.45922582, -73.63721332, null),
            new Coordinates(45.45837733, -73.63823256, null)
        ];
    }

    it('should be created', () => {
        expect(shuttleService).toBeTruthy();
    });

    describe('isShuttleRoute()', () => {

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

    // describe('displayShuttleRoute', () => {

    //     it('should return false if a route is a shuttle route', () => {
    //         const routeStep = new RouteStep(
    //             1,
    //             new Coordinates(1, 2, 0),
    //             new Coordinates(1, 2, 0),
    //             null,
    //             1,
    //             'instruction one',
    //             new Transport(0, 0, TransportMode.DRIVING, null));

    //         const routeStepList = new Array<RouteStep>(routeStep);
    //         const routeUnderTest = new OutdoorRoute(
    //             new Coordinates(1, 2, 0),
    //             new Coordinates(1, 2, 0),
    //             null,
    //             null,
    //             null,
    //             routeStepList
    //         );
    //         class MockMap extends google.maps.Map { }

    //         expect(shuttleService.displayShuttleRoute(new MockMap(null), routeUnderTest)).toBeFalsy();

    //     });
    // });

    describe('generateShuttlePath()', () => {
        it('should return the path to LOY', () => {
            shuttleService.startCampus = 'SGW';

            let daWae = generateMockPath();

            expect(shuttleService.generateShuttlePath()).toEqual(daWae);

        });
    });

    describe('generateShuttleRoute()', () => {

        it('should return the original route if the user is not eligible', () => {

            const startCoord = new Coordinates(1, 1, null);
            const endCoord = new Coordinates(2, 2, null);
            const routeSteps = [
                new RouteStep(
                    0,
                    startCoord,
                    endCoord,
                    null,
                    30,
                    'Take the shuttle',
                    new Transport(0, 0, TransportMode.SHUTTLE, null))
            ];
            const route: OutdoorRoute = new OutdoorRoute(startCoord, endCoord, null, null, null, routeSteps);
            const routes: Route[] = [route];


            expect(shuttleService.generateShuttleRoute(startCoord, endCoord, routes)).toEqual(routes);
        });
        it('should return a shuttle route if the user is eligible', () => {
            const startCoord = new Coordinates(45.4582, -73.6405, null);
            const endCoord = new Coordinates(45.4959053, -73.5801141, null);

            const routeSteps = [
                new RouteStep(
                    0,
                    startCoord,
                    endCoord,
                    null,
                    30,
                    'some instruction',
                    new Transport(0, 0, TransportMode.DRIVING, null))
            ];
            const originalRoute: OutdoorRoute = new OutdoorRoute(startCoord, endCoord, null, null, null, routeSteps);
            const originalRoutes: Route[] = [originalRoute];

            const newRouteSteps = [
                new RouteStep(
                    0,
                    startCoord,
                    endCoord,
                    generateMockPath(),
                    30,
                    'Take the shuttle',
                    new Transport(0, 0, TransportMode.SHUTTLE, null))
                ];
            const newRoute: OutdoorRoute = new OutdoorRoute(startCoord, endCoord, null, null, null, newRouteSteps);
            const newRoutes: OutdoorRoute[] = [newRoute];

            (mockShuttleService.isEligibleForShuttle as jasmine.Spy).and.returnValue(true);
            (mockcampusBoundsService.isWithinBoundsOfLoyola as jasmine.Spy).and.returnValues(true, false, true);
            (mockcampusBoundsService.isWithinBoundsOfSGW as jasmine.Spy).and.returnValue(true);


            expect(shuttleService.generateShuttleRoute(startCoord, endCoord, originalRoutes)).toEqual(newRoutes);
        });

    });

    describe('isEligibleForShuttle', () => {
        const startCoord = new Coordinates(45.4582, -73.6405, null);
        const endCoord = new Coordinates(45.4959053, -73.5801141, null);
        it('should return true if start location is in loyola and end location is in sgw', () => {
            (mockcampusBoundsService.isWithinBoundsOfLoyola as jasmine.Spy).and.returnValues(true, true);
            (mockcampusBoundsService.isWithinBoundsOfSGW as jasmine.Spy).and.returnValue(true);

            expect(shuttleService.isEligibleForShuttle(startCoord, endCoord)).toBeTruthy();

        });

        it('should return true if start location is in sgw and end location is in loyola', () => {
            (mockcampusBoundsService.isWithinBoundsOfLoyola as jasmine.Spy).and.returnValues(true, false, true);
            (mockcampusBoundsService.isWithinBoundsOfSGW as jasmine.Spy).and.returnValue(true);

            expect(shuttleService.isEligibleForShuttle(startCoord, endCoord)).toBeTruthy();
        });

        it('should return false if start location is in loyola and end location is not in sgw', () => {

            (mockcampusBoundsService.isWithinBoundsOfLoyola as jasmine.Spy).and.returnValues(true, true);
            (mockcampusBoundsService.isWithinBoundsOfSGW as jasmine.Spy).and.returnValue(false);

            expect(shuttleService.isEligibleForShuttle(startCoord, endCoord)).toBeFalsy();
        });

        it('should return false if start location is in sgw and end location is not in loyola', () => {

            (mockcampusBoundsService.isWithinBoundsOfLoyola as jasmine.Spy).and.returnValues(false, false, false);
            (mockcampusBoundsService.isWithinBoundsOfSGW as jasmine.Spy).and.returnValues(true, true);

            expect(shuttleService.isEligibleForShuttle(startCoord, endCoord)).toBeFalsy();
        });

        it('should return false if both locations are not in concordia campuses', () => {

            (mockcampusBoundsService.isWithinBoundsOfLoyola as jasmine.Spy).and.returnValues(false, false);
            (mockcampusBoundsService.isWithinBoundsOfSGW as jasmine.Spy).and.returnValues(true, true);

            expect(shuttleService.isEligibleForShuttle(startCoord, endCoord)).toBeFalsy();
        });

    });
});

