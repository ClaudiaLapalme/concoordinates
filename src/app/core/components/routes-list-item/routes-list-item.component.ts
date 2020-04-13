import { Component, Input, OnInit } from '@angular/core';
import { Route, TransportMode } from 'src/app/core/models';

@Component({
    selector: 'app-routes-list-item',
    templateUrl: './routes-list-item.component.html',
    styleUrls: ['./routes-list-item.component.scss']
})
export class RoutesListItemComponent implements OnInit {
    @Input() route: Route;
    @Input() routeNumber: number;
    @Input() routeTransportMode: TransportMode;
    @Input() routeFullDisplay: boolean;

    routeDuration: number;
    constructor() {}

    ngOnInit() {
        if (this.route) {
            this.routeDuration = this.route.computeTotalDuration();
        }
    }
}
