import { AfterViewInit, Component, ElementRef, ViewChild, ComponentFactoryResolver, OnInit } from '@angular/core';
import { MapService } from '../core';
import { ToggleCampusComponent } from '../core/components/toggle-campus/toggle-campus.component';
import { ToggleCampusDirective } from '../core/directives';

// TODO move all this map logic to MapPage and keep all Pages as routes from this page
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, AfterViewInit {

    // Reference to the native map html element
    @ViewChild('map', { static: false })
    mapElement: ElementRef;

    // @ViewChild('toggleCampus', {static: false})
    @ViewChild('appToggleCampus', {read: ToggleCampusDirective, static: true})//, {static: true})
    appToggleCampus: ToggleCampusDirective;

    // Map data
    map: google.maps.Map;

    constructor(
        private mapService: MapService,
        private componentFactoryResolver: ComponentFactoryResolver,

    ) { }

    ngOnInit(): void {
        console.log('appToggleCampus:', this.appToggleCampus);
    }

    ngAfterViewInit(): void {
        console.log('toggleCampus:', this.appToggleCampus);
        this.loadMap();
    }

    private loadMap(): void {
        // this.mapService.loadMap(this.mapElement).then(mapObj => this.map = mapObj);
        initMap();
        console.log('map', this.map);
        

        // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ToggleCampusComponent);
        const viewContainerRef = this.appToggleCampus.viewContainerRef;
        // viewContainerRef.clear();

        // creates the ToggleCampusComponent
        // const componentRef = viewContainerRef.createComponent(componentFactory);
    }
}




/// bad code
let map;
// let SWG = {lat: 45.4959053, lng: -73.5801141};
// let LOYOLA = {lat: 45.4582, lng: -73.6405};


function CenterControl(controlDiv, map) {
    // We set up a variable for this since we're adding event listeners
    // later.
    let control = this;

    let SGW = { lat: 45.4959053, lng: -73.5801141 };
    let LOYOLA = { lat: 45.4582, lng: -73.6405 };

    // Set the center property upon construction
    control._CURRENT_CENTER = SGW;
    control._SGW = SGW;
    control._LOYOLA = LOYOLA;
    controlDiv.style.clear = 'both';

    // Set CSS for the control border
    let toggleCampusButton = document.createElement('div');
    toggleCampusButton.id = 'toggleCampusButton';
    toggleCampusButton.title = 'Click to switch campus';
    const toggleCampusButtonStyleKey = 'style' + '';
    toggleCampusButton[toggleCampusButtonStyleKey] = `display:flex; margin-top: 9vh; margin-right: 1vh;`;
    controlDiv.appendChild(toggleCampusButton);

    // Set CSS for the control interior
    let toggleSGW = document.createElement('div');
    toggleSGW.id = 'toggleSGW';
    toggleSGW.innerHTML = 'SGW';
    // toggleSGW.className = 'toggleSGW';
    const key = 'style' + '';
    toggleSGW[key] = `background:#6C2626;
                    border-radius: 7px 0px 0px 7px;
                    color:white;
                    font-family: roboto;
                    font-size: 10px;
                    user-select: none;
                    padding: 0px 10px 0px 12px;`;
    toggleCampusButton.appendChild(toggleSGW);

    // Set CSS for the control interior
    let toggleLoyola = document.createElement('div');
    toggleLoyola.id = 'toggleLoyola';
    toggleLoyola.innerHTML = 'LOY';
    toggleLoyola[key] = `background:#FFFFFF;
                        border-radius: 0px 7px 7px 0px;
                        color:black;
                        font-family: roboto;
                        font-size: 10px;
                        user-select: none;
                        padding: 0px 12px 0px 12px;`;
    toggleCampusButton.appendChild(toggleLoyola);

    toggleCampusButton.addEventListener('click', function () {
        if (control.getCurrentCenter() === SGW) {
            map.setCenter(control.getLoyolaCoordinates());
            control.setCurrentCenter(control.getLoyolaCoordinates());
        } else {
            map.setCenter(control.getSGWCoordinates());
            control.setCurrentCenter(control.getSGWCoordinates());
        }
    });
}

CenterControl.prototype._CURRENT_CENTER = null;
CenterControl.prototype._SGW = null;
CenterControl.prototype._LOYOLA = null;


CenterControl.prototype.getCurrentCenter = function () {
    return this._CURRENT_CENTER;
};
CenterControl.prototype.setCurrentCenter = function (newCenter) {
    this._CURRENT_CENTER = newCenter;
}
CenterControl.prototype.getSGWCoordinates = function () {
    return this._SGW;
};
CenterControl.prototype.getLoyolaCoordinates = function () {
    return this._LOYOLA;
};
/**
 * Sets the map center.
 * @param {?google.maps.LatLng} center
 */
CenterControl.prototype.setCenter = function (center) {
    this.center_ = center;
};

function initMap() {
    let SGW = { lat: 45.4959053, lng: -73.5801141 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: SGW,
        zoom: 15,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP]
        },
        disableDefaultUI: true,
        mapTypeControl: false,
        scaleControl: true,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });


    let centerControlDiv = document.createElement('div');
    let centerControl = new CenterControl(centerControlDiv, map);

    centerControlDiv['index'] = 1;

    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(centerControlDiv);
}
