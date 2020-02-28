import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ToggleCampusComponent } from './toggle-campus.component';

describe('ToggleCampusComponent', () => {
    let component: ToggleCampusComponent;
    let fixture: ComponentFixture<ToggleCampusComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ToggleCampusComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ToggleCampusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('isSGWToggle should be true by default', () => {
        expect(component.isSGWToggled).toBeTruthy();
    });

    describe('toggleCampus()', () => {

        it('isSGWToggle should go from true to false', () => {
            component.toggleCampus();
            expect(component.isSGWToggled).toBeFalsy();
        });

        it('isSGWToggle should go from false to true', () => {
            component.toggleCampus();
            component.toggleCampus();
            expect(component.isSGWToggled).toBeTruthy();
        });
    });

});
