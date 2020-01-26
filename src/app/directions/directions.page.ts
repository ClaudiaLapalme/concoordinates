import { Component } from '@angular/core';



@Component({
  selector: 'app-directions',
  templateUrl: 'directions.page.html',
  styleUrls: ['directions.page.scss'],
})
export class DirectionsPage {

  coordinates = {
    latitude: 45.5581968,
    longitude: -73.870385
  };

  public lat = 24.799448;
  public lng = 120.979021;
  public origin: any;
  public destination: any;

  getDirectionForm(){
    this.origin = { lat: this.coordinates.latitude, lng: this.coordinates.longitude };
    this.destination = { lat: 40.6976637, lng: -74.119764 };
    this.getDirection()
  }

  getDirection() {
  }
  
  ngOnInit() {
    this.origin = { lat: 24.799448, lng: 120.979021 };
    this.destination = { lat: 24.799524, lng: 120.975017 };
    this.getDirection()
  } 
  

}
