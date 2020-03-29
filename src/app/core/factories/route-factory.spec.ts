import { TestBed } from '@angular/core/testing';
import { IndoorFunctionsService } from 'src/app/shared/indoor-functions.service';
import { RouteFactory } from '../factories';
import { TransportMode } from '../models';
import { RoutesService } from '../services';

describe('RouteFactory', () => {
    let mockService: RoutesService;
    let mockIndoorFunctionsService: IndoorFunctionsService;
    let routeFactory: RouteFactory;
    beforeEach(async () => TestBed.configureTestingModule({}));
    beforeEach(() => {
        mockService = jasmine.createSpyObj('mockService', ['getMappedRoutes', 'bothCoordinatesMatchIndoorParams']);
        mockIndoorFunctionsService = jasmine.createSpyObj('mockIndoorFunctionsService', ['bothCoordinatesMatchIndoorParams']);
        routeFactory = new RouteFactory(mockService, mockIndoorFunctionsService);
    });


    it('should create factory', () => {
        expect(routeFactory).toBeTruthy();
    });

    it('Should call routes service with a directions request', () => {
        const startCoordinates = 'Loyola';
        const endCoordinates = 'Ohio';
        const startTimeAsDate: Date = new Date(1000);
        const endTimeAsDate: Date = new Date(1000);
        const testTransportModeDriving = TransportMode.DRIVING;
        const testGoogleTravelModeMockDriving: any = jasmine.createSpyObj('transportMode',
            { toString: 'DRIVING' });

        const dirRequest: google.maps.DirectionsRequest = {
            origin: startCoordinates.toString(),
            destination: endCoordinates.toString(),
            travelMode: testGoogleTravelModeMockDriving.toString(),
            transitOptions: { departureTime: startTimeAsDate, arrivalTime: endTimeAsDate },
            provideRouteAlternatives: true
        };

        routeFactory.getRoutes(startCoordinates, endCoordinates,
            startTimeAsDate, endTimeAsDate, testTransportModeDriving);
        expect(mockService.getMappedRoutes).toHaveBeenCalledWith(dirRequest);
    });

    it('Should check start and end coordinates for indoor validation', () => {
        const startCoordinates = 'H811';
        const endCoordinates = 'H812';
        routeFactory.getRoutes(startCoordinates, endCoordinates);
        expect(mockIndoorFunctionsService.bothCoordinatesMatchIndoorParams).toHaveBeenCalledWith(startCoordinates, endCoordinates);
    });
});
