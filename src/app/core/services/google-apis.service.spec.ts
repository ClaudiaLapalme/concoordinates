import { TestBed } from '@angular/core/testing';
import { CoreModule } from '../core.module';
import { GoogleApisService } from './google-apis.service';


describe('GoogleApisService', () => {
    let service: GoogleApisService;
    beforeEach(() => TestBed.configureTestingModule({
        imports: [CoreModule],
    }));

    beforeEach(() => {
        service = TestBed.get(GoogleApisService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('createMap()', () => {

        it('should return a map', () => {
            const options: google.maps.MapOptions = {
                center: new google.maps.LatLng(12.34, 34.21),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
            };
            const map: google.maps.Map = service.createMap({ nativeElement: null }, options);
            expect(map).toBeTruthy();
        });

    });

    describe('createMarker()', () => {

        it('should return a marker', () => {
            const options: google.maps.MapOptions = {
                center: new google.maps.LatLng(12.34, 34.21),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
            };
            const position = new google.maps.LatLng(12.34, 34.21);
            const icon: google.maps.Icon = {
                url: '../../assets/icon/center_marker.png',
                scaledSize: new google.maps.Size(30, 30),
            };
            const map: google.maps.Map = service.createMap({ nativeElement: null }, options);
            const marker: google.maps.Marker = service.createMarker(position, map, icon);
            expect(marker).toBeTruthy();
        });

    });

    describe('createLatLng()', () => {

        it('should return a LatLng', () => {
            expect(service.createLatLng(5, 4)).toBeTruthy();
        });

    });

    describe('getDirectionsService()', () => {
        it('should return a DirectionsService', () => {
            expect(service.getDirectionsService()).toBeTruthy();
        });
    });

    describe('mapReference', () => {
        it('should return a Map', () => {
            expect(service.mapReference({ nativeElement: null })).toBeTruthy();
        });
    });

    describe('getMapRenderer()', () => {
        it('should return a MapRenderer', () => {
            expect(service.getMapRenderer()).toBeTruthy();
        });
    });

});
