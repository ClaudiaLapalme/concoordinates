import { Component, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-building-info',
  templateUrl: './building-info.component.html',
  styleUrls: ['./building-info.component.scss'],
})
export class BuildingInfoComponent {

  @Output() displayInfo:boolean = false;
  buildingName: string = "Hall Building";
  buildingAddress: string = "123 Address Street";
  buildingPhoneNumber: string = "514 444 4444";
  buildingWebsite: string = "website.com";
  buildingPicturePath: string;
  
  constructor() { }

  displayBuidlingsInfo(){
    this.displayInfo = true;
  }


  hideBuildingInfo(){
    this.displayInfo = false;
  }



  
}
