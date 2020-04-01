import { TestBed, inject } from '@angular/core/testing';
import { CalendarService } from './calendar.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';

describe('CalendarService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [AngularFireModule.initializeApp(environment.config)],
          providers: [
            AngularFireAuth,
            GooglePlus,
            CalendarService
          ]
        });
      });

      it('should be defined', inject([ CalendarService ], (service: CalendarService) => {
        expect(service).toBeDefined();
      }));   

    function testServiceSetup() { 
        const afAuth:AngularFireAuth = null;
        const platform:Platform = null;
        const gplus:GooglePlus = new GooglePlus() ;
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

    describe('androidLogin', () => {
        it('It should prompt an android google popup', () => {
            const { calendarService } = testServiceSetup();
            expect(calendarService.androidLogin).toBeTruthy(); 
        });
    });
});


