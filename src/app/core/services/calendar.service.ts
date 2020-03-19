import { Injectable } from '@angular/core';
import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

declare let gapi: any;

@Injectable()
export class CalendarService {
  
    private emailUpdatedSource = new Subject<void>();
    public emailUpdated$ = this.emailUpdatedSource.asObservable();
    signedIn: boolean = false;
    email: string = '';
    picture: string = '';
    gapi: any;

  getAuth() {   
     gapi.load('client:auth2', ()=>{
     gapi.client.init({
        apiKey: '<API_KEY>',
        clientId: '<CLIENT_ID>',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar.readonly'
      })
    
      .then(() => {
        
        // Prompt sign in
        gapi.auth2.getAuthInstance().signIn();

        
        // Set up inital listener on sign in state
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

        // Update sign in status upon sign in
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        
      }).catch(error =>{
        console.log(error);
      });
    })
  }

  updateSigninStatus(isSignedIn) {  
      this.signedIn = isSignedIn;
      // Just testing out getting events from the calendar
      try{
      
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then((response) =>  {
          var events = response.result.items;
        
          if(this.signedIn){
            this.email = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
            this.picture = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getImageUrl();
            this.emailUpdatedSource.next();
            console.log("event emitted")
          } 
        });
      }
      catch{
        console.log('cannot log auth instance');
      }
  }
  
  getUserEmail() {
    return this.email;
  }

  getUserPicture() {
    console.log("inside getUserPicture(). Picture URL: ", this.picture)
    return this.picture;
  }
}

//jons client ID
// 285078470897-kq3dv01araf42l6m28bquflo3upbdgn3.apps.googleusercontent.com

//jons api key
// AIzaSyDw0wQwrQmCGX0Oor2I8D4zgbItoiHowmw