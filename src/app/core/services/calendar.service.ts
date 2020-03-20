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

    constructor() { }

  
    /**
     * Load google client using OAuth2, prompt sign in
     * and set up listener to run updateSignInStatus on user
     * sign in
     */
    getAuth() : boolean{   
        gapi.load('client:auth2', ()=>{
        gapi.client.init({
            apiKey: '<API_KEY>',
            clientId: '<CLIENT_ID>',
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            scope: 'https://www.googleapis.com/auth/calendar.readonly'
          })
          .then(() => {
              // Prompt sign in
              gapi.auth2.getAuthInstance().signIn()
              .then(() => {
                    // Set up inital listener on sign in state
                    gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

                    // Update sign in status upon sign in, update email 
                    this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
                    this.emailUpdatedSource.next();
                })
                .catch(error =>{
                    console.log(error); //debug
                });

          }).catch(error =>{
              console.log(error); //debug
          });
        })
        //client loaded and initialized (not necessarily signed in)
        return true
    }

    /**
     * Triggered when a change in sign in status occurs
     * in the google client. Populates email in 
     * sidemenu component
     * @param isSignedIn boolean indicating whether user has 
     * Returns true if signed in
     */
    updateSigninStatus(isSignedIn) : boolean {  
        try{
            this.signedIn = isSignedIn;

            if(this.signedIn){
                this.email = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
                this.picture = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getImageUrl();
                return true;  
            }
        }
        catch{
            console.log('Auth instance not validated yet.'); //debug
        }     
    }
    /**
     * Accessor for email
     */
    getUserEmail(): string {
        return this.email;
    }

    /**
     * Accessor for user google display image
     */
    getUserPicture(): string {
        return this.picture;
    }
}

