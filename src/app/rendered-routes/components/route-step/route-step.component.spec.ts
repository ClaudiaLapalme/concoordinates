import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RouteStepComponent } from './route-step.component';

describe('RouteStepComponent', () => {
    let component: RouteStepComponent;
    let fixture: ComponentFixture<RouteStepComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RouteStepComponent],
            imports: [IonicModule.forRoot()],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(RouteStepComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('ngOnInit with step', () => {
        component.step = jasmine.createSpyObj('step', ['getDuration']);
        component.ngOnInit();
        expect(component.step.getDuration).toHaveBeenCalled();
    });
    it('ngOnInit without step', () => {
        component.ngOnInit();
        expect(component.step).toBeUndefined();
    });
});
