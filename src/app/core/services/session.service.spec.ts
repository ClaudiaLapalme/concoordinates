import { TestBed } from '@angular/core/testing';
import { SessionService, NavigationParams } from './session.service';

describe('SessionService', () => {

    let service: SessionService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(SessionService);

    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    class MockMaps extends google.maps.Map {
    }

    it('should store the map', () => {

        const mockMap = new MockMaps(null);
        service.storeMapRef(mockMap);
        expect(service.map).not.toBeNull();

    });

    it('should return the map', () => {

        const mockMap = new MockMaps(null);
        service.storeMapRef(mockMap);
        const returnedMap = service.getMapRef();
        expect(service.map).toEqual(returnedMap);

    });

    it('should store the navigation params', () => {

        service.storeNavigationParams({
            location: 'H820',
            isRouteToEvent: true
        });
        expect(service.navigationParams.location).toBe('H820');
        expect(service.navigationParams.isRouteToEvent).toBe(true);
        expect(service.navigationParamsLoaded).toBeTruthy();

    });

    it('should return the navigation params', () => {

        service.storeNavigationParams({
            location: 'H820',
            isRouteToEvent: true
        });
        const returnedNavParams = service.getNavigationParams();
        expect(service.navigationParams).toEqual(returnedNavParams);
        
    });

});
