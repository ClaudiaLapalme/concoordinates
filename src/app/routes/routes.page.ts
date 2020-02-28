import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { RouteFactory } from '../core/services/route-factory';
import { Coordinates } from '../core/models/coordinates';
import { Route } from '../core/models/route';
import { TransportMode } from '../core/models/transport-mode';

@Component({
    selector: 'app-routes',
    templateUrl: './routes.page.html',
    styleUrls: ['./routes.page.scss']
})
export class RoutesPage implements OnInit {
    form: FormGroup;

    routes: Route[];

    transportMode: TransportMode = TransportMode.TRANSIT;

    loading: boolean;

    constructor(private formBuilder: FormBuilder, private routeFactory: RouteFactory) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            from: ['Concordia University'],
            to: ['Cote Vertu'],
            departAt: ['Depart At'],
            time: ['18:00']
        });
        this.getRoutes();
    }

    async getRoutes() {
        this.loading = true;

        let date = new Date();
        let minHours = this.form.value['time'].split(':');
        date.setHours(minHours[0]);
        date.setMinutes(minHours[1]);
        if(this.form.value['departAt'] === 'Depart At'){
            this.routes = await this.routeFactory.generateDefaultRoutes(
                this.form.value['from'],
                this.form.value['to'],
                date,
                null,
                this.transportMode
            );
        }
        else{
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
