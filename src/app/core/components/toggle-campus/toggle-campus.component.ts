import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-toggle-campus',
    templateUrl: './toggle-campus.component.html',
    styleUrls: ['./toggle-campus.component.scss'],
})
export class ToggleCampusComponent {

    readonly SGW: google.maps.LatLng = new google.maps.LatLng(45.4959053, -73.5801141);
    readonly LOYOLA: google.maps.LatLng = new google.maps.LatLng(45.4582, -73.6405);

    @Output() toggleChange = new EventEmitter();

    @Input() defaultCampus: google.maps.LatLng;
    
    isSGWToggled: boolean;

    constructor() {
        this.setIsSGWToggled();
     }

    toggleCampus(): void {
        this.isSGWToggled = !this.isSGWToggled;
        this.toggleChange.emit();
    }

    setIsSGWToggled(): void {
        if (this.defaultCampus == this.SGW) {
            this.isSGWToggled = true;
        }
        else {
            this.isSGWToggled = false;
        }
    }

}
