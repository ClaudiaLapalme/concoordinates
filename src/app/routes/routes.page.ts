import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, RouteFactory, TransportMode } from '../core';

@Component({
    selector: 'app-routes',
    templateUrl: './routes.page.html',
    styleUrls: ['./routes.page.scss']
})
export class RoutesPage implements OnInit {
    form: FormGroup;
    routes: Route[];
    transportMode: TransportMode;
    loading: boolean;

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
    }

    async getRoutes() {
        if (!this.transportMode) {
            this.transportMode = TransportMode.TRANSIT;
        }
        this.loading = true;
        const date = new Date();
        const minHours = this.form.value['time'].split(':');
        date.setHours(minHours[0]);
        date.setMinutes(minHours[1]);
        if (this.form.value['departAt'] === 'Depart At') {
            this.routes = await this.routeFactory.generateDefaultRoutes(
                this.form.value['from'],
                this.form.value['to'],
                date,
                null,
                this.transportMode
            );
        } else {
            this.routes = await this.routeFactory.generateDefaultRoutes(
                this.form.value['from'],
                this.form.value['to'],
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
}
