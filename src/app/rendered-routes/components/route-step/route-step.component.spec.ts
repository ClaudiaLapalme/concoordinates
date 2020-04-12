import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Transport, TransportMode } from 'src/app/core/models/transport-mode';
import { RouteStepComponent } from './route-step.component';
import { RouteStep, Coordinates } from 'src/app/core';

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
        component.step.instruction = 'instruction';
        component.ngOnInit();
        expect(component.step.getDuration).toHaveBeenCalled();
    });
    it('ngOnInit without step', () => {
        component.ngOnInit();
        expect(component.step).toBeUndefined();
    });
    it('ngonInit test stairs', () => {
        component.step = new RouteStep(
            null,
            new Coordinates(1, 1, 8),
            null,
            null,
            1,
            null,
            new Transport(null, null, TransportMode.STAIRS, null)
        );
        component.nextStep = new RouteStep(
            null,
            new Coordinates(1, 1, 9),
            null,
            null,
            1,
            null,
            new Transport(null, null, TransportMode.WALKING, null)
        );
        component.ngOnInit();
        expect(component.instruction).toBe(
            'Take the stairs from the 8th floor to the 9th floor'
        );
    });
    it('ngonInit test escalator', () => {
        component.step = new RouteStep(
            null,
            new Coordinates(1, 1, 8),
            null,
            null,
            1,
            null,
            new Transport(null, null, TransportMode.ESCALATOR, null)
        );
        component.nextStep = new RouteStep(
            null,
            new Coordinates(1, 1, 9),
            null,
            null,
            1,
            null,
            new Transport(null, null, TransportMode.WALKING, null)
        );
        component.ngOnInit();
        expect(component.instruction).toBe(
            'Take the escalator from the 8th floor to the 9th floor'
        );
    });
    it('ngonInit test elevator', () => {
        component.step = new RouteStep(
            null,
            new Coordinates(1, 1, 8),
            null,
            null,
            1,
            null,
            new Transport(null, null, TransportMode.ELEVATOR, null)
        );
        component.nextStep = new RouteStep(
            null,
            new Coordinates(1, 1, 9),
            null,
            null,
            1,
            null,
            new Transport(null, null, TransportMode.ELEVATOR, null)
        );

        component.ngOnInit();
        expect(component.instruction).toBe(
            'Take the elevator from the 8th floor to the 9th floor'
        );
    });
    it('ngonInit test walking', () => {
        component.step = new RouteStep(
            null,
            new Coordinates(1, 1, 8),
            null,
            null,
            1,
            null,
            new Transport(null, null, TransportMode.WALKING, null)
        );
        component.ngOnInit();
        expect(component.instruction).toBe('Walk along the 8th floor');
    });
});
