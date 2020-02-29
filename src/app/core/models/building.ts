import { OutdoorPOI } from './outdoor-poi';
import { Coordinates } from './coordinates';

import BuildingsOutlineCoordinates from '../data/building-outline-coordinates.json';

type BuildingOutline = google.maps.Polygon;
type OutlineAttributes = google.maps.PolygonOptions;

export class Building extends OutdoorPOI {

  private buildingOutline: BuildingOutline;

  constructor(
    name: string,
    code: string,
    coordinates: Coordinates) {

    super(name, coordinates);

    this.setBuildingOutline(code);
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
}
