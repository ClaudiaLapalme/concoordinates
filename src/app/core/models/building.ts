import { ElementRef, Injectable } from '@angular/core';
import { OutdoorPOI } from './outdoor-poi';
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';
import { Coordinates } from "src/app/core/models/coordinates"
type BuildingOutline = google.maps.Polygon;
type OutlineAttributes = google.maps.PolygonOptions;

export class Building extends OutdoorPOI{

  private buildingOutline: BuildingOutline;

  constructor( 
    name: string, 
    coordinates: Coordinates) {
      
      super(name, coordinates);
      this.setBuildingOutline();
   }

  displayBuildingOutline(mapRef: google.maps.Map<Element>) : void {

    this.buildingOutline.setMap(mapRef);

  }

  private setBuildingOutline() : void {

    var CoorJsonFile = require("src/app/core/data/building-outline-coordinates.json");
    let name = this.getName()

    let outlineAttributes: OutlineAttributes = {
      paths: CoorJsonFile[name],
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35};

    this.buildingOutline = new google.maps.Polygon(outlineAttributes);

  }
}
