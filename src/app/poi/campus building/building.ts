import { ElementRef, Injectable } from '@angular/core';
import { BuildingOutline } from 'src/app/poi/campus building/BuildingOutline';


export class Building {

  private buildingOutline: BuildingOutline;
  private polygonOutline: google.maps.Polygon;

  constructor( 
    name: string, 
    coordinates: {lat: number, lng: number}[],
    mapRef: google.maps.Map<Element>) {

      this.buildingOutline = new BuildingOutline(mapRef, coordinates, '#FF0000', 0.8, 2, '#FF0000', 0.35);
   }

  displayBuildingOutline() : void {

    this.setBuildingOutline(this.buildingOutline)

    this.polygonOutline.setMap(this.buildingOutline.mapRef);

  }

  private setBuildingOutline(buildingOutline: BuildingOutline) : void {

    this.polygonOutline = new google.maps.Polygon({paths: buildingOutline.polygonCoordinates, strokeColor: buildingOutline.strokeColor, strokeOpacity: buildingOutline.strokeOpacity, strokeWeight: buildingOutline.strokeWeight, fillColor: buildingOutline.fillColor, fillOpacity: buildingOutline.fillOpacity});

  }
}
