import { Injectable } from '@angular/core';
declare let gapi: any;

@Injectable()
export class CalendarService {

// will need to be hidden somewhere eventually
readonly CLIENT_ID = '292731723309-5v2g441g50u2ur5hf5k09c4drc1k74vj.apps.googleusercontent.com';  
readonly API_KEY = 'AIzaSyBJTreK-eH9Y0gsoaStxOmj-ks4hnEBxLo';
readonly DISCOVERY_DOCS = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
readonly SCOPE = 'https://www.googleapis.com/auth/calendar.readonly';

public getCalendar(){
  gapi.load('client:auth2', this.initClient);
  gapi.auth2.getAuthInstance().signIn();
}

private initClient(): void {
  gapi.auth2.init({
    apiKey: this.API_KEY,
    clientId: this.CLIENT_ID,
    discoveryDocs: this.DISCOVERY_DOCS,
    scope: this.SCOPE
  });
}
}
