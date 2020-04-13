import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase/app';
import { stringify } from 'querystring';
import { formatDate } from '@angular/common';
import { auth } from 'firebase/app';

declare let gapi: any;


@Injectable({
    providedIn: 'root',
  })
export class CalendarService {

    private emailUpdatedSource: Subject<void> = new Subject<void>();
    public emailUpdated$: Observable<void> = this.emailUpdatedSource.asObservable();
    private eventUpdatedSource: Subject<void> = new Subject<void>();
    public eventUpdated$: Observable<void> = this.eventUpdatedSource.asObservable();
    signedIn: boolean = false;
    email: string = '';
    picture: string = '';
    eventName: string = '';
    eventLoc: string = '';
    eventTime: string = '';
    user: Promise<void>;
    fromCalendar: boolean = false;

    constructor(public afAuth: AngularFireAuth,
                private platform: Platform,
                private gplus: GooglePlus
    ) { gapi.load('client'); }

    /**
     * Detects the platform being user 
     * and prompts popup accordingly
     */
    getAuth() {
        if (this.platform.is("capacitor")) {
            return this.androidLogin();
        }
        else {
            return this.webLogin();
        }
    }

    /**
     * Google Auth Js Signin
     * for web clients
     */
    webLogin() {   
        gapi.load('client:auth2', ()=>{
        gapi.client.init({
              apiKey: environment.API_KEY,
              clientId: environment.CLIENT_ID,
              discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
              scope: 'https://www.googleapis.com/auth/calendar'
            })
            .then(() => {
                // Prompt sign in
                gapi.auth2.getAuthInstance().signIn()
                .then(async () => {
                      // Set up inital listener on sign in state
                      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
    
                      // Update sign in status upon sign in, update email 
                     await this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
                  })
                  .catch(error =>{
                      console.log(error); //debug
                  });
            }).catch(error =>{
                console.log(error); //debug
            });
        });    
    }

    /**
     * For web login flow
     * Triggered when a change in sign in status occurs
     * in the google client. Populates email in 
     * sidemenu component
     * @param isSignedIn boolean indicating whether user has 
     * Returns true if signed in
     */
    async updateSigninStatus(isSignedIn) : Promise<boolean> {  
        try{
            this.signedIn = isSignedIn;

            if(this.signedIn){
                this.email = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
                this.picture = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getImageUrl();

                await gapi.client.calendar.events.list({
                    'calendarId': 'primary',
                    'timeMin': (new Date()).toISOString(),
                    'showDeleted': false,
                    'singleEvents': true,
                    'maxResults': 10,
                    'orderBy': 'startTime'
                  })
                  .then((response)=>{
                    const formattedTime = formatDate(response.result.items[0].start.dateTime, 'shortTime', 'en-US')
                    this.eventName = response.result.items[0].summary;
                    this.eventLoc = response.result.items[0].location;
                    this.eventTime = formattedTime;
                    this.emailUpdatedSource.next();
                    this.eventUpdatedSource.next();
                });      
                return true;  
            }
        }
        catch{
            console.log('Auth instance not validated yet.'); //debug
        }     
    }

    /**
     * Google Auth Signin popup
     * for android clients
     */
    async androidLogin() {
        try {
            //google plus auth retrieves email, profile picture and an access token
            const gplusUser = await this.gplus.login({
                'webClientId': environment.AF_CLIENT_ID,
                'offline': true,
                'scopes': 'https://www.googleapis.com/auth/calendar'
            })
            
            this.email = gplusUser.email;
            this.picture = gplusUser.imageUrl;
            //authorize call to google calendar api
            await gapi.client.setToken({ access_token: gplusUser.accessToken});
            //retrieve calendar event info
            await gapi.client.load('calendar', 'v3', async () => {                
                await gapi.client.calendar.events.list({
                'calendarId': 'primary',
                'timeMin': (new Date()).toISOString(),
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': 10,
                'orderBy': 'startTime'
              })
              .then((response)=>{
                const formattedTime = formatDate(response.result.items[0].start.dateTime, 'shortTime', 'en-US')
                this.eventName = response.result.items[0].summary;
                this.eventLoc = response.result.items[0].location;
                this.eventTime = formattedTime;
                this.emailUpdatedSource.next();
                this.eventUpdatedSource.next();
            });})
        }  
        catch (err) {
            console.log(err)
        };
    }

    /**
     * Accessors for profile and calendar events info
     */
    getUserEmail(): string {
        return this.email;
    }
    
    getUserPicture(): string {
        return this.picture;
    }

    getEventName() {    
        return this.eventName;
    }

    getEventLocation() {    
        return this.eventLoc;
    }

    getEventTime() {    
        return this.eventTime;
    }

    setIsFromCalendar(fromCal: boolean) {
        this.fromCalendar = fromCal;
    }

    getIsFromCalendar() {
        return this.fromCalendar;
    }
}

