import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IndoorMap } from '../../models';

@Component({
    selector: 'app-indoor-map',
    templateUrl: './indoor-map.component.html',
    styleUrls: ['./indoor-map.component.scss'],
})
export class IndoorMapComponent implements AfterViewInit {

    @Input() map: google.maps.Map<Element>; // map reference

    @ViewChild('indoorMapDiv', { read: ElementRef, static: false })
    indoorMapDiv: ElementRef;   // html div reference

    indoorMap: IndoorMap;       // model

    constructor() { }

    ngAfterViewInit() {

        let swBound = new google.maps.LatLng(45.49681658032052, -73.57955563558198);
        let neBound = new google.maps.LatLng(45.49771707945049, -73.57833170552253);
        let bounds = new google.maps.LatLngBounds(swBound, neBound);

        // Hall 9
        let srcImage = 'https://i.imgur.com/SFFPE7G.png';
        // Hall 8
        // let srcImage ='https://i.imgur.com/agm7mwH.png';
        console.log('indoormap map', this.map);
        console.log('indoormap map div', this.indoorMapDiv);
        this.indoorMap = new IndoorMap(bounds, srcImage, this.map, this.indoorMapDiv);
    }

}
