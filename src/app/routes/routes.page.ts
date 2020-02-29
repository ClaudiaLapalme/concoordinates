import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TransportMode, Route, RouteFactory } from '../core';

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

    constructor(private formBuilder: FormBuilder, private routeFactory: RouteFactory) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            from: [''],
            to: [''],
            departAt: ['Depart At'],
            time: ['18:00']
        });
    }

    async getRoutes() {
        if(!this.transportMode){
            this.transportMode = TransportMode.TRANSIT;
        }
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
