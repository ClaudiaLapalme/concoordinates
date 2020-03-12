import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { CoreModule } from '../core';
import { MapService } from '../core/services/';
import { HomePage } from './home.page';

describe('HomePage', () => {
    let component: HomePage;
    let fixture: ComponentFixture<HomePage>;

    beforeEach(async(() => {

        class MockMapService {
            loadMap(): Promise<google.maps.Map<Element>> {
                return new Promise(() => { });
            }
        }

        TestBed.configureTestingModule({
            declarations: [
                HomePage],
            imports: [
                IonicModule.forRoot(),
                RouterModule,
                CoreModule,
                RouterTestingModule.withRoutes([])],
            providers: [
                { provide: MapService, useClass: MockMapService }
            ],
            schemas: [
                NO_ERRORS_SCHEMA,
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HomePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('switchCampus()', () => {

        class MockMaps extends google.maps.Map {
            setCenter(): void { }
        }

        it('current center should default to SGW coordinates', () => {
            const mockLatLng = new google.maps.LatLng(45.4959053, -73.5801141);
            expect(component.currentCenter).toEqual(mockLatLng);
        });

        it('current center should change from SGW to LOY coordinates', () => {
            const mockLatLng = new google.maps.LatLng(45.4582, -73.6405);
            const mockMap = new MockMaps(null);
            component.mapModel = mockMap;
            component.switchCampus();
            expect(component.currentCenter).toEqual(mockLatLng);
        });

        it('current center change from LOY to SGW coordinates', () => {
            const mockLatLng = new google.maps.LatLng(45.4959053, -73.5801141);
            const mockMap = new MockMaps(null);
            component.mapModel = mockMap;
            component.switchCampus();
            component.switchCampus();
            expect(component.currentCenter).toEqual(mockLatLng);
        });
    });

    describe('switchFloors()', () => {

        it('should set a new indoorMapLevel', () => {
            component.switchFloors(5);
            expect(component.indoorMapLevel).toEqual(5);
            component.switchFloors(10);
            expect(component.indoorMapLevel).toEqual(10);
        });
    });

    describe('handleRecenter(userLatLng)', () => {
        class MockMapsWithLocation extends google.maps.Map {
            setCenter(latLng: google.maps.LatLng): void { };
            getCenter(): google.maps.LatLng { return new google.maps.LatLng(4, -7); };
        }

        class MockMapsWithoutLocation extends google.maps.Map {
            setCenter(latLng: google.maps.LatLng): void { };
            getCenter(): google.maps.LatLng { return new google.maps.LatLng(45.4959053, -73.5801141); };
        }

        it('should set the center to the user\'s location', () => {
            const mockMap = new MockMapsWithLocation(null);
            const latLng = new google.maps.LatLng(4, -7);
            component.mapModel = mockMap;

            component.handleRecenter(latLng);
            expect(component.mapModel.getCenter()).toEqual(latLng);
        })

        it('should return the SGW coordinates when location is off', () => {
            const latLngSGW = new google.maps.LatLng(45.4959053, -73.5801141);
            const mockMap = new MockMapsWithoutLocation(null);
            component.mapModel = mockMap;

            component.handleRecenter(undefined);
            expect(component.mapModel.getCenter()).toEqual(latLngSGW);
        })
    })

});
