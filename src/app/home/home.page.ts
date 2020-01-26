import { Component, ElementRef } from '@angular/core';

import { ViewChild } from '@angular/core'
import { GoogleApiService } from '../google-api.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('map',{static:false}) mapElement: ElementRef;
  map: any;
  address:string;
  google_api: GoogleApiService;

  constructor(
    google_api: GoogleApiService
  ) {
    this.google_api = google_api;
  }
 
 
  ngAfterViewInit() {
    this.google_api.loadMap(this.mapElement);
  }
 
  

}
