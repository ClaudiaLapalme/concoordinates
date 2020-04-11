import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RenderedRoutesPage } from './rendered-routes.page';
import { OutdoorRoute, Coordinates, TransportMode } from '../core/models';
import { RouteStep } from '../core/models/route-step';
import { StateService } from '../shared/state.service';
import { MapService } from '../core/services/map.service';
import { CoreModule } from '../core';
import { RouterTestingModule } from '@angular/router/testing';
import { OutdoorPOIFactoryService } from '../core/factories';

describe('RenderedRoutesPage', () => {
    let component: RenderedRoutesPage;
    let fixture: ComponentFixture<RenderedRoutesPage>;

    class MockStateService {
        sharedRoute: OutdoorRoute;
        constructor() {
            let routeStep1 = new RouteStep(
                1,
                new Coordinates(1, 2, 0),
                new Coordinates(1, 2, 0),
                null,
                1,
                'instruction one',
                null
            );
            let routeStep2 = new RouteStep(
                1,
                new Coordinates(1, 2, 0),
                new Coordinates(1, 2, 0),
                null,
                1,
                'instruction two',
                null
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
            this.sharedRoute.setCurrentTravelMode(TransportMode.TRANSIT);
        }
    }

    class MockMaps extends google.maps.Map {
        addListener() {
            return null;
        }
        getZoom(): number {
            return null;
        }
    }

    class MockOutdoorPOIFactoryService extends OutdoorPOIFactoryService {
        setMapService() {
            this['mapService'] = jasmine.createSpyObj('MapService', [
                'loadIndoorMaps'
            ]);
        }
    }

    const abstractPOIFactoryService = jasmine.createSpyObj('AbstractPOIFactoryService', [
        'createOutdoorPOIFactory',
        'createIndoorPOIFactory'
    ]);

    abstractPOIFactoryService.createOutdoorPOIFactory.and.returnValue(new MockOutdoorPOIFactoryService);

    class MockMapService extends MapService {
        constructor(){
            super(null, null, null, abstractPOIFactoryService, null, null);
        }
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
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                { provide: StateService, useClass: MockStateService },
                { provide: MapService, useClass: MockMapService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(RenderedRoutesPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
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
});
