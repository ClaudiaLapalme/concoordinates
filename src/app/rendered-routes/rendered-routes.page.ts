import {
    AfterViewInit,
    Component,
    ElementRef,
    ViewChild,
    OnInit
} from '@angular/core';
import {
    Route,
    RouteStep,
    TransportMode,
    Coordinates,
    OutdoorRoute
} from '../core/models';
import { MapService } from '../core/services/map.service';
import { RoutesService } from '../core/services/routes.service';
import { StateService } from '../shared/state.service';

@Component({
    selector: 'app-rendered-routes',
    templateUrl: './rendered-routes.page.html',
    styleUrls: ['./rendered-routes.page.scss']
})
export class RenderedRoutesPage implements AfterViewInit, OnInit {
    route: Route;

    @ViewChild('map', { static: false })
    mapElement: ElementRef;

    // Reference to the native location button html element
    @ViewChild('userCenter', { read: ElementRef, static: false })
    userCenter: ElementRef;

    @ViewChild('menuBar', { read: ElementRef, static: false })
    menuBar: ElementRef;

    // @ViewChild('test', { read: ElementRef, static: false })
    // test: ElementRef;
    // Map data
    public mapModel: google.maps.Map;

    controlsShown = true;

    routeTransportMode: TransportMode;

    displayRoutes: string;
    hideRoutes: string;

    constructor(
        private stateService: StateService,
        private mapService: MapService
    ) {}

    ngAfterViewInit(): void {
        this.mapService.loadMap(this.mapElement).then(mapObj => {
            this.mapModel = mapObj;
            const locationButton = this.userCenter.nativeElement;
            const menuBar = this.menuBar.nativeElement;

            this.mapModel.controls[
                google.maps.ControlPosition.RIGHT_BOTTOM
            ].push(locationButton);
            this.mapModel.controls[google.maps.ControlPosition.TOP_CENTER].push(
                menuBar
            );
            this.mapService.displayRoute(mapObj, this.route);
        });
    }

    ngOnInit() {
        this.route = this.stateService.sharedRoute;

        this.routeTransportMode = this.stateService.sharedRoute.transportMode;
        //remove the icon
        this.route.disability = false;

        // Initial Placement
        this.displayRoutes = 'hidden';
        this.hideRoutes = 'visible';
    }

    // Hides routes
    revealRoutes(): void {
        // hide if visible
        this.displayRoutes = 'visible';
        this.hideRoutes = 'hidden';
    }
    hideRoutesFun(): void {
        this.displayRoutes = 'hidden';
        this.hideRoutes = 'visible';
    }
    recenterToUser(): void {
        this.mapService.getUserLocation().then(userLatLng => {
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
