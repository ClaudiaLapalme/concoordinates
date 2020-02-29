import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MapService } from '../core';

// TODO move all this map logic to MapPage and keep all Pages as routes from this page
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements AfterViewInit {
    // Reference to the native map html element
    @ViewChild('map', { static: false })
    mapElement: ElementRef;

    @ViewChild('directions', { read: ElementRef, static: false })
    directionsButton: ElementRef;

    // Map data
    map: google.maps.Map;

    constructor(private mapService: MapService) {}

    ngAfterViewInit(): void {
        this.loadMap();
    }

    private loadMap(): void {
        this.mapService.loadMap(this.mapElement).then(mapObj => {
           this.map = mapObj;

            let directionsButton = this.directionsButton.nativeElement;

            this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(directionsButton);
        });
    }
}
