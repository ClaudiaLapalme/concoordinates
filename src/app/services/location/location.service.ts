import { Injectable } from '@angular/core';
import {
    NativeGeocoderOptions,
    NativeGeocoderResult,
    NativeGeocoder
} from '@ionic-native/native-geocoder/ngx';

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    constructor(private nativeGeocoder: NativeGeocoder) { }


    public getGeoLocation(): google.maps.LatLng {
        return new google.maps.LatLng(0, 0);
    }

    // // From LatLng to an address
    // getAddressFromLatLng(lat: number, lng: number): string {

    //     const options: NativeGeocoderOptions = {
    //         useLocale: true,
    //         maxResults: 5
    //     };

    //     const address = '';
    //     this.nativeGeocoder.reverseGeocode(lat, lng, options)
    //         .then((result: NativeGeocoderResult[]) => {

    //             const responseAddress = [];
    //             if (result[0]) {
    //                 Object.values(result[0]).forEach(property => {
    //                     if (property) {
    //                         responseAddress.unshift(property);
    //                     }
    //                 });
    //             }

    //             for (let value of responseAddress) {
    //                 address += value + ', ';
    //             }
    //             address = address.slice(0, -2);
    //         })
    //         .catch((error: any) => {
    //             address = 'Address Not Available!';
    //         });
    // }
}
