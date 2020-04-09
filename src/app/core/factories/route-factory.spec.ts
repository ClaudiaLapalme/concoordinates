import { TestBed } from '@angular/core/testing';
import { IndoorFunctionsService } from 'src/app/shared/indoor-functions.service';
import { RouteFactory } from '../factories';
import { TransportMode } from '../models';
import { RoutesService, ShuttleService } from '../services';
import { start } from 'repl';

describe('RouteFactory', () => {
    let mockService: RoutesService;
    let mockIndoorFunctionsService: IndoorFunctionsService;
    let routeFactory: RouteFactory;
    let mockShuttleService: ShuttleService;
    beforeEach(async () => TestBed.configureTestingModule({}));
    beforeEach(() => {
        mockService = jasmine.createSpyObj('mockService', ['getMappedRoutes', 'bothCoordinatesMatchIndoorParams']);
        mockIndoorFunctionsService = jasmine.createSpyObj('mockIndoorFunctionsService', ['bothCoordinatesMatchIndoorParams']);
        mockIndoorFunctionsService = jasmine.createSpyObj('mockIndoorFunctionsService', ['bothCoordinatesMatchIndoorParams']);
        mockShuttleService = jasmine.createSpyObj('mockShuttleService', ['generateShuttleRoute']);
        routeFactory = new RouteFactory(mockService, mockIndoorFunctionsService, mockShuttleService);
    });


    it('should create factory', () => {
        expect(routeFactory).toBeTruthy();
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

    it('Should call routes service with a directions request', () => {
        let startCoordinates =  new MockPlaceResult();
         startCoordinates.formatted_address =  'Loyola';
        const endCoordinates = new MockPlaceResult();
         endCoordinates.formatted_address = 'Ohio'
        const startTimeAsDate: Date = new Date(1000);
        const endTimeAsDate: Date = new Date(1000);
        const testTransportModeDriving = TransportMode.DRIVING;
        const testGoogleTravelModeMockDriving: any = jasmine.createSpyObj('transportMode',
            { toString: 'DRIVING' });

        const dirRequest: google.maps.DirectionsRequest = {
            origin: startCoordinates.formatted_address,
            destination: endCoordinates.formatted_address,
            travelMode: testGoogleTravelModeMockDriving.toString(),
            transitOptions: { departureTime: startTimeAsDate, arrivalTime: endTimeAsDate },
            provideRouteAlternatives: true
        };

        routeFactory.getRoutes(startCoordinates, endCoordinates,
            startTimeAsDate, endTimeAsDate, testTransportModeDriving);
        expect(mockService.getMappedRoutes).toHaveBeenCalledWith(dirRequest);
    });

    it('Should check start and end coordinates for indoor validation', () => {
        let startCoordinates = new MockPlaceResult();
        startCoordinates.formatted_address = 'H801';
        let endCoordinates = new MockPlaceResult();
        endCoordinates.formatted_address = 'H812';
        routeFactory.getRoutes(startCoordinates, endCoordinates);
        expect(mockIndoorFunctionsService.bothCoordinatesMatchIndoorParams).toHaveBeenCalledWith(startCoordinates.formatted_address, endCoordinates.formatted_address);
    });
});
