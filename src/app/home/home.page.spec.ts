import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MapService } from '../core/services/map.service';
import { HomePage } from './home.page';
import { ToggleCampusComponent } from '../core/components/toggle-campus/toggle-campus.component';
import { ToggleFloorsComponent } from '../core/components/toggle-floors/toggle-floors.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

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
                HomePage,
                ToggleCampusComponent,
                ToggleFloorsComponent,
            ],
            imports: [IonicModule.forRoot()],
            providers: [{ provide: MapService, useClass: MockMapService }],
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

});
