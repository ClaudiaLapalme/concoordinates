import { TestBed } from '@angular/core/testing';
import { CoreModule } from '..';
import { IndoorPOIFactoryService } from './indoor-poi-factory.service';

describe('IndoorPoiFactoryService', () => {
    let service: IndoorPOIFactoryService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CoreModule]
        });
        service = TestBed.get(IndoorPOIFactoryService);
    });

    it('IndoorPoiFactoryService should be created', () => {
        expect(service).toBeTruthy();
    });
    describe('Testing loadFloorPois function', () => {
        // Since it loads from a file we'll only test the length to verify properly loaded
        it('8th floor POI amount', () => {
            const floorPoi = service.loadFloorPOIs(8);
            expect(floorPoi.length).toBe(51);
        });

        it('1th floor POI amount', () => {
            const floorPoi = service.loadFloorPOIs(1);
            expect(floorPoi.length).toBe(11);
        });

        it('2nd floor should return no elements', () => {
            const floorPoi = service.loadFloorPOIs(2);
            expect(floorPoi.length).toBe(0);
        });
    });
});
