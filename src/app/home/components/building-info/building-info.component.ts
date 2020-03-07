import { Component } from '@angular/core';
import { IonPullUpFooterState } from 'ionic-pullup';
import { PlaceService } from '../../../core';

enum daysOfWeek {
    Sun,
    Mon,
    Tue,
    Wed,
    Thu,
    Fri,
    Sat
}

@Component({
    selector: 'app-building-info',
    templateUrl: './building-info.component.html',
    styleUrls: ['./building-info.component.scss']
})
export class BuildingInfoComponent {

    footerState: IonPullUpFooterState = IonPullUpFooterState.Collapsed;

    buildingName: string;
    buildingAddress: string;
    buildingPhoneNumber: string;
    buildingWebsite: string;
    buildingPicture: string;
    buildingSchedule = [];

    displaySchedule: boolean = false;
    buildingInfoLoaded: boolean = false;
    
    //TODO
    //isOpen() in the buildingInfo[0].opening_hours doesn't work
    openNow: boolean = false;

    constructor(
        private placeService: PlaceService
    ) {
        this.placeService.placeResultObservable.subscribe(buildingInfo => {
            if (buildingInfo.length !== 0) {

                this.setBuildingName(buildingInfo[1]);
                this.setBuildingPicture(buildingInfo[2]);
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

    private setBuildingPicture(pictureName: string): void{
        this.buildingPicture = pictureName;
    }

    private setBuildingAddress(address: string): void{
        this.buildingAddress = address;
    }

    private setBuildingWebsite(website: string): void{

        if (website !== undefined) {
            this.buildingWebsite = website;
        }
        else {
            this.buildingWebsite = "http://www.concordia.ca/";
        }
    }

    private setBuildingPhoneNumber(phoneNumber: string): void{

        if (phoneNumber !== undefined) {
            this.buildingPhoneNumber = phoneNumber;
        }
        else {
            this.buildingPhoneNumber = "(514) 848-2424";
        }
    }

    private setBuildingSchedule(schedule): void{

        if (schedule !== undefined) {
            this.buildingSchedule = schedule.periods;
        }
        else {
            this.buildingSchedule = undefined;
        }
    }    

    /**
     * Google days of the week are codified. This function converts them into
     * strings using the enum at the top of the file.
     * @param dayNumber 
     */
    getDayOfWeek(dayNumber: number) {
        return daysOfWeek[dayNumber];
    }

    /**
     * If the number of minutes is 0, convert it to "00" for nicer display.
     * @param minutes 
     */
    convertOneZeroToTwo(minutes: number) {
        return minutes == 0 ? '00' : minutes
    }

    toggleSchedule() {
        this.displaySchedule = this.displaySchedule == true ? false : true;
    }

    toggleFooter() {
        this.footerState = this.footerState == IonPullUpFooterState.Expanded ? IonPullUpFooterState.Collapsed : IonPullUpFooterState.Expanded;
    }
}
