import { OutdoorPOI } from './outdoor-poi';
import { Coordinates } from './coordinates';

import BuildingsOutlineCoordinates from '../data/building-outline-coordinates.json';
import ConcordiaBuildings from '../data/concordia-buildings.json'

type BuildingOutline = google.maps.Polygon;
type OutlineAttributes = google.maps.PolygonOptions;
type BuildingInformation = google.maps.places.PlaceDetailsRequest;

export class Building extends OutdoorPOI {

  private buildingOutline: BuildingOutline;
  private buildingInformation: BuildingInformation;
  private marker: google.maps.Marker;

  constructor(
    name: string,
    code: string,
    coordinates: Coordinates) {

    super(name, coordinates);

    this.setBuildingOutline(code);
    this.setBuildingInformation(code);
  }

  createBuildingOutline(mapRef: google.maps.Map<Element>): void {

    this.buildingOutline.setMap(mapRef);
  }

  removeBuildingOutline(): void {

    this.buildingOutline.setVisible(false);
  }

  displayBuildingOutline(): void{

    this.buildingOutline.setVisible(true);
  }

  displayBuildingInformation(mapRef: google.maps.Map<Element>) : void {

    this.marker.setMap(mapRef);

    let infowindow = new google.maps.InfoWindow;
    let service = new google.maps.places.PlacesService(mapRef);
      
    service.getDetails(this.buildingInformation, function(place, status) {

      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log( place.name + ', Address: ' + place.formatted_address + ', Website: ' + place.website + '</div>');
      }
    });  
  }

  private setBuildingOutline(code: string): void {

    let outlineAttributes: OutlineAttributes = {
      paths: BuildingsOutlineCoordinates[code],
      strokeColor: '#000000',
      strokeOpacity: 0.6,
      strokeWeight: 2,
      fillColor: '#000000',
      fillOpacity: 0.57
    };

    this.buildingOutline = new google.maps.Polygon(outlineAttributes);
  }

  private setBuildingInformation(code: string): void {

    this.marker = new google.maps.Marker({
      label: {text: code, color: 'white'},
      icon:'../assets/icon/TransparentMarker.png',
      position: ConcordiaBuildings[code].coordinates
    });

    this.buildingInformation = {
      placeId: ConcordiaBuildings[code].placeId,
      fields: ['name', 'formatted_address', 'formatted_phone_number', 'opening_hours', 'website']
    };
  }
}
