import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MapService } from '../core';
import { IndoorMap } from '../core/models';

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

    // Reference to the native map html element
    @ViewChild('map', { static: false })
    mapElement: ElementRef;

    @ViewChild('toggle', { read: ElementRef, static: false })
    toggle: ElementRef;

    @ViewChild('switchFloor', { read: ElementRef, static: false })
    switchFloor: ElementRef;

    @ViewChild('indoorMap', { read: ElementRef, static: false })
    indoorMap: ElementRef;

    // Map data
    map: google.maps.Map;

    constructor(
        private mapService: MapService,
    ) {
        this.currentCenter = this.SGW;
    }

    ngAfterViewInit(): void {
        this.loadMap();
    }

    setCurrentCenter(newCenter: google.maps.LatLng): void {
        this.currentCenter = newCenter;
    }

    private loadMap(): void {
        this.mapService.loadMap(this.mapElement)
            .then(mapObj => {
                // Set the map reference to this component
                this.map = mapObj;

                // Toggle buttons
                let toggleButton = this.toggle.nativeElement;
                let switchFloorsNE = this.switchFloor.nativeElement;


                // refactor the following
                // let swBound = new google.maps.LatLng(45.49678555880323, -73.57966292394255);
                // let neBound = new google.maps.LatLng(45.4977904017961, -73.57822173495292);
                // let bounds = new google.maps.LatLngBounds(swBound, neBound);
                // let srcImage = 'https://i.imgur.com/H0ji5Za.png';
                // initialize(this.map);

                // google.maps.OverlayView.setMap(this.map);
                // end

                this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(switchFloorsNE);
                this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(toggleButton);
            });
    }

    switchCampus(): void {
        if (this.currentCenter === this.SGW) {
            this.map.setCenter(this.LOYOLA);
            this.setCurrentCenter(this.LOYOLA);
        } else {
            this.map.setCenter(this.SGW);
            this.setCurrentCenter(this.SGW);
        }
    }

    switchFloors(): void {
        console.log('you have penetrated switchFloors() in the homepage');
    }
}

function initialize(map) {

    // make these input properties?
    let swBound = new google.maps.LatLng(45.49681658032052, -73.57955563558198);
    let neBound = new google.maps.LatLng(45.49771707945049, -73.57833170552253);

    let bounds = new google.maps.LatLngBounds(swBound, neBound);

    console.log(map);

    // input property

    // Hall 9
    let srcImage = 'https://i.imgur.com/SFFPE7G.png';

    // Hall 8
    // let srcImage ='https://i.imgur.com/agm7mwH.png';

    // let overlay = new IndoorMap(bounds, srcImage, map, );
    // debug feature
    // let debug = false;
    // if (debug) {
    //     // create sw marker needs 1 bound and map ref
    //     let markerA = new google.maps.Marker({
    //         position: swBound,
    //         map: map,
    //         draggable: true
    //     });
    //     // create ne marker needs 1 bound and map ref
    //     let markerB = new google.maps.Marker({
    //         position: neBound,
    //         map: map,
    //         draggable: true
    //     });

    //     // debug
    //     // retrieve pos of markers and create new bounds, but maybe instead of updateBounds
    //     // we dont need this function
    //     // TODO: remove
    //     google.maps.event.addListener(markerA, 'drag', function () {

    //         let newPointA = markerA.getPosition();
    //         let newPointB = markerB.getPosition();
    //         let newBounds = new google.maps.LatLngBounds(newPointA, newPointB);
    //         overlay.updateBounds(newBounds);
    //     });
    //     // // debug
    //     // // TODO: remove
    //     google.maps.event.addListener(markerB, 'drag', function () {

    //         let newPointA = markerA.getPosition();
    //         let newPointB = markerB.getPosition();
    //         let newBounds = new google.maps.LatLngBounds(newPointA, newPointB);
    //         overlay.updateBounds(newBounds);
    //     });

    //     // just position displayers remove
    //     google.maps.event.addListener(markerA, 'dragend', function () {
    //         let newPointA = markerA.getPosition();
    //         let newPointB = markerB.getPosition();
    //         console.log("point1" + newPointA);
    //         console.log("point2" + newPointB);
    //     });

    //     google.maps.event.addListener(markerB, 'dragend', function () {
    //         let newPointA = markerA.getPosition();
    //         let newPointB = markerB.getPosition();
    //         console.log("point1" + newPointA);
    //         console.log("point2" + newPointB);
    //     });
    // }
}


