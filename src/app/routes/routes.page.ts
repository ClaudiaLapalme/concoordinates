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
    from: string;
    to: string;

    form: FormGroup;

    startCoord = new Coordinates(45.4867157, -73.5772517);
    endCoord = new Coordinates(45.5138, -73.6829);

    routes: Route[];

    transportMode: TransportMode = TransportMode.WALKING;

    loading: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private routeFactory: RouteFactory
    ) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            from: ['Concordia University'],
            to: ['Cote Vertu'],
            departAt: ['Depart At'],
            time: ['18:00']
        });
        this.getRoutes(this.transportMode);
    }

    async getRoutes(transportMode: string) {
        this.loading = true;

        let startTime = new Date(2020, 1, 21, 6, 55, 0);
        this.routes = await this.routeFactory.generateDefaultRoutes(
            this.startCoord,
            this.endCoord,
            startTime,
            null,
            TransportMode[transportMode]
        );
        this.transportMode = TransportMode[transportMode];
        this.loading = false;
    }
}
