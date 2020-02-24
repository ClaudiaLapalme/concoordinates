import { ElementRef, Injectable } from '@angular/core';


export class BuildingOutline {

    mapRef: google.maps.Map<Element>;
    polygonCoordinates: {lat: number, lng: number}[];
    strokeColor: string;
    strokeOpacity: number; 
    strokeWeight: number; 
    fillColor: string;
    fillOpacity: number;

    constructor(mapRef: google.maps.Map<Element>, polygonCoordinates: {lat: number, lng: number}[], strokeColor: string, strokeOpacity: number, strokeWeight: number, fillColor: string, fillOpacity: number){

        this.mapRef = mapRef;
        this.polygonCoordinates = polygonCoordinates;
        this.strokeColor = strokeColor;
        this.strokeOpacity = strokeOpacity;
        this.strokeWeight = strokeWeight;
        this.fillColor = fillColor;
        this.fillOpacity = fillOpacity;
    }

    


}