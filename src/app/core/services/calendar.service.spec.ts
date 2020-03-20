import { TestBed } from '@angular/core/testing';

import { CalendarService } from './calendar.service';

describe('CalendarService', () => {

    window['gapi'] = {
        load() {
            return null;
        }}

    function testServiceSetup() {
        const calendarService: CalendarService = new CalendarService();
        return { calendarService };
    }

    it('should be created', () => {
        const { calendarService } = testServiceSetup();
        expect(calendarService).toBeTruthy();
    });

    describe('getAuth', () => {
        it('It should authenticate and initialize the client', () => {
            const { calendarService } = testServiceSetup();
            expect(calendarService.getAuth).toBeTruthy(); 
        });
    });

    describe('updateSigninStatus', () => {
        //If email has not yet been received from gapi
        it('Should return update status of false', () => {
            const { calendarService } = testServiceSetup();
            expect(calendarService.updateSigninStatus(false)).toBeFalsy();
        })
        //If email has been received from gapi
        it('Should return update status of true', () => {
            const { calendarService } = testServiceSetup();
            calendarService.getAuth();
            expect(calendarService.updateSigninStatus(true)).toEqual(undefined);
        })
    })
});


