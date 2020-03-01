import { TestBed } from '@angular/core/testing';
import { RouteFactory } from '../factories';
import { TransportMode } from '../models';
import { RoutesService } from '../services';

describe('RouteFactory', () => {
    let mockService: RoutesService;
    let routeFactory: RouteFactory;
    beforeEach(async () => TestBed.configureTestingModule({}));
    beforeEach(() => {
        mockService = jasmine.createSpyObj('mockService', ['getMappedRoutes']);
        routeFactory = new RouteFactory(mockService);
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

        routeFactory.generateDefaultRoutes(startCoordinates, endCoordinates,
            startTimeAsDate, endTimeAsDate, testTransportModeDriving);
        expect(mockService.getMappedRoutes).toHaveBeenCalledWith(dirRequest);
    });
});
