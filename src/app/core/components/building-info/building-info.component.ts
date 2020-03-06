import { Component, Output, EventEmitter, Input } from '@angular/core';
import { PlaceService } from '../../../core';

@Component({
    selector: 'app-building-info',
    templateUrl: './building-info.component.html',
    styleUrls: ['./building-info.component.scss']
})
export class BuildingInfoComponent {

    @Output() toggleBuildingInfo: EventEmitter<boolean> = new EventEmitter<boolean>(false);

    buildingName: string;
    buildingAddress: string;
    buildingPhoneNumber: string;
    buildingWebsite: string;
    buildingPicturePath: string;
    buildingSchedule = [];
    displaySchedule: boolean = true;
    displayAll: boolean = false;
    openNow: boolean = true;

    constructor(
        private placeService: PlaceService
    ) {
        this.placeService.placeResultObservable.subscribe(buildingInfo => {
            if (buildingInfo.length !== 0) {
                this.buildingAddress = buildingInfo[0].formatted_address;
                this.buildingWebsite = buildingInfo[0].website;
                this.buildingPhoneNumber = buildingInfo[0].formatted_phone_number;
                this.buildingName = buildingInfo[0].name;
                this.buildingSchedule = buildingInfo[0].opening_hours;
                console.log(buildingInfo[0].opening_hours);
                this.displayBuildingInfo();
            }
        })
    }

    displayBuildingInfo() {
        this.displayAll = true;
    }

    hideBuildingInfo() {
        this.displayAll = false;
    }

    toggleSchedule() {
        if (this.displaySchedule) {
            this.displaySchedule = false;
        }
        else {
            this.displaySchedule = true;
        }
    }
}
