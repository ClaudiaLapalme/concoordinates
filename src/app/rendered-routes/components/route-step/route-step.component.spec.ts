import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RouteStepComponent } from './route-step.component';

describe('RouteStepComponent', () => {
    let component: RouteStepComponent;
    let fixture: ComponentFixture<RouteStepComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RouteStepComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(RouteStepComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
