import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route, TransportMode } from 'src/app/core';
import { StateService } from 'src/app/shared/state.service';

@Component({
    selector: 'app-routes-list',
    templateUrl: './routes-list.component.html',
    styleUrls: ['./routes-list.component.scss']
})
export class RoutesListComponent implements OnInit {
    @Input() routes: Route[];
    @Input() routeTransportMode: TransportMode;
    constructor(private router: Router, private stateService: StateService) {}

    ngOnInit() {}
    displayRoute(i: number) {
        this.stateService.sharedRoute = this.routes[i];

        // TODO get Transport Object
        this.stateService.sharedRoute.setCurrentTravelMode(
            this.routeTransportMode
        );
        this.router.navigateByUrl('rendered-routes');
    }
}
