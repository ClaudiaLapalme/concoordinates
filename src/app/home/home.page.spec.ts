import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MapService } from '../core/services/map.service';
import { HomePage } from './home.page';
import { ToggleCampusComponent } from '../core/components/toggle-campus/toggle-campus.component';

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
            declarations: [HomePage, ToggleCampusComponent],
            imports: [IonicModule.forRoot()],
            providers: [{ provide: MapService, useClass: MockMapService}]
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
            component.map = mockMap; 
            component.switchCampus();
            expect(component.currentCenter).toEqual(mockLatLng);
        });

        it('current center change from LOY to SGW coordinates', () => {
            const mockLatLng = new google.maps.LatLng(45.4959053, -73.5801141);
            const mockMap = new MockMaps(null);
            component.map = mockMap; 
            component.switchCampus();
            component.switchCampus();
            expect(component.currentCenter).toEqual(mockLatLng);
        });
    });
    
});
