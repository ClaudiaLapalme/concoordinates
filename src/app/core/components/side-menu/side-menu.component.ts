import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss'],
    providers: [CalendarService],
})
export class SideMenuComponent implements OnInit, OnDestroy {

    private emailUpdateRef: Subscription = null;
    showMenu: boolean = true;
    showSettings: boolean = false;
    userEmail: string;
    userPicture: string;

    constructor(
        public calendarService: CalendarService) { }

    ngOnInit() {
        this.emailUpdateRef = this.calendarService.emailUpdated$.subscribe(() => {
            this.insertGoogleUserInfo();
        })
    }

    ngOnDestroy() {
        this.emailUpdateRef.unsubscribe();
    }

    openSettings(): void {
        this.showSettings = true;
        this.showMenu = false;
    }

    closeSettings(): void {
        this.showSettings = false;
        this.showMenu = true;
    }

    authCalendarUser(): void {
        this.calendarService.getAuth();
    }

    insertGoogleUserInfo(): void {
        this.userEmail = this.calendarService.getUserEmail();
        this.userPicture = this.calendarService.getUserPicture();
        document.getElementById('loggedInEmail').innerHTML = this.userEmail;
        document.getElementById('loggedInPicture').innerHTML = '<img src=\"', this.userPicture, '\">';
    }
}
