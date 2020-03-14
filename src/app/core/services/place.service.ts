import { Injectable, EventEmitter } from '@angular/core';
import { Geoposition } from '@ionic-native/geolocation/ngx';
import { LocationService } from './location.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PlaceService {

  public searchResultsResolved = new EventEmitter<Array<google.maps.places.PlaceResult>>();
  private googlePlacesService: google.maps.places.PlacesService;


  private placeResult = new BehaviorSubject([]);
  public placeResultObservable = this.placeResult.asObservable();

  constructor(
    private locationService: LocationService
  ) { }

  public enableService(mapRef: google.maps.Map<Element>): void {
    this.googlePlacesService = new google.maps.places.PlacesService(mapRef);
  }

  /**
   * This function is called whenever a building outline is clicked.
   * Updates the observable so that the BuildingComponent can receives the data.
   * @param buildingInformation
   * @param buildingName 
   * @param buildingPicture 
   */
  public displayBuildingInformation(buildingInformation: google.maps.places.PlaceDetailsRequest, buildingName: string, buildingPicture: string): void {
    this.googlePlacesService.getDetails(buildingInformation, (result, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.checkDetails(result, buildingName, buildingPicture);
        }
    });
  }

  checkDetails(result: google.maps.places.PlaceResult,buildingName: string, buildingPicture: string ) : void {
        this.placeResult.next([result, buildingName, buildingPicture]);
  }

  /**
   * Given a map reference and input string, search locations
   * in radius range
   * @param map the reference to the html map
   * @param input the query string
   */
  async textSearch(map: google.maps.Map, input: string): Promise<google.maps.places.PlaceResult[]> {
    const geoPos: Geoposition = await this.locationService.getGeoposition();

    return new Promise<google.maps.places.PlaceResult[]>(resolve => {
      new google.maps.places.PlacesService(map).textSearch(
        {location: { lat: geoPos.coords.latitude, lng: geoPos.coords.longitude}, radius: 1000, query: input},
        (res, status) => {
          if (status === 'OK') {
            resolve(res);
          } else { resolve([]); }
        }
      );
    });
  }
}
