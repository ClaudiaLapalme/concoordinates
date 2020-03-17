import { Injectable } from '@angular/core';
declare let gapi: any;

@Injectable()
export class CalendarService {

  email: any;
    gapi: any;

  getAuth() : Promise<string>{
    
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

        this.email = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();

      }).catch(error =>{
        console.log(error);

      });
    });

    return this.email;
  }

  updateSigninStatus(isSignedIn): void {
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

        console.log(events);

      });

    }
    catch{
      console.log('cannot log auth instance');
    }
       
    if (isSignedIn) {
      console.log('signed in')    
    } 

    else {
      console.log('not signed in')
    }
  }
}



//jons client ID
// 285078470897-kq3dv01araf42l6m28bquflo3upbdgn3.apps.googleusercontent.com

//jons api key
// AIzaSyDw0wQwrQmCGX0Oor2I8D4zgbItoiHowmw