import {
    AfterViewInit,
    Component,
    ElementRef,
    ViewChild,
    OnInit,
} from '@angular/core';
import { Route, TransportMode } from '../core/models';
import { MapService } from '../core/services/map.service';
import { StateService } from '../shared/state.service';

@Component({
    selector: 'app-rendered-routes',
    templateUrl: './rendered-routes.page.html',
    styleUrls: ['./rendered-routes.page.scss'],
})
export class RenderedRoutesPage implements AfterViewInit, OnInit {
    route: Route;

    @ViewChild('map', { static: false })
    mapElement: ElementRef;

    // Reference to the native location button html element
    @ViewChild('userCenter', { read: ElementRef, static: false })
    userCenter: ElementRef;

    // Displays all steps
    @ViewChild('stepsDisplay', { read: ElementRef, static: false })
    stepsDisplay: ElementRef;

    public mapModel: google.maps.Map;

    controlsShown = true;

    routeTransportMode: TransportMode;

    displayRoutes: boolean;

    constructor(
        private stateService: StateService,
        private mapService: MapService
    ) {}

    ngAfterViewInit(): void {
        this.mapService.loadMap(this.mapElement).then((mapObj) => {
            this.mapModel = mapObj;
            const locationButton = this.userCenter.nativeElement;

            // places all the html related to steps
            const entireStepsElement = this.stepsDisplay.nativeElement;

            this.mapModel.controls[
                google.maps.ControlPosition.RIGHT_BOTTOM
            ].push(locationButton);
            this.mapModel.controls[google.maps.ControlPosition.TOP_CENTER].push(
                entireStepsElement
            );
            this.mapService.displayRoute(mapObj, this.route);
        });
    }

    ngOnInit() {
        // If there is a service with a route provided by the state service assign attributes
        if (this.stateService.sharedRoute) {
            this.route = this.stateService.sharedRoute;

            this.routeTransportMode = this.stateService.sharedRoute.transportMode;

            // remove the icon
            this.route.disability = false;

            // Initial Placement
            this.displayRoutes = false;
        }
    }

    // Hides routes
    revealRoutes(): void {
        // hide if visible
        this.displayRoutes = !this.displayRoutes;
    }

    recenterToUser(): void {
        this.mapService.getUserLocation().then((userLatLng) => {
            this.handleRecenter(userLatLng);
        });
    }

    handleRecenter(userLatLng): void {
        const latLng: google.maps.LatLng = userLatLng;

        if (latLng !== undefined) {
            this.mapModel.setCenter(latLng);
        } else {
            console.log('the user location is undefined');
        }
    }
}
