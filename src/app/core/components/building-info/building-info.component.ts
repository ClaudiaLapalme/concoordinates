import { Component, Output, EventEmitter, Input } from '@angular/core';
import { PlaceService } from '../../services';

@Component({
  selector: 'app-building-info',
  templateUrl: './building-info.component.html',
  styleUrls: ['./building-info.component.scss']
})
export class BuildingInfoComponent {

  @Output() toggleBuildingInfo: EventEmitter<boolean> = new EventEmitter<boolean>();

  buildingName: string = "Hall Building";
  buildingAddress: string;
  buildingPhoneNumber: string;
  buildingWebsite: string;
  buildingPicturePath: string;
  buildingSchedule: boolean = false;
  displaySchedule: boolean = true;
  
  constructor(
    private placeService: PlaceService
  ){
    this.placeService.placeResultObservable.subscribe(buildingInfo => {
      this.buildingAddress = buildingInfo.formatted_address;
    })
  }

  ngOnInit(){
    this.displayBuildingInfo();
  }

  displayBuildingInfo(){
    this.toggleBuildingInfo.emit(true);
  }

  hideBuildingInfo(){
    this.toggleBuildingInfo.emit(false);
  }

  toggleSchedule(){
    if (this.displaySchedule){
      this.displaySchedule = false;
    }
    else{
      this.displaySchedule = true;
    }
  }
}
