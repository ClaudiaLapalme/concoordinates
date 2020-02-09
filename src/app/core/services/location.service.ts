import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Platform } from '@ionic/angular';

@Injectable()
export class LocationService {

    constructor(
        private nativeGeocoder: NativeGeocoder,
        private geolocation: Geolocation,
        private platform: Platform,
    ) { }

    public getGeoposition(): Promise<Geoposition> {
        return this.geolocation.getCurrentPosition();
    }

    // From LatLng to an address
    public getAddressFromLatLng(lat: number, lng: number): Promise<string> {

        const options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        if (this.platform.is('cordova')) {
            let reverseGeocoding: Promise<NativeGeocoderResult[]>;
            reverseGeocoding = this.nativeGeocoder.reverseGeocode(lat, lng, options);
            if (reverseGeocoding) {
                reverseGeocoding
                    .then((result: NativeGeocoderResult[]) => {
                        return !!result ? JSON.stringify(result[0]) : 'Unavailable address';
                    })
                    .catch((error: any) => {
                        return 'There was an error while reversegeocoding';
                    });
            } else {
                return new Promise(() => 'ReverseGeocoding unavailable');
            }
        } else {
            return new Promise(() => 'Platform unavailable');
        }
    }
}
