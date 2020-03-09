import { AfterViewInit, Component, ElementRef,  ViewChild, OnInit } from '@angular/core';
import { Route } from '../core/models';
import { MapService } from '../core/services';
import { StateService } from '../shared/state.service';

@Component({
    selector: 'app-rendered-routes',
    templateUrl: './rendered-routes.page.html',
    styleUrls: ['./rendered-routes.page.scss'],
})
export class RenderedRoutesPage implements AfterViewInit, OnInit {

    route: Route;
    @ViewChild('map', { static: false })
    mapElement: ElementRef;
    constructor(private stateService: StateService) { }

    ngAfterViewInit(): void {
        const map = new google.maps.Map(this.mapElement.nativeElement);
        console.log(this.route);
        this.route.display(map);
    }

    ngOnInit() {
        this.route = this.stateService.sharedRoute;
    }

}
