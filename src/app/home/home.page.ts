import { Component, ElementRef } from '@angular/core';

import { ViewChild } from '@angular/core'
import { GoogleApiService } from '../google-api.service';
import { ILatLng } from '../interfaces';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  coordinates: ILatLng = {
    latitude: 45.5581968,
    longitude: -73.870385
  };

  @ViewChild('map',{static:false}) mapElement: ElementRef;
  map: any;
  address:string;
  google_api: GoogleApiService;

  constructor(
    google_api: GoogleApiService
  ) {
    this.google_api = google_api;
  }
 
  reloadMap() {
    this.google_api.loadMap(this.mapElement,this.coordinates.latitude,this.coordinates.longitude);
  }
  
  ngAfterViewInit() {    
    this.google_api.loadMap(this.mapElement);
  }
 
  

}
