import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PlaceService {

  private googlePlacesService: google.maps.places.PlacesService;

  private placeResult = new BehaviorSubject([]);
  public placeResultObservable = this.placeResult.asObservable();

  constructor() {}

  public setService(mapRef: google.maps.Map<Element>): void{
    this.googlePlacesService = new google.maps.places.PlacesService(mapRef);
  }

  /**
   * This function is called whenever a building outline is clicked.
   * Updates the observable so that the BuildingComponent can receives the data.
   * @param buildingInformation
   * @param buildingName 
   * @param buildingPicture 
   */
  public displayBuildingInformation(buildingInformation: google.maps.places.PlaceDetailsRequest, buildingName: string, buildingPicture: string){

    this.googlePlacesService.getDetails(buildingInformation, (result, status) => {
      
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.placeResult.next([result, buildingName, buildingPicture]);
      }
    });  
  }
}
