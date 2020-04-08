import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RoutesListItemComponent } from './routes-list-item.component';

describe('RoutesListItemComponent', () => {
    let component: RoutesListItemComponent;
    let fixture: ComponentFixture<RoutesListItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RoutesListItemComponent],
            imports: [IonicModule.forRoot()],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(RoutesListItemComponent);
        component = fixture.componentInstance;
        component.route = jasmine.createSpyObj('route', ['computeTotalDuration']);
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should compute route duration', () => {
        component.ngOnInit();
        expect(component.route.computeTotalDuration).toHaveBeenCalled();
    });
});
