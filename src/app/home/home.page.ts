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

    // Reference to the native toggle campus html element
    @ViewChild('toggle', { read: ElementRef, static: false })
    toggle: ElementRef;

    // Reference to the native switch floors buttons html element
    @ViewChild('switchFloor', { read: ElementRef, static: false })
    switchFloor: ElementRef;

    // Map data
    public mapModel: google.maps.Map;
    public mapLoaded: boolean;

    public indoorMapBuildingCode: string;
    public indoorMapLevel: number;
    public availableFloors: number[];

    constructor(
        private mapService: MapService,
    ) {
        this.currentCenter = this.SGW;

        // TODO: Remove initial indoorMap when we will be able to click
        // on the building or zoom in close enough to switch
        // from showing the building overlay to showing indoor maps.
        this.indoorMapBuildingCode = 'H';    // initial buildingCode
        this.availableFloors = [9, 8];  // initial floors available
        this.indoorMapLevel = 9;    // initial floor
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
                this.mapModel = mapObj;     // Set the map reference to this component
                this.mapLoaded = true;      // Necessary to pass mapLoaded to indoor maps after its loaded

                // Toggle buttons
                const toggleButtonNE = this.toggle.nativeElement;
                const switchFloorsNE = this.switchFloor.nativeElement;


                this.mapModel.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(switchFloorsNE);
                this.mapModel.controls[google.maps.ControlPosition.RIGHT_TOP].push(toggleButtonNE);
            });
    }

    switchCampus(): void {
        if (this.currentCenter === this.SGW) {
            this.mapModel.setCenter(this.LOYOLA);
            this.setCurrentCenter(this.LOYOLA);
        } else {
            this.mapModel.setCenter(this.SGW);
            this.setCurrentCenter(this.SGW);
        }
    }

    switchFloors(newIndoorMapLevel: number): void {
        this.indoorMapLevel = newIndoorMapLevel;
    }
}