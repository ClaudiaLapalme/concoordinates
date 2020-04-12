import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { IndoorRoute, Route } from '../core/models';
import { MapService } from '../core/services/map.service';
import { StateService } from '../shared/state.service';

@Component({
    selector: 'app-rendered-routes',
    templateUrl: './rendered-routes.page.html',
    styleUrls: ['./rendered-routes.page.scss']
})
export class RenderedRoutesPage implements AfterViewInit, OnInit {

    @Output() changeIndoorMap = new EventEmitter<number>();

    route: Route;

    @ViewChild('map', { static: false })
    mapElement: ElementRef;

    // Reference to the native location button html element
    @ViewChild('userCenter', { read: ElementRef, static: false })
    userCenter: ElementRef;

    @ViewChild('returnToRoutes', { read: ElementRef, static: false })
    returnToRoutes: ElementRef;

    // Reference to the native switch floors buttons html element
    @ViewChild('switchFloor', { read: ElementRef, static: false })
    switchFloor: ElementRef;

    public indoorMapLevel: number;
    public availableFloors: number[];
    public newSelectedFloor: number;
    public indoorMapBuildingCode: string;

    // Map data
    public mapModel: google.maps.Map;

    controlsShown = true;
    mapLoaded = false;

    constructor(
        private stateService: StateService,
        private mapService: MapService
    ) {
        this.indoorMapBuildingCode = 'H';
        this.availableFloors = [9, 8, 1];
    }

    ngAfterViewInit(): void {
        this.mapService.loadMap(this.mapElement).then(mapObj => {
            this.mapModel = mapObj;
            const locationButton = this.userCenter.nativeElement;
            const returnButton = this.returnToRoutes.nativeElement;
            const switchFloorsNE = this.switchFloor.nativeElement;
            this.mapModel.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(locationButton);
            this.mapModel.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(switchFloorsNE);
            this.mapModel.controls[google.maps.ControlPosition.LEFT_TOP].push(returnButton);
            this.mapService.displayRoute(this.mapModel, this.route, this.indoorMapLevel);
            this.mapService.createDestinationMarkers(this.mapModel, this.route);
            this.mapLoaded = true;
        });
    }

    ngOnInit() {
        this.route = this.stateService.sharedRoute;
        this.newSelectedFloor = this.route.startCoordinates.getFloorNumber();
    }

    recenterToUser(): void {
        this.mapService.getUserLocation().then(userLatLng => {
            this.handleRecenter(userLatLng);
        });
    }

    switchFloors(newIndoorMapLevel: number): void {
        this.indoorMapLevel = newIndoorMapLevel;
        // When floors are switched, the polyline needs to be redrawn for an indoor route, if such exists
        if ( this.route instanceof IndoorRoute) {
            this.mapService.displayRoute(this.mapModel, this.route, this.indoorMapLevel);
        }
    }

    handleRecenter(userLatLng): void {
        const latLng: google.maps.LatLng = userLatLng;

        if (latLng !== undefined) {
            this.mapModel.setCenter(latLng);
        } else {
            console.log('the user location is undefined');
        }
    }

    public eraseRoute(): void {
        this.mapService.deleteDestinationMarkers();
    }
}
