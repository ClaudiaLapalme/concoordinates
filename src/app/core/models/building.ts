import { OutdoorPOI } from './outdoor-poi';
import { Coordinates } from './coordinates';
import BuildingsOutlineCoordinates from '../data/building-outline-coordinates.json';
type BuildingOutline = google.maps.Polygon;
type OutlineAttributes = google.maps.PolygonOptions;

export class Building extends OutdoorPOI{

  private buildingOutline: BuildingOutline;

  constructor( 
    name: string, 
    coordinates: Coordinates,
    id: string) {

      super(name, coordinates);

      this.setBuildingOutline(id);
   }

  displayBuildingOutline(mapRef: google.maps.Map<Element>) : void {

    this.buildingOutline.setMap(mapRef);
  }

  private setBuildingOutline(id: string) : void {

    let outlineAttributes: OutlineAttributes = {
      paths: BuildingsOutlineCoordinates[id],
      strokeColor: '#000000',
      strokeOpacity: 0.6,
      strokeWeight: 2,
      fillColor: '#000000',
      fillOpacity: 0.57};

    this.buildingOutline = new google.maps.Polygon(outlineAttributes);
  }
}
