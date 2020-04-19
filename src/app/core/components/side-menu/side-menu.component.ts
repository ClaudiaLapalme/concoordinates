import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { LocationService, MapService, SessionService } from '../../services';
import { CalendarService } from '../../services/calendar.service';
import { PlaceService } from '../../services/place.service';

declare let gapi: any;

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss'],
    providers: [CalendarService, PlaceService],
})
export class SideMenuComponent implements OnInit, OnDestroy {

    private emailUpdateRef: Subscription = null;
    showMenu = true;
    showSettings = false;
    signedIn = false;
    userEmail: string;
    userPicture: string;
    calEventName: string;
    calEventLocation: string;
    calEventTime: string;
    userLocation: string;
    isRouteToEvent = false;
    calendarAuthPrompted = false;

    mapObj: google.maps.Map;

    constructor(
        public calendarService: CalendarService,
        public placeService: PlaceService,
        public router: Router,
        public locationService: LocationService,
        public mapService: MapService,
        public zone: NgZone,
        public sessionService: SessionService
    ) {}

    ngOnInit() {
        this.emailUpdateRef = this.calendarService.emailUpdated$.subscribe(() => {
            this.zone.run(() => {
                this.userEmail = this.calendarService.getUserEmail();
                this.userPicture = this.calendarService.getUserPicture();
                this.calEventName = this.calendarService.getEventName();
                this.calEventLocation = this.calendarService.getEventLocation();
                this.calEventTime = this.calendarService.getEventTime();
                this.signedIn = true;
            });


        });
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
        this.calendarAuthPrompted = true;
    }

    setUserLocation(location: string): void {
        this.userLocation = location;
    }

    goToEvent() {
        this.isRouteToEvent = true;
        this.sessionService.storeNavigationParams(
            {
                location: this.calEventLocation,
                isRouteToEvent: this.isRouteToEvent
            }
        );
        this.router.navigate(['routes']);
    }
}
