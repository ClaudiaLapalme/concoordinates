import { MapService } from './map.service';


describe('MapService', () => {
    let mapService: MapService;

    it('should be created', () => {
        mapService = new MapService(null, null);
        expect(mapService).toBeTruthy();
    });

    describe('loadMap()', () => {
        // TODO
        it('should do this', () => {
            expect(5).toBe(5);
        });
    });

});
