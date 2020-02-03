import { Injectable } from '@angular/core';

declare var google: any;

@Injectable({
    providedIn: 'root'
})
export class DirectionsService {
    constructor() {}
    directionsService = new google.maps.DirectionsService();


}
