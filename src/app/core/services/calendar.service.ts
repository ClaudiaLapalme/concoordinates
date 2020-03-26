import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';


//Google api object declared as type: any pending call to the gapi library at runtime
declare let gapi: any;

@Injectable()
export class CalendarService {

    private emailUpdatedSource: Subject<void> = new Subject<void>();
    public emailUpdated$: Observable<void> = this.emailUpdatedSource.asObservable();
    signedIn: boolean = false;
    email: string = '';
    picture: string = '';
    user: Promise<void>;


    constructor(public afAuth: AngularFireAuth,
                private platform: Platform,
                private gplus: GooglePlus
        ) { }

    getAuth() {
        //if(thisPlatformIsCapacitor)
        this.androidLogin()
        //else
        //return this.webLogin(new auth.GoogleAuthProvider());  
    }

    webLogin(provider) {
        // works on the browser doesn't work with ionic/android,
        // on mobile: opens up  browser, asks to signin but never redirects back to app
        return this.afAuth.auth.signInWithPopup(provider)
            .then((result) => {
                console.log('You have been successfully logged in!');
                this.email = result.user.email;
                this.picture = result.user.photoURL;
                this.emailUpdatedSource.next();
            }).catch((error) => {
                console.log(error);
            })

        // this might be the way to go but wasn't able to make it work on the browser yet
        // this.afAuth.auth.signInWithRedirect(provider);
    }

    async androidLogin(): Promise<any>{
        try {
            const gplusUser = await this.gplus.login({
                'webClientId': environment.CLIENT_ID,
                'offline': true,
                'scopes': 'profile email'
            })

            return await this.afAuth.auth.signInWithCredential(
                firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
            ).then(function(result) {
                this.email = result.user.email;
                this.picture = result.user.photoURL;
                this.emailUpdatedSource.next();
            }).catch(function(err){
                console.log(err)
            });

        } catch(err) {
            console.log(err)
        }
    }

    /**
     * Triggered when a change in sign in status occurs
     * in the google client. Populates email in 
     * sidemenu component
     * @param isSignedIn boolean indicating whether user has 
     * Returns true if signed in
     */
    updateSigninStatus(isSignedIn): boolean {
        try {
            this.signedIn = isSignedIn;
            if (this.signedIn) {
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

