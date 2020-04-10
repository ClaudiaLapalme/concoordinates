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
        if (this.stateService.sharedRoute) {
            this.route = this.stateService.sharedRoute;

            this.routeTransportMode = this.stateService.sharedRoute.transportMode;
            //remove the icon
            this.route.disability = false;
        }
        //testing purpose
        else {
            let routeStep1 = new RouteStep(
                1,
                new Coordinates(1, 2, 0),
                new Coordinates(1, 2, 0),
                null,
                1,
                'instruction one',
                null
            );
            let routeStep2 = new RouteStep(
                1,
                new Coordinates(1, 2, 0),
                new Coordinates(1, 2, 0),
                null,
                1,
                'instruction two',
                null
            );
            let routeSteps = new Array<RouteStep>(
                routeStep1,
                routeStep2,
                routeStep2,
                routeStep2,
                routeStep2,
                routeStep2,
                routeStep2,
                routeStep2,
                routeStep2,
                routeStep2,
                routeStep2,
                routeStep2
            );
            this.route = new OutdoorRoute(
                new Coordinates(1, 2, 0),
                new Coordinates(1, 2, 0),
                null,
                null,
                null,
                routeSteps
            );

            this.route.setCurrentTravelMode(TransportMode.TRANSIT);
        }
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
