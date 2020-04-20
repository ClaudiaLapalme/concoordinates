import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CalendarService, Coordinates, PlaceService, Route, RouteFactory, TransportMode, SessionService } from '../core';
import { IndoorFunctionsService } from '../shared/indoor-functions.service';


@Component({
    selector: 'app-routes',
    templateUrl: './routes.page.html',
    styleUrls: ['./routes.page.scss'],
    providers: [CalendarService],
})
export class RoutesPage implements OnInit, AfterViewInit, OnDestroy {

    /**
     * Form used to generate routes
     *
     * @type {FormGroup}
     */
    form: FormGroup;

    /**
     * Generated routes
     *
     * @type {Route[]}
     */
    routes: Route[];

    /**
     * Route tranport mode
     *
     * @type {TransportMode}
     */
    transportMode: TransportMode;

    /**
     * Set to true while getting different routes
     *
     * @type {boolean}
     */
    loading: boolean;

    /**
     *
     *
     * @private
     * @type {Subscription}
     */

    private subscription: Subscription;
    isFromCalendar: boolean;
    eventFrom: string;
    eventTo: string;

    constructor(private formBuilder: FormBuilder,
                private routeFactory: RouteFactory,
                public placesService: PlaceService,
                public router: Router,
                public indoorFunctionsService: IndoorFunctionsService,
                public sessionService: SessionService) {
                    
                }

    ngOnInit() {
        const currentTime = new Date(Date.now());
        const hourMinutes = currentTime.getHours() + ':' + currentTime.getMinutes();

        this.form = this.formBuilder.group({
            from: ['', Validators.required],
            to: ['', Validators.required],
            departAt: ['Depart At'],
            time: [hourMinutes]
        });

        // Calls getRoutes only when form is valid
        this.subscription = this.form.valueChanges
            .subscribe(() => {
                if (this.form.valid) {
                    this.getRoutes();
                }
            });
    
        if (this.sessionService.areNavigationParamsLoaded()) {
            const navigationParams = this.sessionService.getNavigationParams();
            this.isFromCalendar = navigationParams.isRouteToEvent;
            this.eventFrom = 'H801';
            this.eventTo = navigationParams.location;
            this.sessionService.clearNavigationParams();
        }
    }

    ngAfterViewInit() {
        try {
            this.eventTo = this.eventTo.toLocaleUpperCase().replace(/\s/g, '');
        } catch {}

        if (this.isFromCalendar) {

            this.setToPlace(this.eventTo);
            this.setFromPlace(this.eventFrom);
            this.isFromCalendar = false;
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    async getRoutes() {
        if (!this.transportMode) {
            this.transportMode = TransportMode.TRANSIT;
        }
        this.loading = true;
        const date = new Date();
        const minHours = this.form.controls.time.value.split(':');
        date.setHours(minHours[0]);
        date.setMinutes(minHours[1]);

        if (this.form.controls.departAt.value === 'Depart At') {
            this.routes = await this.routeFactory.getRoutes(
                this.form.controls.from.value,
                this.form.controls.to.value,
                date,
                null,
                this.transportMode
            );
        } else {
            this.routes = await this.routeFactory.getRoutes(
                this.form.controls.from.value,
                this.form.controls.to.value,
                null,
                date,
                this.transportMode
            );
        }
        this.loading = false;
    }

    setTransportMode(transportMode: string): void {
        this.transportMode = TransportMode[transportMode];
        this.getRoutes();
    }
    /**
     * Set the value of the from input
     *
     */
    setFrom(event: google.maps.places.PlaceResult): void {
        this.form.controls.from.setValue(event);
    }

    setFromPlace(place: string) {
        place = place.toLocaleUpperCase().replace(/\s/g, ''); // all caps no spaces
        const coordinate: Coordinates = this.indoorFunctionsService.getIndoorCoordinate(place);
        const placeObj = {
            name: place,
            formatted_address: place,
            geometry: {
                location: new google.maps.LatLng(coordinate.getLatitude(), coordinate.getLongitude()),
                viewport: null,
            }
        } as google.maps.places.PlaceResult;
        this.form.controls.from.setValue(placeObj);
    }
    /**
     * Set the value of the to input
     *
     */
    setTo(event: google.maps.places.PlaceResult): void {
        this.form.controls.to.setValue(event);
    }

    setToPlace(place: string): void {
        const coordinate: Coordinates = this.indoorFunctionsService.getIndoorCoordinate(place);
        const placeObj = {
            name: place,
            formatted_address: place,
            geometry: {
                location: new google.maps.LatLng(coordinate.getLatitude(), coordinate.getLongitude()),
                viewport: null,
            }
        } as google.maps.places.PlaceResult;
        this.form.controls.to.setValue(placeObj);
    }
}
