import { ElementRef } from '@angular/core';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { MapService } from './map.service';

describe('MapService', () => {
    // let mapService: MapService;
    function testServiceSetup() {
        const locationServiceSpy = jasmine.createSpyObj('LocationService', ['getGeoposition', 'getAddressFromLatLng']);
        const googleApisServiceSpy = jasmine.createSpyObj('GoogleApisService', ['createMap', 'createMarker', 'createLatLng']);
        const mapService: MapService = new MapService(locationServiceSpy, googleApisServiceSpy);
        return { mapService, locationServiceSpy, googleApisServiceSpy };
    }

    it('should be created', () => {
        const { mapService } = testServiceSetup();
        expect(mapService).toBeTruthy();
    });

    describe('loadMap()', () => {

        class MockElementRef extends ElementRef {
            nativeElement = {};
        }

        class MockMaps extends google.maps.Map {
            addListener() {
                return null;
            }
        }

        it('should return a map', () => {
            const { mapService, locationServiceSpy, googleApisServiceSpy } = testServiceSetup();

            const mapElement = new MockElementRef({});

            const mockGeoposition: Partial<Geoposition> = {
                coords: {
                    latitude: 12,
                    longitude: 34,
                    accuracy: 45,
                    altitude: 35,
                    altitudeAccuracy: 123,
                    heading: 421,
                    speed: 12,
                }
            };
            locationServiceSpy.getGeoposition.and.returnValue(mockGeoposition);
            const mockMap = new MockMaps(null);

            const mockLatLng = new google.maps.LatLng(55, 66);
            const latKey = 'lat';
            const lngKey = 'lng';
            mockLatLng[latKey] = () => 55;
            mockLatLng[lngKey] = () => 566;

            googleApisServiceSpy.createMap.and.returnValue(mockMap);
            googleApisServiceSpy.createLatLng.and.returnValue(mockLatLng);
            mapService.loadMap(mapElement);

            expect(locationServiceSpy.getGeoposition).toHaveBeenCalledTimes(1);
        });

        it('should catch when an error occurs', () => {
            const { mapService, locationServiceSpy, googleApisServiceSpy } = testServiceSetup();

            const mapElement = new MockElementRef({});

            const mockGeoposition: Partial<Geoposition> = {
                coords: {
                    latitude: 12,
                    longitude: 34,
                    accuracy: 45,
                    altitude: 35,
                    altitudeAccuracy: 123,
                    heading: 421,
                    speed: 12,
                }
            };
            locationServiceSpy.getGeoposition.and.throwError('hello');
            const mockMap = new MockMaps(null);

            mapService.loadMap(mapElement);

            expect(locationServiceSpy.getGeoposition).toHaveBeenCalledTimes(1);
        });

        it('should call getGeoposition from locationService and get nothing', () => {
            const { mapService, locationServiceSpy, googleApisServiceSpy } = testServiceSetup();

            const mapElement = new MockElementRef({});
            mapService.loadMap(mapElement);

            expect(locationServiceSpy.getGeoposition).toHaveBeenCalledTimes(1);
        });
    });

    describe('tilesLoadedHandler()', () => {

        // class MockElementRef extends ElementRef {
        //     nativeElement = {};
        // }

        it('should return a tilesloaded handler', () => {
            const { mapService, locationServiceSpy, googleApisServiceSpy } = testServiceSetup();

            const mockAddress = 'test address';
            locationServiceSpy.getAddressFromLatLng.and.returnValue(Promise.resolve(mockAddress));

            const mockMap = new google.maps.Map(null);

            const handlerFunction = 'tilesLoadedHandler';
            const handler = mapService[handlerFunction](mockMap, 12, 34);
            handler();

            expect(locationServiceSpy.getAddressFromLatLng).toHaveBeenCalledTimes(1);
        });

        // it('should call getGeoposition from locationService and get nothing', () => {
        //     const { mapService, locationServiceSpy, googleApisServiceSpy } = testServiceSetup();

        //     const mapElement = new MockElementRef({});
        //     mapService.loadMap(mapElement);

        //     expect(locationServiceSpy.getGeoposition).toHaveBeenCalledTimes(1);
        // });
    });

});
