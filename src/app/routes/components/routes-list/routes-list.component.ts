import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Route } from 'src/app/core/models/route';
import { TransportMode } from 'src/app/core/models/transport-mode';
@Component({
    selector: 'app-routes-list',
    templateUrl: './routes-list.component.html',
    styleUrls: ['./routes-list.component.scss']
})
export class RoutesListComponent implements OnInit {
    @Input() routes: Route[];
    @Input() routeTransportMode: TransportMode;
    constructor() {}

    ngOnInit() {        

    }
}
