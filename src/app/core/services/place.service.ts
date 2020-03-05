import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PlaceService {

  private googlePlacesService: google.maps.places.PlacesService;
  private placeResult: google.maps.places.PlaceResult;

  private eventEmitter = new BehaviorSubject(this.placeResult);
  public placeResultObservable = this.eventEmitter.asObservable();

  constructor(mapRef: google.maps.Map<Element>) { 

    this.googlePlacesService = new google.maps.places.PlacesService(mapRef);
  }

  public displayBuildingInformation(buildingInformation: google.maps.places.PlaceDetailsRequest){

    this.googlePlacesService.getDetails(buildingInformation, function(place, status) {

      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.eventEmitter = place;
      }
    });  
  }
}
