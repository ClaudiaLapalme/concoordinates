import { 
    async, 
    ComponentFixture, 
    TestBed 
} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MapService } from '../../services';
import { ToggleCampusComponent } from './toggle-campus.component';
import { OutdoorPOIFactoryService } from '../../factories';

describe('ToggleCampusComponent', () => {
    let component: ToggleCampusComponent;
    let fixture: ComponentFixture<ToggleCampusComponent>;

    class MockOutdoorPOIFactoryService extends OutdoorPOIFactoryService {
        setMapService() {
            this['mapService'] = jasmine.createSpyObj('PlaceService', [
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
        constructor() {
            super(null, null, null, abstractPOIFactoryService, null, null);
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ToggleCampusComponent],
            imports: [IonicModule.forRoot()],
            providers: [
                { provide: MapService, useClass: MockMapService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ToggleCampusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('campusSelection()', () => {

        it('selectedCampus = SelectedCampus.NONE', () => {
            component.campusSelection(0);
            expect(component.selectedCampus).toEqual(0);
        });

        it('selectedCampus = SelectedCampus.SGW', () => {
            component.campusSelection(1);
            expect(component.selectedCampus).toEqual(1);
        });

        it('selectedCampus = SelectedCampus.LOY', () => {
            component.campusSelection(2);
            expect(component.selectedCampus).toEqual(2);
        });

    });

    describe('selectSGW()', () => {

        it('should change selectedCampus to SGW', () => {
            component.selectSGW();
            expect(component.selectedCampus).toEqual(1);
        });

        it('should changed selectedCampus to LOY', () => {
            component.selectLOY();
            expect(component.selectedCampus).toEqual(2);
        });

    });

});
