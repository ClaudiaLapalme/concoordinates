import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-toggle-campus',
    templateUrl: './toggle-campus.component.html',
    styleUrls: ['./toggle-campus.component.scss'],
})
export class ToggleCampusComponent {

    @Output() toggleChange = new EventEmitter();

    isSGWToggled: boolean = true;

    constructor() { }

    toggleCampus(): void {
        this.isSGWToggled = !this.isSGWToggled;
        this.toggleChange.emit();
    }

}
