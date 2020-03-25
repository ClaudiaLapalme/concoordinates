import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OutdoorRoute, RouteFactory, TransportMode } from '../core';

@Component({
    selector: 'app-routes',
    templateUrl: './routes.page.html',
    styleUrls: ['./routes.page.scss']
})
export class RoutesPage implements OnInit, OnDestroy {
    /**
     * Form used to generate routes
     *
     * @type {FormGroup}
     */
    form: FormGroup;

    /**
     * Generated routes
     *
     * @type {OutdoorRoute[]}
     */
    routes: OutdoorRoute[];

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


    constructor(private formBuilder: FormBuilder, private routeFactory: RouteFactory) { }

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
            this.routes = await this.routeFactory.generateDefaultRoutes(
                this.form.controls.from.value,
                this.form.controls.to.value,
                date,
                null,
                this.transportMode
            );
        } else {
            this.routes = await this.routeFactory.generateDefaultRoutes(
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
        this.form.controls.from.setValue(event.formatted_address);
    }

    /**
     * Set the value of the to input
     *
     */
    setTo(event: google.maps.places.PlaceResult): void {
        this.form.controls.to.setValue(event.formatted_address);
    }
}
