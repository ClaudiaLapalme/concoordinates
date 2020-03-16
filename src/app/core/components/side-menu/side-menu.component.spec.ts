import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CoreModule } from '../../../core';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SideMenuComponent } from './side-menu.component';

describe('SettingsComponent', () => {

    let component: SideMenuComponent;
    let fixture: ComponentFixture<SideMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
              SideMenuComponent],
            imports: [
                IonicModule.forRoot(),
                RouterModule,
                CoreModule,
                RouterTestingModule.withRoutes([])],
            schemas: [
                NO_ERRORS_SCHEMA,
            ]
        }).compileComponents();


        fixture = TestBed.createComponent(SideMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('openSettings()', () => {
        it('should open the settings', () => {
            component.openSettings();

            expect(component.showMenu).toBeFalsy();
            expect(component.showSettings).toBeTruthy();
        });
    });

    describe('closeSettings()', () => {
        it('should open the settings', () => {
            component.closeSettings();

            expect(component.showSettings).toBeFalsy();
            expect(component.showMenu).toBeTruthy();
        });
    });


});