import { Injectable, EventEmitter } from '@angular/core';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { LocationService } from './location.service';


@Injectable()
export class PlacesService {

    searchResultsResolved = new EventEmitter<Array<google.maps.places.PlaceResult>>();

    constructor(
        private locationService: LocationService,
    ) { }

    /**
     * Given a map reference and input string, search locations
     * in radius range 
     * @param map the reference to the html map
     * @param input the query string 
     */
    async textSearch(map: google.maps.Map, input: string) {

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
        var service = new google.maps.places.PlacesService(map);
        await service.textSearch({
            location: { lat: geoPos.coords.latitude, lng: geoPos.coords.longitude },
            radius: 1000,
            query: input
        }, (results, status) => {
            // If 200 response from google, emit event to search component indicating results are in
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                this.searchResultsResolved.emit(results);
            }
        });
    }

    /**
     * Given both map and place objects, infowindow on
     * map for given place, and automatically recenter map +
     * trigger infowindow popup
     * @param map the reference to the html map
     * @param place the google place result object
     */
    createMarker(place, map: google.maps.Map) {
        let infowindow: any;
        infowindow = new google.maps.InfoWindow();

        // Create marker object based on place parameter
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: placeLoc
        });

        // Make marker clickable, once clicked shows a popup with more information
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                'Place ID: ' + place.place_id + '</div>');
            infowindow.open(map, this);
        });

        // Re-center map at place object + trigger popup for given Place Object
        setTimeout(() => {
            map.setCenter(placeLoc);
            google.maps.event.trigger(marker, 'click', function () {
                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                    'Place ID: ' + place.place_id + '</div>');
                infowindow.open(map, this);
            });
        }, 1000);


    }
}
