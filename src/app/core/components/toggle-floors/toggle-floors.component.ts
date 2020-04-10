import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

@Component({
    selector: 'app-toggle-floors',
    templateUrl: './toggle-floors.component.html',
    styleUrls: ['./toggle-floors.component.scss'],
})
export class ToggleFloorsComponent {

    @Output() toggledFloor = new EventEmitter<number>();

    selectedFloorLevel: number;
    visibleFloorButton: boolean = true;

    @Input() availableFloors: number[];

    constructor() { }

    @Input()
    set selectedFloor(floorNumber: number) {
        this.selectedFloorLevel = floorNumber;
        this.toggledFloor.emit(this.selectedFloorLevel);
    }

    public selectFloor(floorNumber: number) {
        this.selectedFloor = floorNumber;
    }

}
