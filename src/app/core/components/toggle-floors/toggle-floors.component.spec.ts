import { 
    async, 
    ComponentFixture, 
    TestBed 
} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ToggleFloorsComponent } from './toggle-floors.component';
import { MapService } from '../../services';
import { OutdoorPOIFactoryService } from '../../factories';

describe('ToggleFloorsComponent', () => {
    let component: ToggleFloorsComponent;
    let fixture: ComponentFixture<ToggleFloorsComponent>;

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
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ToggleFloorsComponent],
            imports: [IonicModule.forRoot()],
            providers: [
                { provide: MapService, useClass: MockMapService }
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ToggleFloorsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('selectFloor', () => {

        it('should change selectedFloor', () => {
            component.selectFloor(4);
            expect(component.selectedFloorLevel).toBe(4);
            component.selectFloor(10);
            expect(component.selectedFloorLevel).toBe(10);
        });
    });
});
