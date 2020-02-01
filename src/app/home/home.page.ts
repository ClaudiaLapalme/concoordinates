import { Component, ElementRef } from '@angular/core';

import { ViewChild } from '@angular/core'

import { ILatLng } from '../interfaces';
import { MapService } from '../google-apis/map.service';



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
  // google_api: GoogleApiService;

  constructor(
    private mapService: MapService
  ) {
  }
 
  reloadMap() {
    this.mapService.loadMap(this.mapElement,this.coordinates.latitude,this.coordinates.longitude);
  }
  
  ngAfterViewInit() {    
    this.mapService.loadMap(this.mapElement);
  }
 
  

}
