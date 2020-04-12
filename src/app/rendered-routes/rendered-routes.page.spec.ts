import { NO_ERRORS_SCHEMA } from '@angular/core';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../core';
import {
    Coordinates,
    OutdoorRoute,
    Transport,
    TransportMode,
} from '../core/models';
import { RouteStep } from '../core/models/route-step';
import { MapService } from '../core/services/map.service';
import { StateService } from '../shared/state.service';
import { RenderedRoutesPage } from './rendered-routes.page';

describe('RenderedRoutesPage', () => {
    let component: RenderedRoutesPage;
    let fixture: ComponentFixture<RenderedRoutesPage>;

    class MockStateService {
        sharedRoute: OutdoorRoute;
        constructor() {
            const mockLine = new mockTransitLine();
            const details = new mockDetails();
            details.line = mockLine;
            let routeStep1 = new RouteStep(
                1,
                new Coordinates(1, 2, 0),
                new Coordinates(1, 2, 0),
                null,
                1,
                'instruction one',
                new Transport(null, null, null, details)
            );
            let routeStep2 = new RouteStep(
                1,
                new Coordinates(1, 2, 0),
                new Coordinates(1, 2, 0),
                null,
                1,
                'instruction two',
                new Transport(null, null, null, details)
            );
            let routeStepsSpy = new Array<RouteStep>(routeStep1, routeStep2);
            this.sharedRoute = new OutdoorRoute(
                new Coordinates(1, 2, 0),
                new Coordinates(1, 2, 0),
                null,
                null,
                null,
                routeStepsSpy
            );
            this.sharedRoute.setCurrentTravelMode(TransportMode.SHUTTLE);
        }
    }

    class mockDetails implements google.maps.TransitDetails {
        arrival_stop: google.maps.TransitStop;
        arrival_time: google.maps.Time;
        departure_stop: google.maps.TransitStop;
        departure_time: google.maps.Time;
        headsign: string;
        headway: number;
        line: google.maps.TransitLine;
        num_stops: number;
    }
    class mockTransitLine implements google.maps.TransitLine {
        agencies: google.maps.TransitAgency[];
        color: string;
        icon: string;
        name: string;
        short_name: string;
        text_color: string;
        url: string;
        vehicle: google.maps.TransitVehicle;
    }
    class MockMaps extends google.maps.Map {
        addListener() {
            return null;
        }
        getZoom(): number {
            return null;
        }
    }

    class MockMapService {
        map: google.maps.Map = new MockMaps(null);
        displayRoute(map: google.maps.Map, route: OutdoorRoute): void {}
        loadMap(): Promise<google.maps.Map<Element>> {
            return new Promise(() => {
                return this.map;
            });
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RenderedRoutesPage],
            imports: [
                IonicModule.forRoot(),
                CoreModule,
                RouterTestingModule.withRoutes([]),
            ],
            providers: [
                { provide: StateService, useClass: MockStateService },
                { provide: MapService, useClass: MockMapService },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(RenderedRoutesPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('veryfying initialization ofngOnInit', () => {
        component.ngOnInit();
        expect(component.displayRoutes).toBe(false);
        expect(component.route.disability).toBe(false);
        expect(component.routeTransportMode).toBe(TransportMode.SHUTTLE);
    });

    describe('handleRecenter(userLatLng)', () => {
        class MockMapsWithLocation extends google.maps.Map {
            setCenter(latLng: google.maps.LatLng): void {}
            getCenter(): google.maps.LatLng {
                return new google.maps.LatLng(4, -7);
            }
        }

        class MockMapsWithoutLocation extends google.maps.Map {
            setCenter(latLng: google.maps.LatLng): void {}
            getCenter(): google.maps.LatLng {
                return new google.maps.LatLng(45.4959053, -73.5801141);
            }
        }

        it("should set the center to the user's location", () => {
            const mockMap = new MockMapsWithLocation(null);
            const latLng = new google.maps.LatLng(4, -7);
            component.mapModel = mockMap;

            component.handleRecenter(latLng);
            expect(component.mapModel.getCenter()).toEqual(latLng);
        });

        it('should return the SGW coordinates when location is off', () => {
            const latLngSGW = new google.maps.LatLng(45.4959053, -73.5801141);
            const mockMap = new MockMapsWithoutLocation(null);
            component.mapModel = mockMap;

            component.handleRecenter(undefined);
            expect(component.mapModel.getCenter()).toEqual(latLngSGW);
        });
    });
    describe('displaying boolean for steps', () => {
        it('revealRoutes() from true to false', () => {
            component.displayRoutes = true;
            expect(component.displayRoutes).toBe(true);
            component.revealRoutes();
            expect(component.displayRoutes).toBe(false);
        });
        it('revealRoutes() from false to true', () => {
            component.displayRoutes = false;
            expect(component.displayRoutes).toBe(false);
            component.revealRoutes();
            expect(component.displayRoutes).toBe(true);
        });
    });
});
