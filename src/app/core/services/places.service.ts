import { Injectable, EventEmitter } from '@angular/core';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { LocationService } from './location.service';
import { GoogleApisService } from './google-apis.service';

@Injectable()
export class PlacesService {
    searchResultsResolved = new EventEmitter<
        Array<google.maps.places.PlaceResult>
    >();

    constructor(
        private locationService: LocationService
    ) {}

    /**
     * Given a map reference and input string, search locations
     * in radius range
     * @param map the reference to the html map
     * @param input the query string
     */
    async textSearch(map: google.maps.Map, input: string): Promise<any> {
        // Retrieve users current location from locationService
        const geoPos: Geoposition = await this.locationService.getGeoposition();

        // Extra options for Google Places Service
        let options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
                // Create service obj using map reference passed
        // Send current location, radius and text input
        return new Promise<google.maps.places.PlaceResult[]>(resolve => {
            new google.maps.places.PlacesService(map).textSearch(
                {location: {
                        lat: geoPos.coords.latitude,
                        lng: geoPos.coords.longitude
                    },
                    radius: 1000,
                    query: input
                },
                (res, status) => {
                    if (status === 'OK') {
                        resolve(res);
                    } else {
                        resolve([]);
                        throw new Error('Error the status is: ' + status);
                    }
                }
            );
        });
    }
}
