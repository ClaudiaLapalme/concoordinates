import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PlaceService {

  private googlePlacesService: google.maps.places.PlacesService;
  private placeResult: google.maps.places.PlaceResult;

  private eventEmitter = new BehaviorSubject([]);
  public placeResultObservable = this.eventEmitter.asObservable();

  constructor() {}

  public displayBuildingInformation(buildingInformation: google.maps.places.PlaceDetailsRequest, buildingName: string){

    this.googlePlacesService.getDetails(buildingInformation, (result, status) => {
      
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.eventEmitter.next([result, buildingName]);
      }
    });  
    
  }

  public setService(mapRef: google.maps.Map<Element>): void{
    this.googlePlacesService = new google.maps.places.PlacesService(mapRef);
  }
}
