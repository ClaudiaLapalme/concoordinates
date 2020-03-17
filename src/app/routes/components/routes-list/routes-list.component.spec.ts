import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RoutesListComponent } from './routes-list.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('RoutesListComponent', () => {
    let component: RoutesListComponent;
    let fixture: ComponentFixture<RoutesListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RoutesListComponent],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule.withRoutes([])
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(RoutesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
