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

    _selectedFloor: number;

    @Input() availableFloors: number[];

    constructor() { }

    @Input()
    set selectedFloor(floorNumber: number) {
        this._selectedFloor = floorNumber;
        this.toggledFloor.emit(this._selectedFloor);
    }

    public selectFloor(floorNumber: number) {
        this.selectedFloor = floorNumber;
    }

}
