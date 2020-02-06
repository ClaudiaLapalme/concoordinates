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
  constructor(private nativeGeocoder: NativeGeocoder) {}

  // TODO: move this to be returned instead of stored globally to the service
  address: string;

  // TODO change return to be what it says it returns
  /* From coordinates to an address */
  getAddressFromCoords(latitude, longitude): void {

    console.log('getAddressFromCoords ' + latitude + ' ' + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    /* runs on native only (pc does not work) */
    // TODO: push this to google-apis.service
    // TODO: refactor this
    this.nativeGeocoder.reverseGeocode(latitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {

        this.address = '';
        const responseAddress = [];
        if (result[0]) {
          Object.values(result[0]).forEach(property => {
            if (property) {
              responseAddress.unshift(property);
            }
          });
        }

        for (let value of responseAddress) {
          this.address += value + ', ';
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = 'Address Not Available!';
      });
  }
}
