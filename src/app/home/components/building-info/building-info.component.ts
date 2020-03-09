import { Component } from '@angular/core';
import { IonPullUpFooterState } from 'ionic-pullup';
import { PlaceService } from '../../../core';

import IconsMovetoPath from '../../../../assets/icon/icons-moveto-paths.json';

@Component({
    selector: 'app-building-info',
    templateUrl: './building-info.component.html',
    styleUrls: ['./building-info.component.scss']
})
export class BuildingInfoComponent {

    exitIcon: string = IconsMovetoPath['exit'];
    locationIcon: string = IconsMovetoPath['location'];
    websiteIcon: string = IconsMovetoPath['website'];
    phoneIcon: string = IconsMovetoPath['phone'];
    clockCircleIcon: string = IconsMovetoPath['clock-circle'];
    clockHandsIcon: string = IconsMovetoPath['clock-hands'];
    downArrowIcon: string = IconsMovetoPath['up-arrow'];
    upArrowIcon: string = IconsMovetoPath['down-arrow'];

    footerState: IonPullUpFooterState = IonPullUpFooterState.Collapsed;

    buildingName: string;
    buildingAddress: string;
    buildingPhoneNumber: string;
    buildingWebsite: string;
    buildingPicturePath: string;
    buildingSchedule = [];

    displaySchedule: boolean = false;
    buildingInfoLoaded: boolean = false;

    constructor(
        private placeService: PlaceService
    ) {
        this.placeService.placeResultObservable.subscribe(buildingInfo => {
            if (buildingInfo.length !== 0) {

                this.setBuildingName(buildingInfo[1]);
                this.setBuildingPicturePath(buildingInfo[2]);
                this.setBuildingAddress(buildingInfo[0].formatted_address);
                this.setBuildingWebsite(buildingInfo[0].website);
                this.setBuildingPhoneNumber(buildingInfo[0].formatted_phone_number);
                this.setBuildingSchedule(buildingInfo[0].opening_hours);

                this.buildingInfoLoaded = true;
                this.toggleFooter()
            }
        })
    }

    private setBuildingName(name: string): void{
        this.buildingName = name;
    }

    private setBuildingPicturePath(picturePath: string): void{
        this.buildingPicturePath = picturePath;
    }

    private setBuildingAddress(address: string): void{
        this.buildingAddress = address;
    }

    private setBuildingWebsite(website: string): void{

        if (website) {
            this.buildingWebsite = website;
        }
        else {
            this.buildingWebsite = "http://www.concordia.ca/";
        }
    }

    private setBuildingPhoneNumber(phoneNumber: string): void{

        if (phoneNumber) {
            this.buildingPhoneNumber = phoneNumber;
        }
        else {
            this.buildingPhoneNumber = "(514) 848-2424";
        }
    }

    private setBuildingSchedule(schedule): void{

        if (schedule) {
            this.buildingSchedule = schedule.periods;
        }
        else {
            this.buildingSchedule = undefined;
        }
    }    

    /**
     * Display or hide the schedule within the footer.
     */
    toggleSchedule(): void {
        this.displaySchedule = this.displaySchedule == true ? false : true;
    }

    toggleFooter(): void {
        this.footerState = this.footerState == IonPullUpFooterState.Expanded ? IonPullUpFooterState.Collapsed : IonPullUpFooterState.Expanded;
    }
}
