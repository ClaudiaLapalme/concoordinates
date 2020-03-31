import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase/app';
declare var gapi: any;

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

    /**
     * Detects the platform being user 
     * and prompts popup accordingly
     */
    getAuth() {
        if(this.platform.is("capacitor")) {
            return this.androidLogin();
        }
        else{
            return this.webLogin(new firebase.auth.GoogleAuthProvider());  
        }
    }

    /**
     * Google Auth Signin popup
     * for web clients
     */
    webLogin(provider) {
        console.log('in webLogin()') //debug
        this.afAuth.auth.signInWithPopup(provider)
            .then((result) => {
                this.email = result.user.email;
                this.emailUpdatedSource.next();
            }).catch((error) => {
                console.log(error); //debug
            })
    }

    /**
     * Google Auth Signin popup
     * for android clients
     */
    async androidLogin() {

        console.log('in androidLogin()')
        try {
            var result = await this.gplus.login({
                'webClientId': environment.CLIENT_ID,
                'offline': true,
                'scopes': 'email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events'
            })
            this.email = result.email;
            this.emailUpdatedSource.next();
        } catch(err) {
            console.log(err)
        }
    }

    /**
     * Accessor for email
     */
    getUserEmail(): string {
        return this.email;
    }
}

