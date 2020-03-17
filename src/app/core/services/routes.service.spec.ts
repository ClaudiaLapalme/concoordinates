import { TestBed } from '@angular/core/testing';
import {
    Coordinates,
    Route,
    RouteStep,
    Transport,
    TransportMode
} from '../models';
import { RoutesService } from '../services';
import { MapService } from '../services/map.service';
import { GoogleApisService } from '../services/google-apis.service';

describe('RoutesService', () => {
    class MockGoogleApiService {
        getGoogleMapRoutes(dirRequest: google.maps.DirectionsRequest) {}
    }
    function testServiceSetup() {
        const locationServiceSpy = jasmine.createSpyObj('LocationService', [
            'getGeoposition',
            'getAddressFromLatLng'
        ]);
        const googleApisServiceSpy = jasmine.createSpyObj('GoogleApisService', [
            'createMap',
            'createMarker',
            'createLatLng'
        ]);
        const placeServiceSpy = jasmine.createSpyObj('PlaceService', [
            'enableService'
        ]);
        const mapService: MapService = new MapService(
            locationServiceSpy,
            googleApisServiceSpy,
            placeServiceSpy
        );
        return { mapService, locationServiceSpy, googleApisServiceSpy };
    }
    let service: RoutesService;

    beforeEach(async () =>
        TestBed.configureTestingModule({
            providers: [
                { provide: GoogleApisService, useClass: MockGoogleApiService }
            ]
        })
    );

    beforeEach(() => {
        service = TestBed.get(RoutesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    xit('Should call all underlying methods at least once', done => {
        const dirRequest: google.maps.DirectionsRequest = {
            origin: 'start',
            destination: 'end',
            travelMode: this.testGoogleTravelModeMockDriving.toString(),
            transitOptions: { departureTime: null, arrivalTime: null },
            provideRouteAlternatives: true
        };
        spyOn(service, 'mapGoogleStepsToRouteSteps');
        spyOn(service, 'mapGoogleRoutesToRoutes');
        spyOn(service, 'getPathFromLatLngList');

        service.getMappedRoutes(dirRequest).then(() => {
            expect(service.mapGoogleStepsToRouteSteps).toHaveBeenCalled();
            expect(service.mapGoogleRoutesToRoutes).toHaveBeenCalled();
            expect(service.getPathFromLatLngList).toHaveBeenCalled();
            done();
        });
    });

    it('Should convert LatLng list to a list of Coordinates', () => {
        const testLatNum = 6;
        const testLngNum = 7;
        const testGoogleLatLng = jasmine.createSpyObj('testGoogleLatLng', {
            lat: testLatNum,
            lng: testLngNum
        });
        const testCoordinate: Coordinates = new Coordinates(
            testLatNum,
            testLngNum,
            null
        );

        expect(
            service.getPathFromLatLngList([testGoogleLatLng, testGoogleLatLng])
        ).toEqual([testCoordinate, testCoordinate]);
        expect(testGoogleLatLng.lat).toHaveBeenCalledTimes(2);
        expect(testGoogleLatLng.lng).toHaveBeenCalledTimes(2);
    });

    it('Should convert gSteps to Route Steps', () => {
        const testLatNum = 6;
        const testLngNum = 7;
        const testGoogleLatLng = jasmine.createSpyObj('testGoogleLatLng', {
            lat: testLatNum,
            lng: testLngNum
        });
        const testCoordinate: Coordinates = new Coordinates(
            testLatNum,
            testLngNum,
            null
        );
        const testGoogleTravelModeMockDriving: any = jasmine.createSpyObj(
            'transportMode',
            { toString: 'DRIVING' }
        );

        const mockStep: google.maps.DirectionsStep = {
            steps: [],
            distance: { value: 1, text: 'abc' },
            duration: { value: 60, text: 'abc' }, // in Seconds
            end_location: testGoogleLatLng,
            instructions: null,
            path: [testGoogleLatLng, testGoogleLatLng],
            start_location: testGoogleLatLng,
            transit: null,
            travel_mode: testGoogleTravelModeMockDriving
        };

        const testRoute = new RouteStep(
            1,
            testCoordinate,
            testCoordinate,
            [testCoordinate, testCoordinate],
            1, // in Minutes
            null,
            new Transport(null, null, TransportMode.DRIVING, null)
        );
        expect(
            service.mapGoogleStepsToRouteSteps([mockStep, mockStep])
        ).toEqual([testRoute, testRoute]);
    });

    it('Should convert gRoutes to Routes', () => {
        const testLatNum = 6;
        const testLngNum = 7;
        const testGoogleLatLng = jasmine.createSpyObj('testGoogleLatLng', {
            lat: testLatNum,
            lng: testLngNum
        });
        const testCoordinate: Coordinates = new Coordinates(
            testLatNum,
            testLngNum,
            null
        );

        const dirRoute: google.maps.DirectionsRoute = {
            bounds: null,
            copyrights: null,
            fare: null,
            overview_path: null,
            overview_polyline: null,
            warnings: null,
            waypoint_order: null,
            legs: [
                {
                    start_location: testGoogleLatLng,
                    end_location: testGoogleLatLng,
                    departure_time: { text: '', time_zone: 'GMT', value: null },
                    steps: [],
                    arrival_time: { text: '', time_zone: 'GMT', value: null },
                    distance: null,
                    duration: null,
                    duration_in_traffic: null,
                    end_address: null,
                    start_address: null,
                    via_waypoints: null
                }
            ]
        };

        const testRoute = new Route(
            testCoordinate,
            testCoordinate,
            null,
            null,
            null,
            []
        );

        expect(
            service.mapGoogleRoutesToRoutes([dirRoute, dirRoute]).length
        ).toBe(2);
        expect(
            service.mapGoogleRoutesToRoutes([dirRoute, dirRoute])[0]
        ).toEqual(testRoute);
    });
});
