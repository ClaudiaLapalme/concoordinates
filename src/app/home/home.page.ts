import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapService } from '../core';

// TODO move all this map logic to MapPage and keep all Pages as routes from this page
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

    // Reference to the native map html element
    @ViewChild('map', { static: false })
    mapElement: ElementRef;

    // Map data
    map: google.maps.Map;

    constructor(
        private mapService: MapService
    ) { }

    ngOnInit(): void {
        this.loadMap();
    }

    private loadMap(): void {
        this.mapService.loadMap(this.mapElement).then(mapObj => this.map = mapObj);
    }
}
