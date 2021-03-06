import { AfterViewInit, Component, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { GoogleApisService, MapService, SessionService, CalendarService } from '../core';
import { MenuController } from '@ionic/angular';
import { IndoorFunctionsService } from '../shared/indoor-functions.service';
import { IconService } from '../core/services/icon.service';
import { SelectedCampus } from '../core/components/toggle-campus';

// TODO move all this map logic to MapPage and keep all Pages as routes from this page
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements AfterViewInit {

    readonly SGW: google.maps.LatLng = new google.maps.LatLng(45.4959053, -73.5801141);
    readonly LOYOLA: google.maps.LatLng = new google.maps.LatLng(45.4582, -73.6405);
    currentCenter: google.maps.LatLng;

    @Output() changeIndoorMap = new EventEmitter<number>();

    // Reference to the native map html element
    @ViewChild('map', { static: false })
    mapElement: ElementRef;

    @ViewChild('directions', { read: ElementRef, static: false })
    directionsButton: ElementRef;
    
    // Reference to the native toggle campus html element
    @ViewChild('toggle', { read: ElementRef, static: false })
    toggle: ElementRef;

    // Reference to the native switch floors buttons html element
    @ViewChild('switchFloor', { read: ElementRef, static: false })
    switchFloor: ElementRef;

    @ViewChild('menuBar', { read: ElementRef, static: false })
    menuBar: ElementRef;

    // Reference to the native location button html element
    @ViewChild('userCenter', { read: ElementRef, static: false })
    userCenter: ElementRef;

    // Map data
    public mapModel: google.maps.Map;
    public mapLoaded: boolean;

    public indoorMapBuildingCode: string;
    public indoorMapLevel: number;
    public availableFloors: number[];

    public newSelectedFloor: number;

    public isMapSet: boolean;

    searchedPlaceMarker: google.maps.Marker;

    controlsShown = true;

    constructor(
        private mapService: MapService,
        private googleApisService: GoogleApisService,
        private menu: MenuController,
        private calendarService: CalendarService,
        private sessionService: SessionService,
        private indoorFunctionsService: IndoorFunctionsService,
        private iconService: IconService
    ) {

        // TODO: Remove initial indoorMap when we will be able to click
        // on the building or zoom in close enough to switch
        // from showing the building overlay to showing indoor maps.
        this.indoorMapBuildingCode = 'H';
        this.availableFloors = [9, 8, 1];
    }

    ngAfterViewInit(): void {
        this.loadMap();
    }

    openMenu(): void {
        this.menu.open();
    }

    setCurrentCenter(newCenter: google.maps.LatLng): void {
        this.currentCenter = newCenter;
    }

    private loadMap(): void {        
        try {
            this.mapService.loadMap(this.mapElement)
                .then(mapObj => {
                    this.mapModel = mapObj;
                    this.sessionService.storeMapRef(mapObj);
                    this.isMapSet = this.sessionService.isMapRefSet();
                    this.mapLoaded = true;

                    const toggleButtonNE = this.toggle.nativeElement;
                    const switchFloorsNE = this.switchFloor.nativeElement;
                    const directionsButton = this.directionsButton.nativeElement;
                    const menuBar = this.menuBar.nativeElement;
                    const locationButton = this.userCenter.nativeElement;


                    this.mapModel.controls[google.maps.ControlPosition.TOP_CENTER].push(menuBar);
                    this.mapModel.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(locationButton);
                    this.mapModel.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(directionsButton);
                    this.mapModel.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(switchFloorsNE);
                    this.mapModel.controls[google.maps.ControlPosition.RIGHT_TOP].push(toggleButtonNE);

                    this.controlsShown = true;

                });
            } catch {
                console.log('Something went wrong, please refresh application.');
            }
    }

    showControls(): void {
        if (!this.controlsShown) {
            this.controlsShown = true;
        }
    }
    
    removeControls(): void {
        if (this.controlsShown) {
            this.controlsShown = false;
        }
    }

    /**
     * Sets the current center to the selected campus
     * Recenters the map to the selected campus
     * @param selectedCampus 
     */
    switchCampus(selectedCampus: number): void {
        if (selectedCampus === SelectedCampus.SGW) {
            this.mapModel.setCenter(this.SGW);
            this.setCurrentCenter(this.SGW); 
        }
        else if (selectedCampus === SelectedCampus.LOY) {
            this.mapModel.setCenter(this.LOYOLA);
            this.setCurrentCenter(this.LOYOLA);
        }
    }

    switchFloors(newIndoorMapLevel: number): void {
        this.indoorMapLevel = newIndoorMapLevel;
    }

    /**
     * Given both map and place objects, infowindow on
     * map for given place, and automatically recenter map +
     * trigger infowindow popup
     * @param place the google place result object
     */
    createMarker(place: google.maps.places.PlaceResult): void {

        const infowindow = new google.maps.InfoWindow();
        const icon = this.iconService.getPlaceIcon();

        // Create marker object based on place parameter
        const placeLoc = place.geometry.location;
        this.searchedPlaceMarker = this.googleApisService.createMarker(placeLoc, this.mapModel, icon);

        // Make marker clickable, once clicked shows a popup with more information
        google.maps.event.addListener(this.searchedPlaceMarker, 'click', function() {

            const placeId: string = place.place_id ? 'Place ID: ' + place.place_id : '';
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + placeId + '</div>');

            infowindow.open(this.mapModel, this);

        });

        // Re-center map at place object + trigger popup for given Place Object
        setTimeout(() => {

            this.mapModel.panTo(placeLoc);
            this.mapModel.setZoom(19);
            const validCoordinate = this.indoorFunctionsService.coordinateIsIndoors(place.name);
            if (validCoordinate) {
                const coordinate = this.indoorFunctionsService.getIndoorCoordinate(place.name);
                this.newSelectedFloor = coordinate.getFloorNumber();
                google.maps.event.trigger(this.searchedPlaceMarker, 'click');
            }

        }, 500);
    }

    /**
     * Removes the searched place marker from the map
     *
     */
    removeMarker(): void {
        if (this.searchedPlaceMarker) {
            this.searchedPlaceMarker.setMap(null);
        }
    }

    recenterToUser(): void {
        this.mapService.getUserLocation().then(userLatLng => {
            this.handleRecenter(userLatLng);
        });
    }

    handleRecenter(userLatLng: google.maps.LatLng): void {
        const latLng: google.maps.LatLng = userLatLng;

        if (latLng !== undefined) {
            this.mapModel.setCenter(latLng);
        } else {
            console.log('the user location is undefined');
        }
    }

}