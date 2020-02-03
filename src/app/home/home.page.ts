import { Component, ElementRef } from '@angular/core';

import { ViewChild } from '@angular/core';

import { ILatLng } from '../models/coordinates';
import { MapService } from '../services/map/map.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage {
    coordinates: ILatLng;
    
    @ViewChild('map', { static: false }) mapElement: ElementRef;
    map: any;
    address: string;

    constructor(private mapService: MapService) {}

    reloadMap() {
        this.mapService.loadMap(
            this.mapElement,
            this.coordinates.latitude,
            this.coordinates.longitude
        );
    }

    ngAfterViewInit() {
        this.mapService.loadMap(this.mapElement);
    }
}
