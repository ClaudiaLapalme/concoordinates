import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    ViewChild
} from '@angular/core';
import { MapService } from '../../services';
import { IndoorMap } from '../../models'

@Component({
    selector: 'app-indoor-map',
    templateUrl: './indoor-map.component.html',
    styleUrls: ['./indoor-map.component.scss']
})
export class IndoorMapComponent implements AfterViewInit {
    readonly swBound = new google.maps.LatLng(
        45.49681658032052,
        -73.57955563558198
    );
    readonly eBound = new google.maps.LatLng(
        45.49771707945049,
        -73.57833170552253
    );

    private bounds = new google.maps.LatLngBounds(this.swBound, this.eBound);

    public indoorMaps: Record<number, IndoorMap> = {};
    public indoorMapPicturePath: string =
        '../../../assets/icon/TransparentMarker.png';
    public previousIndoorMapLevel: number;

    @Input() map: google.maps.Map; // map reference
    @Input() indoorMapLevel: number;
    @Input() indoorMapBuildingCode: string;

    @ViewChild('indoorMapDiv', { read: ElementRef, static: false })
    indoorMapDiv: ElementRef; // html div reference

    constructor(private mapService: MapService) {
        this.indoorMaps = mapService.getIndoorMaps();
    }

    /**
     * Setting up the Google overlay and markers for each indoormap.
     */
    ngAfterViewInit() {
        for (const floorNumber in this.indoorMaps) {
            this.indoorMaps[floorNumber].setup(
                this.map,
                this.indoorMapDiv.nativeElement,
                this.bounds
            );
            this.indoorMaps[floorNumber].setupMapListeners(this.map);
            this.indoorMaps[floorNumber].currentlySelected = false;
        }
    }

    ngOnChanges() {
        if (this.previousIndoorMapLevel) {
            this.indoorMaps[this.previousIndoorMapLevel].removeIndoorPOIsLabels();
            this.indoorMaps[this.previousIndoorMapLevel].currentlySelected = false;
        }
        if (this.indoorMapLevel) {
            this.indoorMaps[this.indoorMapLevel].currentlySelected = true;
            this.indoorMapPicturePath = this.indoorMaps[this.indoorMapLevel].getPicturePath();
            this.indoorMaps[this.indoorMapLevel].tryDisplayIndoorPOIsLabels();
            this.previousIndoorMapLevel = this.indoorMapLevel;
        }
    }
}
