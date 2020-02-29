import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-toggle-floors',
    templateUrl: './toggle-floors.component.html',
    styleUrls: ['./toggle-floors.component.scss'],
})
export class ToggleFloorsComponent {

    @Output() toggledFloor = new EventEmitter<number>();
    
    selectedFloor: number;

    @Input() availableFloors: number[];

    constructor() { }

    selectFloor(floorNumber: number): void {
        this.selectedFloor = floorNumber;
        this.toggledFloor.emit(this.selectedFloor);
    }

}
