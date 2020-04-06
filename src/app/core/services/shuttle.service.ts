import { Injectable } from '@angular/core';
import { Coordinates } from '../models';
import { CampusBoundsService } from './campus-bounds.service';

@Injectable({
  providedIn: 'root'
})
export class ShuttleService {

  constructor(private campusBoundsService: CampusBoundsService) { }

  isEligibleForShuttle(fromLocation: Coordinates, toLocation: Coordinates): boolean {      
      if (this.campusBoundsService.isWithinBoundsOfLoyola(fromLocation) || this.campusBoundsService.isWithinBoundsOfSGW(fromLocation)) {
          if (this.campusBoundsService.isWithinBoundsOfLoyola(fromLocation)) {
              if (this.campusBoundsService.isWithinBoundsOfSGW(toLocation)) {
                  return true;
              }

          } else if (this.campusBoundsService.isWithinBoundsOfSGW(fromLocation)) {

            if (this.campusBoundsService.isWithinBoundsOfLoyola(toLocation)) {
                return true;
            }
          }
      }
      return false;
  }
}
