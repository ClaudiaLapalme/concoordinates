import { Component, OnInit } from '@angular/core';

export class Route {
    duration: number;
    steps: Array<RouteStep>;
}
export class RouteStep {
    transportMode: string;
    duration: number;
    transitDetails?: string = '';
}
@Component({
    selector: 'app-routes-list',
    templateUrl: './routes-list.component.html',
    styleUrls: ['./routes-list.component.scss']
})
export class RoutesListComponent implements OnInit {
    routes: Array<Route> = [
        {
            duration: 1,
            steps: [
                { transportMode: 'bus', duration: 1, transitDetails: '170' },
                { transportMode: 'walking', duration: 3 },
                { transportMode: 'driving', duration: 10}
            ]
        },
        {
            duration: 1,
            steps: [
                { transportMode: 'bus', duration: 1, transitDetails: '170' },
                { transportMode: 'subway', duration: 1, transitDetails: 'Vendome' },
                { transportMode: 'walking', duration: 3 }
            ]
        }
    ];
    constructor() {}

    ngOnInit() {}
}
