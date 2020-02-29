import { 
    async, 
    ComponentFixture, 
    TestBed 
} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IndoorMapComponent } from './indoor-map.component';


describe('IndoorMapComponent', () => {
    let component: IndoorMapComponent;
    let fixture: ComponentFixture<IndoorMapComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [IndoorMapComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(IndoorMapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    // TODO create tests here since calling a function
    // in IndoorMap constructor is disallowed and we have not
    // found a solution to test this component for that reason.
    xit('should create', () => {
        expect(component).toBeTruthy();
    });
});
