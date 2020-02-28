import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-toggle-floors',
    templateUrl: './toggle-floors.component.html',
    styleUrls: ['./toggle-floors.component.scss'],
})
export class ToggleFloorsComponent {

    @Output() emitToggledFloor = new EventEmitter();

    isEightToggled: boolean = true;

    constructor() { }

    toggleFloor(): void {
        this.isEightToggled = !this.isEightToggled;
        console.log('toggleFloor() function has been penetrated');
        this.emitToggledFloor.emit();
    }

}
