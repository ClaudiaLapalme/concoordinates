import { 
    AfterViewInit, 
    Component, 
    ElementRef, 
    Input, 
    ViewChild 
} from '@angular/core';
import { IndoorMap } from '../../models';

@Component({
    selector: 'app-indoor-map',
    templateUrl: './indoor-map.component.html',
    styleUrls: ['./indoor-map.component.scss'],
})
export class IndoorMapComponent implements AfterViewInit {

    @Input() map: google.maps.Map; // map reference

    @Input() indoorMapLevel: number;

    @Input() indoorMapBuildingCode: string;

    @ViewChild('indoorMapDiv', { read: ElementRef, static: false })
    indoorMapDiv: ElementRef;   // html div reference

    public indoorMap: IndoorMap;       // model

    constructor() { }

    ngAfterViewInit() {
        let swBound = new google.maps.LatLng(45.49681658032052, -73.57955563558198);
        let neBound = new google.maps.LatLng(45.49771707945049, -73.57833170552253);
        let bounds = new google.maps.LatLngBounds(swBound, neBound);

        this.indoorMap = new IndoorMap(bounds, this.map, this.indoorMapDiv.nativeElement);
        this.indoorMap.setup();
    }

}
