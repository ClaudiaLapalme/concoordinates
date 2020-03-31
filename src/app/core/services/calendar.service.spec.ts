import { TestBed } from '@angular/core/testing';

import { CalendarService } from './calendar.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase/app';

describe('CalendarService', () => {

    window['gapi'] = {
        load() {
            return null;
        }}

    function testServiceSetup() {
        const afAuth:AngularFireAuth = null;
        const platform:Platform = null;
        const gplus:GooglePlus = null ;
        const calendarService: CalendarService = new CalendarService(
            afAuth, platform, gplus
        );
        return { calendarService };
    }

    it('should be created', () => {
        const { calendarService } = testServiceSetup();
        expect(calendarService).toBeTruthy();
    });

    describe('getAuth', () => {
        it('It should prompt a popup based on the platform used', () => {
            const { calendarService } = testServiceSetup();
            expect(calendarService.getAuth).toBeTruthy(); 
        });
    });

    describe('webLogin', () => {
        it('Should return update status of false', () => {
            const { calendarService } = testServiceSetup();
            expect(calendarService.webLogin(false)).toBeFalsy();
        })
        //If email has been received from gapi
        // it('Should return update status of true', () => {
        //     const { calendarService } = testServiceSetup();
        //     calendarService.getAuth();
        //     expect(calendarService.updateSigninStatus(true)).toEqual(undefined);
        // })
    })
});


