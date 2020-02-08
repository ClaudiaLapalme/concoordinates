import { TestBed } from '@angular/core/testing';
import { GoogleApisService } from './google-apis.service';


describe('GoogleApisService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: GoogleApisService = TestBed.get(GoogleApisService);
        expect(service).toBeTruthy();
    });

    describe('createMap()', () => {

        it('should return a map', () => {
            const service: GoogleApisService = TestBed.get(GoogleApisService);
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
            const service: GoogleApisService = TestBed.get(GoogleApisService);
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

});
