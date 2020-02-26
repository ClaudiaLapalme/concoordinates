import { ElementRef, Injectable } from '@angular/core';

export class Coordinates {

    private latitude: number;
    private longitude: number;
    private floorNumber: number;

    constructor(
        latitude: number,
         longitude: number,
          floorNumber: number) {

            this.setLatitude(latitude);
            this.setLongitude(longitude);
            this.setFloorNumber(floorNumber);

          }

    getLatitude(): number{
        return this.latitude;
    }

    getLongitude(): number{
        return this.longitude;
    }

    getFloorNumber(): number{
        return this.floorNumber;
    }

    private setLatitude(latitude: number): void{
        this.latitude  = latitude;
    }

    private setLongitude(longitude: number): void{
        this.longitude  = longitude;
    }

    private setFloorNumber(floorNumber: number): void{
        this.floorNumber  = floorNumber;
    }

}