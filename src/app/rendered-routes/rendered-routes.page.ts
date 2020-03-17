import {
    AfterViewInit,
    Component,
    ElementRef,
    ViewChild,
    OnInit
} from '@angular/core';
import { OutdoorRoute } from '../core/models';
import { MapService } from '../core/services/map.service';
import { RoutesService } from '../core/services/routes.service';
import { StateService } from '../shared/state.service';

@Component({
    selector: 'app-rendered-routes',
    templateUrl: './rendered-routes.page.html',
    styleUrls: ['./rendered-routes.page.scss']
})
export class RenderedRoutesPage implements AfterViewInit, OnInit {
    route: OutdoorRoute;
    @ViewChild('map', { static: false })
    mapElement: ElementRef;
    constructor(
        private stateService: StateService,
        private mapService: MapService
    ) {}

    ngAfterViewInit(): void {
        this.mapService.displayRoute(this.mapElement, this.route);
    }

    ngOnInit() {
        this.route = this.stateService.sharedRoute;
    }
}
