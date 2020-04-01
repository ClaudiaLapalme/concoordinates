import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CoreModule } from '../../../core';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SideMenuComponent } from './side-menu.component';
import { CalendarService } from '../../services/calendar.service';
import { environment } from 'src/environments/environment';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';


describe('SideMenuComponent', () => {

    let component: SideMenuComponent;
    let fixture: ComponentFixture<SideMenuComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                SideMenuComponent
            ],
            imports: [

                AngularFireModule.initializeApp(environment.config),
                IonicModule,
                RouterModule,
                CoreModule,
                RouterTestingModule.withRoutes([])],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
            providers: [
                AngularFireAuth,
                GooglePlus,
                CalendarService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SideMenuComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    }));

    const calendarServiceSpy = jasmine.createSpyObj('CalendarService', [
        'getAuth',
        'updateSigninStatus',
        'getUserEmail'
    ]);

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

    describe('authCalendarUser()', () => {
        it('should call this.calendarService.getAuth()', () => {
            component.authCalendarUser();
            expect(!calendarServiceSpy.getAuth()).toBeTruthy();
        });
    });

    describe('insertGoogleUserInfo()', () => {
        it('should insert Google User info into the side menu', () => {
            component.insertGoogleUserInfo();
            expect(document.getElementById('loggedInEmail').innerHTML == '').toBeTruthy();
        });
    });
});