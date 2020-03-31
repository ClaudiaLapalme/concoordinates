import { TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';

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

});
