import { TestBed } from '@angular/core/testing';

import { MapService } from './map.service';
import { LocationService } from '../location/location.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

describe('MapService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [LocationService, Geolocation, NativeGeocoder]
    }));

    it('should be created', () => {
        const service: MapService = TestBed.get(MapService);
        expect(service).toBeTruthy();
    });

    describe('loadMap()', () => {
        // TODO
        it('should do this', () => {
            expect(5).toBe(5);
        });
    });
    
});
