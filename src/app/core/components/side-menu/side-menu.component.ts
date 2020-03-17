import { Component } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {

    showMenu: boolean = true;
    showSettings: boolean = false;

    constructor(
        private calendarService: CalendarService
        ) { }

    openSettings(): void {
        this.showSettings = true;
        this.showMenu = false;
    }

    closeSettings(): void {
        this.showSettings = false;
        this.showMenu = true;
    }

    authCalendarUser() { 
        let email = this.calendarService.getAuth().then(console.log);
    }
}
