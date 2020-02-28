import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-toggle-floors',
    templateUrl: './toggle-floors.component.html',
    styleUrls: ['./toggle-floors.component.scss'],
})
export class ToggleFloorsComponent {

    @Output() emitToggledFloor = new EventEmitter<number>();
    
    selectedFloor: number;

    availableFloors: number[] = [9, 8];

    constructor() { }

    selectFloor(floorNumber: number): void {
        this.selectedFloor = floorNumber;
        this.emitToggledFloor.emit(this.selectedFloor);
    }

}
