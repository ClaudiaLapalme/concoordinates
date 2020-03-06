import { OutdoorPOI } from './outdoor-poi';
import { Coordinates } from './coordinates';
import { PlaceService } from '../services';

import BuildingsOutlineCoordinates from '../data/building-outline-coordinates.json';
import ConcordiaBuildings from '../data/concordia-buildings.json';

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
    this.setBuildingLabel(code);
  }

  createBuildingOutline(mapRef: google.maps.Map<Element>, placeService: PlaceService): void {

    this.buildingOutline.setMap(mapRef);
    this.marker.setMap(mapRef);
    this.enableOutlineListener(placeService);
  }

  removeBuildingOutline(): void {

    this.buildingOutline.setVisible(false);
  }

  removeBuildingCode(): void {

    if(this.marker != null){
      this.marker.setVisible(false);
    }  
  }

  displayBuildingOutline(): void{

    this.buildingOutline.setVisible(true);
  }

  displayBuildingCode() : void {

    this.marker.setVisible(true);
  }

  private enableOutlineListener(placeService: PlaceService){
    this.buildingOutline.addListener('click', () =>{
      placeService.displayBuildingInformation(this.buildingInformation, this.getName());
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

  private setBuildingLabel(code: string): void{
    let boundsCenter = this.centerOfPolygon(code);

    //Set building code marker
    this.marker = new google.maps.Marker({
      label: {text: code, color: 'white'},
      icon:'../assets/icon/TransparentMarker.png',
      position: boundsCenter
    }); 
  }

  private setBuildingInformation(code: string): void {

   if(ConcordiaBuildings[code] != null){
      this.buildingInformation = {
        placeId: ConcordiaBuildings[code].placeId,
        fields: ['formatted_address', 'formatted_phone_number', 'opening_hours', 'website', 'photo', 'name']
      };
    }
  }

  private centerOfPolygon(code: string){
    let i: number;
    let latLngCoords = [];    
    let coords = BuildingsOutlineCoordinates[code];
    let bounds = new google.maps.LatLngBounds();

    for(i=0; i<coords.length;i++){
      latLngCoords.push(new google.maps.LatLng(coords[i].lat, coords[i].lng)) 
    }
    for(i=0; i<coords.length;i++){
      bounds.extend(latLngCoords[i]);
    }

    return bounds.getCenter();
  }
}
