import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OutdoorRoute, RouteFactory, TransportMode } from '../core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-routes',
    templateUrl: './routes.page.html',
    styleUrls: ['./routes.page.scss']
})
export class RoutesPage implements OnInit, OnDestroy {
    form: FormGroup;
    routes: OutdoorRoute[];
    transportMode: TransportMode;
    loading: boolean;
    onDestroy = new Subject<void>();


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
        this.form.statusChanges
            .pipe(takeUntil((this.onDestroy = new Subject<void>())))
            .subscribe((res) => {
                if (res === 'VALID') {
                    this.getRoutes();
                }
            });
    }

    ngOnDestroy() {
        this.onDestroy.next();
        this.onDestroy.complete();
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

    setTransportMode(transportMode: string) {
        this.transportMode = TransportMode[transportMode];
        this.getRoutes();
    }

    submit() {
        this.getRoutes();
    }

    setFrom(event: google.maps.places.PlaceResult) {
        this.form.controls.from.setValue(event.formatted_address);
    }

    setTo(event: any) {
        this.form.controls.to.setValue(event.formatted_address);
    }
}
