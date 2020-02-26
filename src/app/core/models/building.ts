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

      if (this.buildingOutlineCoordinatesFound(id)){

        this.setBuildingOutline(id);
      }
   }

  displayBuildingOutline(mapRef: google.maps.Map<Element>) : void {

    if (this.buildingOutline !== undefined) {

      this.buildingOutline.setMap(mapRef);
    }
  }

  private setBuildingOutline(id) : void {

    let outlineAttributes: OutlineAttributes = {
      paths: BuildingsOutlineCoordinates[id],
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35};

    this.buildingOutline = new google.maps.Polygon(outlineAttributes);
  }

  /**
   * Currently, not all the buildings have a outline. This is used to avoid
   * polluting the web browser console with error.
   * @param id: building id
   */
  private buildingOutlineCoordinatesFound(id): boolean{

    return BuildingsOutlineCoordinates.hasOwnProperty(id);
  }
}
