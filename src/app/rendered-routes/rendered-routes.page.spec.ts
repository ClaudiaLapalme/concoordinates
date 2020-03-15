import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RenderedRoutesPage } from './rendered-routes.page';
import { Route, Coordinates, TransportMode } from '../core/models';
import { RouteStep } from '../core/models/route-step';
import { StateService } from '../shared/state.service';
import { CoreModule } from '../core';

describe('RenderedRoutesPage', () => {
    let component: RenderedRoutesPage;
    let fixture: ComponentFixture<RenderedRoutesPage>;

    class MockStateService {
        sharedRoute: Route;
        constructor() {
            let routeStep1 = new RouteStep(
                1,
                new Coordinates(1, 2),
                new Coordinates(1, 2),
                null,
                1,
                'instruction one',
                null
            );
            let routeStep2 = new RouteStep(
                1,
                new Coordinates(1, 2),
                new Coordinates(1, 2),
                null,
                1,
                'instruction two',
                null
            );
            let routeStepsSpy = new Array<RouteStep>(routeStep1, routeStep2);
            this.sharedRoute = new Route(
                new Coordinates(1, 2),
                new Coordinates(1, 2),
                null,
                null,
                null,
                routeStepsSpy
            );
            this.sharedRoute.setCurrentTravelMode(TransportMode.TRANSIT);
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RenderedRoutesPage],
            imports: [IonicModule.forRoot(), CoreModule],
            providers: [{ provide: StateService, useClass: MockStateService }]
        }).compileComponents();

        fixture = TestBed.createComponent(RenderedRoutesPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
