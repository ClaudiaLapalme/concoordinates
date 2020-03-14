import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-location-button',
    templateUrl: './location-button.component.html',
    styleUrls: ['./location-button.component.scss'],
})
export class LocationButtonComponent {

    @Output() recenterOnLocation = new EventEmitter();

    constructor() { }

    recenterLocation(): void {
        this.recenterOnLocation.emit();
    }

}
