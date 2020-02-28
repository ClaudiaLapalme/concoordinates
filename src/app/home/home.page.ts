import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MapService } from '../core';

// TODO move all this map logic to MapPage and keep all Pages as routes from this page
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements AfterViewInit {

    readonly SGW: google.maps.LatLng = new google.maps.LatLng(45.4959053, -73.5801141);
    readonly LOYOLA: google.maps.LatLng = new google.maps.LatLng(45.4582, -73.6405);
    currentCenter: google.maps.LatLng;

    // Reference to the native map html element
    @ViewChild('map', { static: false })
    mapElement: ElementRef;

    @ViewChild('toggle', { read: ElementRef, static: false })
    toggle: ElementRef;

    // Map data
    map: google.maps.Map;

    constructor(
        private mapService: MapService,
    ) { 
        this.currentCenter = this.SGW;
    }

    ngAfterViewInit(): void {
        this.loadMap();
    }
    
    setCurrentCenter(newCenter: google.maps.LatLng): void {
        this.currentCenter = newCenter;
    }    

    private loadMap(): void {
        this.mapService.loadMap(this.mapElement)
            .then(mapObj => {
                this.map = mapObj;

                let toggleButton = this.toggle.nativeElement;

                this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(toggleButton);
            });
    }

    switchCampus(): void {
        if (this.currentCenter === this.SGW) {
            this.map.setCenter(this.LOYOLA);
            this.setCurrentCenter(this.LOYOLA);
        } else {
            this.map.setCenter(this.SGW);
            this.setCurrentCenter(this.SGW);
        }
    }
}
