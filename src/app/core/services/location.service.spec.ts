import { NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { LocationService } from './location.service';

describe('LocationService', () => {

    function testServiceSetup() {
        const nativeGeocoderSpy = jasmine.createSpyObj('NativeGeocoder', ['reverseGeocode']);
        const geolocationSpy = jasmine.createSpyObj('Geolocation', ['getCurrentPosition']);
        const locationService: LocationService = new LocationService(nativeGeocoderSpy, geolocationSpy, null);
        return { locationService };
    }

    it('should be created', () => {
        const { locationService } = testServiceSetup();
        expect(locationService).toBeTruthy();
    });

    describe('getGeoposition()', () => {

        function testFunctionSetup() {
            const geolocationSpy = jasmine.createSpyObj('Geolocation', ['getCurrentPosition']);
            const locationService: LocationService = new LocationService(null, geolocationSpy, null);

            return { locationService, geolocationSpy };
        }

        it('should call getCurrentPosition', () => {
            const { locationService, geolocationSpy } = testFunctionSetup();

            locationService.getGeoposition();

            expect(geolocationSpy.getCurrentPosition).toHaveBeenCalledTimes(1);
        });

    });


    describe('getAddressFromLatLng()', () => {

        function testFunctionSetup() {
            const nativeGeocoderSpy = jasmine.createSpyObj('NativeGeocoder', ['reverseGeocode']);
            const geolocationSpy = jasmine.createSpyObj('Geolocation', ['getCurrentPosition']);
            const platformSpy = jasmine.createSpyObj('Platform', ['is']);
            const locationService: LocationService = new LocationService(nativeGeocoderSpy, geolocationSpy, platformSpy);

            return { nativeGeocoderSpy, geolocationSpy, platformSpy, locationService };
        }

        it('should check platform is not cordova', () => {
            const { nativeGeocoderSpy, geolocationSpy, platformSpy, locationService } = testFunctionSetup();
            platformSpy.is.and.returnValue(false);

            const promise = locationService.getAddressFromLatLng(12, 32);
            expect(promise).toBeTruthy();
        });

        it('should check platform is cordova and no reverseGeocoding available', () => {
            const { nativeGeocoderSpy, geolocationSpy, platformSpy, locationService } = testFunctionSetup();
            platformSpy.is.and.returnValue(true);

            const promise = locationService.getAddressFromLatLng(12, 32);
            expect(promise).toBeTruthy();
        });


        it('should check platform is cordova and reverseGeocoding is available with results', () => {
            const { nativeGeocoderSpy, geolocationSpy, platformSpy, locationService } = testFunctionSetup();
            platformSpy.is.and.returnValue(true);

            const results: NativeGeocoderResult[] = [{
                latitude: '12',
                longitude: '34',
                countryCode: 'CA',
                countryName: 'Canada',
                postalCode: 'A1D12A',
                administrativeArea: '',
                subAdministrativeArea: '',
                locality: '',
                subLocality: '',
                thoroughfare: '',
                subThoroughfare: '',
                areasOfInterest: [],
            }];

            const revGeocodePromise: Promise<NativeGeocoderResult[]> = new Promise((resolve) => {
                resolve(results);
            });
            nativeGeocoderSpy.reverseGeocode.and.callFake(() => revGeocodePromise);

            locationService.getAddressFromLatLng(12, 32);
            expect(nativeGeocoderSpy.reverseGeocode).toHaveBeenCalledTimes(1);
        });

        it('should check platform is cordova and reverseGeocoding is available with results', () => {
            const { nativeGeocoderSpy, geolocationSpy, platformSpy, locationService } = testFunctionSetup();
            platformSpy.is.and.returnValue(true);

            const noResults: NativeGeocoderResult[] = null;

            const revGeocodePromise: Promise<NativeGeocoderResult[]> = new Promise((resolve) => {
                resolve(noResults);
            });
            nativeGeocoderSpy.reverseGeocode.and.callFake(() => revGeocodePromise);

            locationService.getAddressFromLatLng(12, 32);
            expect(nativeGeocoderSpy.reverseGeocode).toHaveBeenCalledTimes(1);
        });

        // TODO untested error on promise throw
        xit('should return an error message after throw', () => {
            const { nativeGeocoderSpy, geolocationSpy, platformSpy, locationService } = testFunctionSetup();
            platformSpy.is.and.returnValue(true);
        });

    });

});
