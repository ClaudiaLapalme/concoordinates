import { Component } from '@angular/core';
import { ILatLng } from './directions.directive';



@Component({
  selector: 'app-directions',
  templateUrl: 'directions.page.html',
  styleUrls: ['directions.page.scss'],
})
export class DirectionsPage {

   // Washington, DC, USA
   origin: ILatLng = {
    latitude: 38.889931,
    longitude: -77.009003
  };
  // New York City, NY, USA
  destination: ILatLng = {
    latitude: 40.730610,
    longitude: -73.935242
  };
  
  displayDirections = false;

  ngAfterViewInit(){
    this.displayDirections = true;
  }
  
  zoom = 14;
  

}
