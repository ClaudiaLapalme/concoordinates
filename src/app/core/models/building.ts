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
  private outlineAttributes: OutlineAttributes;

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

  removeBuildingCode(): void {
    
    this.marker.setVisible(false);
  }

  displayBuildingOutline(): void{

    this.buildingOutline.setVisible(true);
  }
  displayBuildingCode() : void {
    
    this.marker.setVisible(true);
  }

  displayBuildingInformation(mapRef: google.maps.Map<Element>) : void {

    this.marker.setMap(mapRef);

    let service = new google.maps.places.PlacesService(mapRef);
      
    service.getDetails(this.buildingInformation, function(place, status) {

      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log( place.name + ', Address: ' + place.formatted_address + ', Website: ' + place.website + '</div>');
      }
    });  
  }

  private setBuildingOutline(code: string): void {

    this.outlineAttributes = {
      paths: BuildingsOutlineCoordinates[code],
      strokeColor: '#000000',
      strokeOpacity: 0.6,
      strokeWeight: 2,
      fillColor: '#000000',
      fillOpacity: 0.57
    };

    this.buildingOutline = new google.maps.Polygon(this.outlineAttributes);
  }

  private setBuildingInformation(code: string): void {

    let i: number;
    let latLngCoords = [];    
    let coords = BuildingsOutlineCoordinates[code];
    let bounds = new google.maps.LatLngBounds();
    
    //Center the building code markers
    for(i=0; i<coords.length;i++){
      latLngCoords.push(new google.maps.LatLng(coords[i].lat, coords[i].lng)) 
    }
    for(i=0; i<coords.length;i++){
      bounds.extend(latLngCoords[i]);
    }
    //Set building code marker
    this.marker = new google.maps.Marker({
      label: {text: code, color: 'white'},
      icon:'../assets/icon/TransparentMarker.png',
      position: bounds.getCenter()
    });
   /* 
    * Set building information fields by placeId.
    * Loyola campus has many buildings SHARING a placeId, meaning they will yield the same info.
    * We will need to find a way to differentiate between buildings that share a placeId
    */
    this.buildingInformation = {
      placeId: ConcordiaBuildings[code].placeId,
      fields: ['name', 'formatted_address', 'formatted_phone_number', 'opening_hours', 'website']
    };
  }
}
