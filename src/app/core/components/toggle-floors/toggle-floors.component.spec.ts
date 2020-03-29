import { 
    async, 
    ComponentFixture, 
    TestBed 
} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ToggleFloorsComponent } from './toggle-floors.component';

describe('ToggleFloorsComponent', () => {
    let component: ToggleFloorsComponent;
    let fixture: ComponentFixture<ToggleFloorsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ToggleFloorsComponent],
            imports: [IonicModule.forRoot()]
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
            expect(component._selectedFloor).toBe(4);
            component.selectFloor(10);
            expect(component._selectedFloor).toBe(10);
        });
    });
});
